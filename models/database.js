const sql = require('mssql');
const { Sequelize } = require('sequelize');
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
    console.log('Conexión exitosa a SQL Server (mssql)');
    return sql;
  } catch (err) {
    console.error('Error al conectar a SQL Server (mssql):', err);
    throw err;
  }
}


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    port: parseInt(process.env.DB_PORT || '1433'),
    logging: false,
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
      }
    }
  }
);


sequelize.authenticate()
  .then(() => console.log('Conexión exitosa a SQL Server con Sequelize'))
  .catch(err => console.error('Error conexión Sequelize:', err));


module.exports = {
  sql,                 
  connectToDatabase,   
  sequelize            
};
