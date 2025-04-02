const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    console.log('Solicitud recibida:', request.url);
    
    // Ruta para el archivo HTML principal
    if (request.url === '/' || request.url === '/Lab06-PasswordValidator.html') {
        // Leer el archivo HTML
        fs.readFile(path.join(__dirname, 'Lab06-PasswordValidator.html'), 'utf8', (err, html) => {
            if (err) {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end('Error al cargar la página');
                return;
            }
            
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(html);
        });
    }
    // Ruta para el archivo CSS
    else if (request.url === '/Lab06.css') {
        fs.readFile(path.join(__dirname, 'Lab06.css'), 'utf8', (err, css) => {
            if (err) {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.end('CSS no encontrado');
                return;
            }
            
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.end(css);
        });
    }
    // Ruta para el archivo JavaScript
    else if (request.url === '/Lab06-password-validator.js') {
        fs.readFile(path.join(__dirname, 'Lab06-password-validator.js'), 'utf8', (err, js) => {
            if (err) {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.end('JavaScript no encontrado');
                return;
            }
            
            response.writeHead(200, {'Content-Type': 'application/javascript'});
            response.end(js);
        });
    }
    // Ruta no encontrada
    else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Página no encontrada');
    }
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
    console.log('Validador de contraseñas: http://localhost:3000/Laboratorio06.html');
});