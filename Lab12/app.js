const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const mainRoutes = require('./routes/mainRoutes');
const formRoutes = require('./routes/formRoutes');
app.use('/', mainRoutes);
app.use('/formulario', formRoutes);

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('404', { 
        pageTitle: 'Página no encontrada',
        path: '/404'
    });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});