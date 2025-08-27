# UserManager

UserManager est une application interne de gestion des comptes utilisateurs. Elle permet aux utilisateurs de s’inscrire et de se connecter, et aux administrateurs de gérer la liste des comptes via un dashboard simple et moderne.

---

## Fonctionnalités

### Backend
- Création d’utilisateurs avec mot de passe hashé (bcrypt).
- Authentification via JWT.
- Routes protégées par token pour sécuriser l’accès aux données.
- Gestion complète des utilisateurs : lecture, suppression, modification.
- Messages d’erreur clairs en cas de problème (serveur, identifiants invalides, etc.).

### Frontend
- Page de connexion avec formulaire email/mot de passe.
- Dashboard admin :
  - Liste des utilisateurs sous forme de tableau.
  - Ajout, modification et suppression des utilisateurs.
- Dashboard user :
  - Visualisation de ses informations sous forme de cartes.
- Interface responsive et moderne.
- Gestion des messages de succès et d’erreur.

---

## Installation

1. Cloner le dépôt :
```
git clone <URL_DU_REPO>

cd UserManager
```

2.Installer les dépendances backend :

cd backend
npm install


3. un fichier .env avec les variables suivantes :

MONGO_URI=<votre_connection_mongodb>
JWT_SECRET=<votre_secret_jwt>
PORT=5000


4.Lancer le serveur backend :

npm start


5.Installer les dépendances frontend :

cd frontend
npm install


6.Lancer le frontend :

npm start


Le frontend sera accessible sur http://localhost:3000 et le backend sur http://localhost:5000.

##Routes API
Auth

POST /api/auth/register → Créer un utilisateur

POST /api/auth/login → Se connecter et obtenir un token

Users (protégé)

GET /api/users → Liste des utilisateurs

GET /api/users/:id → Détails d’un utilisateur

PUT /api/users/:id → Modifier un utilisateur

DELETE /api/users/:id → Supprimer un utilisateur

GET /api/users/me → Informations de l’utilisateur connecté

PUT /api/users/:id/password → Modifier le mot de passe

##Technologies utilisées

Backend : Node.js, Express, MongoDB, Mongoose, bcrypt, JWT

Frontend : React, React Router, fetch API

Authentification sécurisée avec JWT

Responsive design et gestion des messages utilisateur

##Auteurs

[HAIMER Basma]
Notes

Le dashboard admin permet une gestion complète des utilisateurs.

Le dashboard user affiche les informations personnelles sous forme de cartes.

Le projet est entièrement fonctionnel et sécurisé.