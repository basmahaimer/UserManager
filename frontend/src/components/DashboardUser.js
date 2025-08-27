import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardUser = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) navigate("/login");

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok || res.status === 200) {
          setUser(data);
        } else {
          setErrorMsg(data.message || "Erreur serveur");
        }
      } catch (err) {
        setErrorMsg("Erreur serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p>Chargement...</p>;
  if (errorMsg) return <p className="error-msg">{errorMsg}</p>;

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <h3>Mon Compte</h3>
        <nav>
          <ul>
            <li style={{ color: "#fff" }}>Infos utilisateur</li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>

      <div className="dashboard-container">
        <h3>Mes informations</h3>
        <div className="user-card">
          <div className="card-header">
            <h4>{user.firstName} {user.lastName}</h4>
          </div>
          <div className="card-body">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rôle:</strong> <span className={`role-badge ${user.role}`}>{user.role}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
