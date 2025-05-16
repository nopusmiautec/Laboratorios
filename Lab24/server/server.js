const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});