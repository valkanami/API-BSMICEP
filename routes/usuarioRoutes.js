const express = require("express");
const jwt = require("jsonwebtoken");
const { registrarUsuario, loginUsuario } = require("../models/usuarioModels");
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", authMiddleware, async (req, res) => {
  try {
    const { nombre, apellidos, email, password } = req.body;

    const result = await registrarUsuario(nombre, apellidos, email, password);

    if (result.error) {
      return res.status(400).send({ message: result.error });
    }

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: "Error al registrar usuario", error: error.message });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUsuario(email, password);
  if (result.error) {
    return res.status(400).send({ message: result.error });
  }

  const user = result.user;
  const token = jwt.sign(
    { id: user.id_usuario, email: user.email },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.status(200).send({ message: "Login exitoso", token });
});

router.get("/perfil", (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send({ message: "Token requerido" });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Token inválido" });
    res.status(200).send({
      message: "Bienvenido al perfil",
      userId: decoded.id
    });
  });
});

module.exports = router;
