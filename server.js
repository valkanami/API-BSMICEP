const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./models/database');
const polEnCanaRoutes = require('./routes/polEnCana');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/polencana', polEnCanaRoutes);

// Iniciar servidor
async function startServer() {
  try {
    // Conectar a la base de datos
    await connectToDatabase();
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

startServer();
