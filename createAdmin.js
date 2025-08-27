require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./backend/models/User'); // ajuste le chemin si nécessaire

const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connecté");

        const email = "admin@test.com";
        const password = "123456";
        const role = "admin";

        // Vérifie si l'admin existe déjà
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            console.log("Admin existe déjà !");
            mongoose.disconnect();
            return;
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'admin
        const admin = new User({ email, password: hashedPassword, role });
        await admin.save();

        console.log("Admin créé avec succès !");
        console.log(`Email: ${email} / Password: ${password}`);
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        mongoose.disconnect();
    }
}

createAdmin();
