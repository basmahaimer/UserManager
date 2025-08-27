# UserManager

UserManager est une application web complète de gestion des comptes utilisateurs avec un système d'authentification sécurisée et des interfaces différenciées pour les administrateurs et les utilisateurs standards.

## ✨ Fonctionnalités

### 🔐 Authentification et Sécurité
- **Inscription sécurisée** avec hachage de mot de passe via bcrypt
- **Connexion JWT** avec tokens d'authentification
- **Routes protégées** avec vérification des permissions
- **Gestion des sessions** sécurisée

### 👨‍💻 Dashboard Administrateur
- **Tableau de bord complet** avec liste des utilisateurs
- **CRUD complet** (Création, Lecture, Modification, Suppression)
- **Interface moderne** et responsive
- **Gestion des permissions** administrateur

### 👤 Espace Utilisateur
- **Visualisation des informations personnelles** en format carte
- **Interface intuitive** et conviviale
- **Expérience utilisateur optimisée**

### 🎨 Interface
- **Design responsive** adapté à tous les appareils
- **Messages contextuels** de succès et d'erreur
- **Expérience utilisateur fluide** et moderne

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (v14 ou supérieur)
- MongoDB (local ou cluster Atlas)
- npm ou yarn

### Configuration

1. **Cloner le dépôt**
```bash
git clone <URL_DU_REPO>
cd UserManager
```

2. **Configuration du Backend**
```bash
cd backend
npm install
```

3. **Configuration des variables d'environnement**
Créez un fichier `.env` dans le dossier `backend` :
```env
MONGO_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt_super_securise
PORT=5000
NODE_ENV=development
```

4. **Démarrage du serveur backend**
```bash
npm start
# ou pour le développement
npm run dev
```

5. **Configuration du Frontend**
```bash
cd ../frontend
npm install
```

6. **Démarrage de l'application React**
```bash
npm start
```

L'application sera accessible :
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5000

## 📡 API Endpoints

### Authentification
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/auth/register` | Création d'un nouveau compte utilisateur |
| `POST` | `/api/auth/login` | Connexion et obtention du token JWT |

### Gestion des Utilisateurs (Protégé)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/users` | Liste de tous les utilisateurs (Admin) |
| `GET` | `/api/users/:id` | Détails d'un utilisateur spécifique |
| `PUT` | `/api/users/:id` | Modification des informations utilisateur |
| `DELETE` | `/api/users/:id` | Suppression d'un utilisateur (Admin) |
| `GET` | `/api/users/me` | Informations de l'utilisateur connecté |
| `PUT` | `/api/users/:id/password` | Modification du mot de passe |

## 🛠 Technologies Utilisées

### Backend
- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web pour Node.js
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **bcryptjs** - Hachage sécurisé des mots de passe
- **jsonwebtoken** - Authentification JWT
- **CORS** - Gestion des cross-origin requests

### Frontend
- **React** - Librairie JavaScript pour interfaces
- **React Router** - Navigation et routage
- **Fetch API** - Requêtes HTTP modernes
- **CSS3** - Styles et design responsive

## 🔧 Structure du Projet

```
UserManager/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── database.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   └── public/
└── README.md
```

## 👥 Rôles et Permissions

- **Utilisateur Standard** : Accès à son profil et modification de ses informations
- **Administrateur** : Gestion complète de tous les utilisateurs + droits administrateur

## 📱 Fonctionnalités Avancées

- ✅ Validation des données côté serveur
- ✅ Gestion centralisée des erreurs
- ✅ Interface responsive et moderne
- ✅ Tokens JWT sécurisés
- ✅ Protection contre les attaques par injection
- ✅ Messages d'erreur explicites
- ✅ Expérience utilisateur optimisée

## 🚧 Développement Futur

- [ ] Moteur de recherche et filtres utilisateurs
- [ ] Export des données (CSV, PDF)
- [ ] Système de rôles plus avancé
- [ ] Journalisation des actions administrateur
- [ ] Interface dark/light mode
- [ ] Tests unitaires et d'intégration

## 👨‍💻 Auteur

**HAIMER Basma** - Développeuse Full Stack

## 📄 Licence

Ce projet est destiné à un usage interne et éducatif.

---

