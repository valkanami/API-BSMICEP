const express = require("express");
const router = express.Router();
const adminModel = require("../models/adminModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const authMiddleware = require("../Middleware/authMiddleware"); 

const SECRET_KEY = process.env.SECRET_KEY; 

router.post("/register", authMiddleware, async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    await adminModel.createAdmin({ nombre, email, password });
    res.status(201).json({ message: "✅ Admin creado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const admins = await adminModel.getAllAdmins();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminModel.getAdminByEmail(email);
    if (!admin) return res.status(401).json({ message: "Admin no encontrado" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
  { id: admin.id, email: admin.email, nombre: admin.nombre, role: "admin" },
  SECRET_KEY,
  { expiresIn: "10m" }
);


    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
