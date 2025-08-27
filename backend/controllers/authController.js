const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 📌 Inscription
exports.register = async (req, res) => {
    const { firstName, lastName, birthDate, email, password, role } = req.body;

    if (!firstName || !lastName || !birthDate || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email déjà utilisé" });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            firstName,
            lastName,
            birthDate,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        await user.save();
        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (err) {
        console.error("Erreur register:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
// 📌 Connexion
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email ou mot de passe invalide" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email ou mot de passe invalide" });
        }

        // Générer un token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role });
    } catch (err) {
        console.error("Erreur login:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// 📌 Récupérer tous les utilisateurs (admin seulement)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // exclure password
        res.json(users);
    } catch (err) {
        console.error("Erreur getUsers:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
