const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Importar rutas
const mainRoutes = require('./routes/mainRoutes');
const formRoutes = require('./routes/formRoutes');

const app = express();

// Configuración
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public/views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', mainRoutes);
app.use('/formulario', formRoutes);

// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public/views', '404.html'));
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});