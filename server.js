const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./models/database');

const weatherRoutes = require('./routes/weather');
const setupDynamicRoutes = require('./routes/routes'); 

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



app.use('/api/weather', weatherRoutes);


setupDynamicRoutes(app);


app.get('/', (req, res) => {
  res.send('API del servidor funcionando correctamente');
});

async function startServer() {
  try {
    await connectToDatabase();
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

startServer();