// routes/mainRoutes.js
const express = require('express');
const router = express.Router();
const calculadoraController = require('../controllers/calculadoraController');

// Ruta para la página principal
router.get('/', calculadoraController.inicio);

// Ruta para procesar el cálculo
router.post('/calcular', calculadoraController.calcular);

// Ruta para limpiar la sesión
router.get('/limpiar', calculadoraController.limpiar);

module.exports = router;