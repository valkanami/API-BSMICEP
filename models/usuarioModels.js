const sql = require("mssql");
const bcrypt = require("bcryptjs");
const dbConfig = require("../models/database");

async function registrarUsuario(nombre, apellidos, email, password) {
  try {
    const pool = await sql.connect(dbConfig);

    const checkUser = await pool.request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Usuarios WHERE email = @email");

    if (checkUser.recordset.length > 0) {
      return { error: "El email ya está registrado" };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await pool.request()
      .input("nombre", sql.NVarChar, nombre)
      .input("apellidos", sql.NVarChar, apellidos)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashedPassword)
      .query("INSERT INTO Usuarios (nombre, apellidos, email, password) VALUES (@nombre, @apellidos, @email, @password)");

    return { message: "Usuario registrado correctamente" };
  } catch (err) {
    console.error("Error en registrarUsuario:", err);
    return { error: "Error en el servidor" };
  }
}

async function loginUsuario(email, password) {
  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool.request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Usuarios WHERE email = @email");

    if (result.recordset.length === 0) {
      return { error: "Usuario no encontrado" };
    }

    const user = result.recordset[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return { error: "Contraseña incorrecta" };
    }

    return { user };
  } catch (err) {
    console.error("Error en loginUsuario:", err);
    return { error: "Error en el servidor" };
  }
}

module.exports = { registrarUsuario, loginUsuario };
