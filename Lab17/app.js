const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const libroRoutes = require('./routes/libroRoutes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/', libroRoutes);

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));

const db = require('./util/database');
