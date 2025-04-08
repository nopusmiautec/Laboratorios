const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

const PORT = 3000;
const CURRENT_DIR = __dirname;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const pathname = parsedUrl.pathname;

    // Manejo de rutas
    if (pathname === '/' || pathname === '/lab01') {
        serveFile(res, 'Lab01.html', 'text/html');
    } else if (pathname === '/lab06') {
        serveFile(res, 'Lab06-PasswordValidator.html', 'text/html');
    } else if (pathname === '/formulario') {
        if (req.method === 'GET') {
            serveForm(res);
        } else if (req.method === 'POST') {
            handleFormPost(req, res);
        }
    } else if (pathname.endsWith('.css')) {
        // Bloquear acceso directo a CSS
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Acceso directo a archivos CSS no permitido');
    } else {
        // Ruta no encontrada
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

function serveFile(res, filename, contentType) {
    const filePath = path.join(CURRENT_DIR, filename);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error al leer el archivo ${filename}:`, err);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Archivo no encontrado');
        } else {
            // Si es HTML, inyectamos el CSS correspondiente
            if (filename === 'Lab01.html') {
                data = injectCSS(data, 'Lab03.css');
            } else if (filename === 'Lab06-PasswordValidator.html') {
                data = injectCSS(data, 'Lab06.css');
            }
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

function injectCSS(html, cssFile) {
    const cssPath = path.join(CURRENT_DIR, cssFile);
    try {
        const cssContent = fs.readFileSync(cssPath, 'utf8');
        return html.replace('</head>', `<style>${cssContent}</style></head>`);
    } catch (err) {
        console.error(`Error al leer el CSS ${cssFile}:`, err);
        return html; // Devuelve el HTML original si hay error
    }
}

function serveForm(res) {
    const formHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Formulario</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                form { max-width: 500px; margin: 0 auto; }
                label { display: block; margin-top: 10px; }
                input, textarea { width: 100%; padding: 8px; margin-top: 5px; }
                button { margin-top: 15px; padding: 10px 15px; background-color: #4CAF50; color: white; border: none; cursor: pointer; }
                button:hover { background-color: #45a049; }
            </style>
        </head>
        <body>
            <h1>Envia tus datos</h1>
            <form method="POST" action="/formulario">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required><br><br>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br><br>
                
                <label for="comentario">Comentario:</label><br>
                <textarea id="comentario" name="comentario" rows="4" cols="50"></textarea><br><br>
                
                <button type="submit">Enviar</button>
            </form>
        </body>
        </html>
    `;
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(formHtml);
}

function handleFormPost(req, res) {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
        const formData = querystring.parse(body);
        const dataToSave = `Nombre: ${formData.nombre}, Email: ${formData.email}, Comentario: ${formData.comentario}\n`;
        const filePath = path.join(CURRENT_DIR, 'datos.txt');
        
        fs.appendFile(filePath, dataToSave, (err) => {
            if (err) {
                console.error('Error al guardar datos:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al guardar los datos');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Datos Recibidos</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            p { margin: 10px 0; }
                            a { display: inline-block; margin-top: 20px; color: #4CAF50; text-decoration: none; }
                            a:hover { text-decoration: underline; }
                        </style>
                    </head>
                    <body>
                        <h1>Datos recibidos y guardados</h1>
                        <p>Nombre: ${formData.nombre}</p>
                        <p>Email: ${formData.email}</p>
                        <p>Comentario: ${formData.comentario}</p>
                        <a href="/formulario">Volver al formulario</a>
                    </body>
                    </html>
                `);
            }
        });
    });
}

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Rutas disponibles:`);
    console.log(`- http://localhost:${PORT}/lab01`);
    console.log(`- http://localhost:${PORT}/lab06`);
    console.log(`- http://localhost:${PORT}/formulario`);
});