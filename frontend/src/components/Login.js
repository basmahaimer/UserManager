import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css"; // Assure-toi que le chemin est correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        if (data.role === "admin") navigate("/dashboard");
        else navigate("/user");
      } else {
        setMessage(data.message || "Email ou mot de passe invalide");
      }
    } catch (err) {
      setMessage("Erreur serveur, réessayez plus tard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Connexion</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Se connecter
          </button>
        </form>
        {message && <p className="error-msg">{message}</p>}
        <p className="link-text">
          Pas encore de compte ? <a href="/register">S’inscrire</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
