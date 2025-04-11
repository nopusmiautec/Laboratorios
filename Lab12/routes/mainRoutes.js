const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Inicio',
        path: '/'
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'Acerca de',
        path: '/about',
        contenido: 'Esta es una aplicación de ejemplo para el Laboratorio 12.'
    });
});

router.get('/productos', (req, res) => {
    const productos = [
        { id: 1, nombre: 'Producto A', precio: 100 },
        { id: 2, nombre: 'Producto B', precio: 200 },
        { id: 3, nombre: 'Producto C', precio: 300 }
    ];
    
    res.render('productos', {
        pageTitle: 'Nuestros Productos',
        path: '/productos',
        productos: productos
    });
});

router.get('/contacto', (req, res) => {
    res.render('contacto', {
        pageTitle: 'Contacto',
        path: '/contacto',
        email: 'contacto@lab12.edu',
        telefono: '+1234567890'
    });
});

module.exports = router;