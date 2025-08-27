const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { getUsers, getUserById, deleteUser, updateUser, getMe } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const adminAuth = require('../middleware/adminMiddleware');

// ================================
// Route pour l’utilisateur connecté
// ================================
router.get("/me", auth, getMe);

// ================================
// Routes accessibles uniquement à l’admin
// ================================
router.get("/", auth, adminAuth, getUsers);
router.get("/:id", auth, adminAuth, getUserById);
router.put("/:id", auth, adminAuth, updateUser);
router.delete("/:id", auth, adminAuth, deleteUser);

// ================================
// Mise à jour du mot de passe (utilisateur connecté)
// ================================
router.put('/:id/password', auth, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: "Mot de passe requis" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });

    res.json({ message: "Mot de passe mis à jour avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
