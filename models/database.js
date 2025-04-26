const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '1433'), 
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Conexión exitosa a SQL Server');
    return sql;
  } catch (err) {
    console.error('Error al conectar a SQL Server:', err);
    throw err;
  }
}

module.exports = { sql, connectToDatabase };