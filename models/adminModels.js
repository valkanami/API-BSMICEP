const { sql, connectToDatabase } = require('./database');
const bcrypt = require('bcryptjs');

async function createAdmin({ nombre, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const db = await connectToDatabase();

  await db.query(`
    INSERT INTO Administradores (nombre, email, password)
    VALUES ('${nombre}', '${email}', '${hashedPassword}')
  `);
}

async function getAdminByEmail(email) {
  const db = await connectToDatabase();
  const result = await db.query(`
    SELECT * FROM Administradores WHERE email='${email}'
  `);

  return result.recordset[0];
}

async function getAllAdmins() {
  const db = await connectToDatabase();
  const result = await db.query(`
    SELECT id, nombre, email FROM Administradores
  `);

  return result.recordset;
}

module.exports = {
  createAdmin,
  getAdminByEmail,
  getAllAdmins
};
