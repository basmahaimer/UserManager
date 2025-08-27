import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("list"); // 'list' ou 'add'
  const [createMsg, setCreateMsg] = useState("");
  const [usersErrorMsg, setUsersErrorMsg] = useState("");
  const [editUserId, setEditUserId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  // Vérifie l'auth & fetch users
  useEffect(() => {
    if (!token) navigate("/login");
    fetchUsers();
  }, [token, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setUsers(data);
      else setUsersErrorMsg(data.message || "Erreur lors du chargement");
    } catch (err) {
      setUsersErrorMsg("Erreur serveur");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Ajouter utilisateur via /api/auth/register
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreateMsg("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setCreateMsg(data.message);
        setFormData({ firstName: "", lastName: "", email: "", password: "", role: "user" });
        setActiveTab("list"); // retour automatique à la liste
        fetchUsers();
      } else {
        setCreateMsg(data.message || "Erreur serveur");
      }
    } catch (err) {
      setCreateMsg("Erreur serveur");
    }
  };

  const handleEditClick = (user) => {
    setEditUserId(user._id);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      role: user.role,
    });
    setActiveTab("add");
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password;

      const res = await fetch(`http://localhost:5000/api/users/${editUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();
      if (res.ok) {
        setEditUserId(null);
        setFormData({ firstName: "", lastName: "", email: "", password: "", role: "user" });
        setActiveTab("list");
        fetchUsers();
      } else {
        setUsersErrorMsg(data.message || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      setUsersErrorMsg("Erreur serveur");
    }
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
    setFormData({ firstName: "", lastName: "", email: "", password: "", role: "user" });
    setActiveTab("list");
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchUsers();
      else {
        const data = await res.json();
        setUsersErrorMsg(data.message || "Erreur lors de la suppression");
      }
    } catch (err) {
      setUsersErrorMsg("Erreur serveur");
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <h3 style={{ fontSize: "24px", marginBottom: "30px" }}>UserManager</h3>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li
              style={{
                cursor: "pointer",
                color: activeTab === "list" ? "#fff" : "#ccc",
                fontSize: "18px",
                marginBottom: "10px",
              }}
              onClick={() => setActiveTab("list")}
            >
              Liste des utilisateurs
            </li>
            <li
              style={{
                cursor: "pointer",
                color: activeTab === "add" ? "#fff" : "#ccc",
                fontSize: "18px",
              }}
              onClick={() => setActiveTab("add")}
            >
              Ajouter un utilisateur
            </li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout} style={{ marginTop: "50px" }}>
          Déconnexion
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-container">
        {activeTab === "add" && (
          <div className="form-box">
            <h3 style={{ fontSize: "22px" }}>
              {editUserId ? "Modifier l'utilisateur" : "Créer un utilisateur"}
            </h3>
            <form onSubmit={editUserId ? handleUpdateUser : handleCreateUser}>
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{ fontSize: "16px", padding: "10px", marginBottom: "10px" }}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{ fontSize: "16px", padding: "10px", marginBottom: "10px" }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ fontSize: "16px", padding: "10px", marginBottom: "10px" }}
              />
              <input
                type="password"
                name="password"
                placeholder={editUserId ? "Mot de passe (laisser vide si inchangé)" : "Mot de passe"}
                value={formData.password}
                onChange={handleChange}
                required={!editUserId}
                style={{ fontSize: "16px", padding: "10px", marginBottom: "10px" }}
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={{ fontSize: "16px", padding: "10px", marginBottom: "10px" }}
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Admin</option>
              </select>
              <div className="btn-group">
                <button type="submit" className="btn btn-success">
                  {editUserId ? "Mettre à jour" : "Ajouter"}
                </button>
                {editUserId && (
                  <button type="button" className="btn btn-danger" onClick={handleCancelEdit}>
                    Annuler
                  </button>
                )}
              </div>
            </form>
            {createMsg && <p className="success-msg">{createMsg}</p>}
          </div>
        )}

        {activeTab === "list" && (
          <>
            <h3>Liste des utilisateurs</h3>
            <div className="table-box">
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="table-btn edit" onClick={() => handleEditClick(user)}>Modifier</button>
                        <button className="table-btn delete" onClick={() => handleDeleteUser(user._id)}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {usersErrorMsg && <p className="error-msg">{usersErrorMsg}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
