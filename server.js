const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./models/database');
const weatherRoutes = require('./routes/weather');
const setupDynamicRoutes = require('./routes/routes'); 
const bodyParser = require("body-parser");
const usuarioRoutes = require("./routes/usuarioRoutes");
const adminRoutes = require("./routes/adminRoutes");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());



app.use('/api/weather', weatherRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/admins", adminRoutes);

setupDynamicRoutes(app);


app.get('/', (req, res) => {
  res.send('API del servidor funcionando correctamente');
});

async function startServer() {
  try {
    await connectToDatabase();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
    
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

startServer();