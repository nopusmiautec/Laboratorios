const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'home.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'about.html'));
});

router.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'services.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'contact.html'));
});

module.exports = router;