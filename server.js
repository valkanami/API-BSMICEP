const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();

// Conexión principal a SQL Server vía mssql
const { connectToDatabase } = require('./models/database');

// Sequelize (se inicializa al importarse)
const { sequelize } = require('./models/database');

// Rutas
const weatherRoutes = require('./routes/weather');
const setupDynamicRoutes = require('./routes/routes');
const usuarioRoutes = require("./routes/usuarioRoutes");
const adminRoutes = require("./routes/adminRoutes");
const insertRoute = require("./routes/InsertRoute");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Rutas
app.use('/api/weather', weatherRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api", insertRoute);
app.use("/api", require("./routes/datosCuadrosRoutes"));
app.use("/api", require("./routes/datosTablasRoutes"));
app.use("/api", require("./routes/PromediosRoutes"));
app.use("/api", require("./routes/datosDiaRoutes"));
app.use("/api", require("./routes/datosHoraRoutes"));
app.use("/api", require("./routes/datosTurnoRoutes"));
app.use("/api", require("./routes/datosSQLRoutes"));
app.use("/api", require("./routes/registroZafraRoutes"));
app.use("/api", require("./routes/datosUnificadosRoutes"));


// Rutas dinámicas
setupDynamicRoutes(app);

// Ruta principal
app.get('/', (req, res) => {
  res.send('API del servidor funcionando correctamente');
});

// Iniciar Servidor
async function startServer() {
  try {
    // Conexión MSSQL
    await connectToDatabase();

    // Probar conexión Sequelize
    await sequelize.authenticate();
    console.log('Conexión Sequelize exitosa');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

startServer();
