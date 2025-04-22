const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const calculadoraController = require('./controllers/calculadoraController');

const app = express();

// Configuración de EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false,
    saveUninitialized: false
}));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});