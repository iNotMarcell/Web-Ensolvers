require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { sequelize } = require('./src/models');
const notesRouter = require('./src/routes/notes');
const categoriesRouter = require('./src/routes/categories');
const authRouter = require('./src/routes/auth');
const { createDefaultUser } = require('./src/controllers/authController');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);
app.use('/api/categories', categoriesRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Notas funcionando correctamente' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Error en el servidor', 
    error: err.message 
  });
});

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la base de datos.');
    
    // ⚠️ CAMBIA TEMPORALMENTE A { force: true } PARA RESETEAR LA BD
    // await sequelize.sync({ force: true }); 
    await sequelize.sync(); // ✅ Después de resetear, vuelve a esto
    await sequelize.sync({ force: true }); // ⚠️ Esto BORRARÁ todo
    console.log('✅ Modelos sincronizados.');
    
    // Crear usuario por defecto
    await createDefaultUser();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error iniciando aplicación:', err);
    process.exit(1);
  }
}

start();

module.exports = app;