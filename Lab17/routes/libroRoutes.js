const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');

// Ruta raíz y /libros mostrarán lo mismo
router.get(['/', '/libros'], libroController.getLibros); 

// Resto de las rutas...
router.get('/add-libro', libroController.getAddLibro);
router.post('/add-libro', libroController.postAddLibro);

module.exports = router;