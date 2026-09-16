# UserManager — Dockerisé

Application de gestion des utilisateurs (Node.js + React + MongoDB) entièrement conteneurisée.

## 🚀 Lancer le projet

```bash
docker compose up --build
```

## 🌐 Accès

- Frontend : http://localhost:3000
- Backend API : http://localhost:5000
- MongoDB : localhost:27017

## 🛠 Technologies

- Docker, Docker Compose
- Node.js 20, Express, MongoDB
- React, Nginx

## 📁 Structure

```
UserManager/
├── backend/          # API Node.js
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
├── frontend/         # React + Nginx
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── docker-compose.yml
└── README.md
```

## 🐳 Commandes utiles

| Commande | Action |
|----------|--------|
| `docker compose up --build` | Build + lancer |
| `docker compose down` | Arrêter |
| `docker compose down -v` | Arrêter + reset DB |
| `docker compose logs -f` | Voir les logs |

## 👤 Auteur

HAIMER Basma
```
---
