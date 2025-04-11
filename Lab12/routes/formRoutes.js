const express = require('express');
const router = express.Router();

// Almacenamiento en memoria
const datosFormulario = [];

router.get('/', (req, res) => {
    res.render('formulario', {
        pageTitle: 'Formulario de Contacto',
        path: '/formulario',
        error: req.query.error // Para manejar errores
    });
});

router.post('/enviar', (req, res) => {
    const { nombre, email, mensaje } = req.body;
    
    // Validación básica
    if (!nombre || !email || !mensaje) {
        return res.redirect('/formulario?error=missing_fields');
    }
    
    const nuevoDato = {
        nombre,
        email,
        mensaje,
        fecha: new Date().toLocaleString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    datosFormulario.unshift(nuevoDato); // Agrega al inicio
    
    res.render('confirmacion', {
        pageTitle: 'Confirmación de envío',
        path: '/formulario',
        dato: nuevoDato
    });
});

router.get('/datos', (req, res) => {
    res.render('datos', {
        pageTitle: 'Datos Recibidos',
        path: '/formulario/datos',
        datos: datosFormulario
    });
});

module.exports = router;