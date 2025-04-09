const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'formulario.html'));
});

router.post('/enviar', (req, res) => {
    const { nombre, email, mensaje } = req.body;
    const datos = `Nombre: ${nombre}, Email: ${email}, Mensaje: ${mensaje}\n`;
    
    fs.appendFile(path.join(__dirname, '../datos.txt'), datos, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al guardar los datos');
        }
        
        res.sendFile(path.join(__dirname, '../public/views', 'confirmacion.html'));
    });
});

module.exports = router;