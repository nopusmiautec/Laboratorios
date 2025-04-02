const fs = require('fs');

// Función para escribir un string en un archivo
function escribirStringEnArchivo(nombreArchivo, contenido) {
    return new Promise((resolve, reject) => {
        fs.writeFile(nombreArchivo, contenido, 'utf8', (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(`Contenido escrito exitosamente en ${nombreArchivo}`);
        });
    });
}

const archivoPrueba = 'ejemplo.txt';
const contenido = 'Este es un texto de ejemplo para escribir en el archivo.\n¡Node.js es poderoso!';

console.log("=== Escribiendo archivo ===");
escribirStringEnArchivo(archivoPrueba, contenido)
    .then(mensaje => {
        console.log(mensaje);

        fs.readFile(archivoPrueba, 'utf8', (err, data) => {
            if (err) throw err;
            console.log("\nContenido del archivo:");
            console.log(data);
        });
    })
    .catch(err => {
        console.error("Error al escribir el archivo:", err);
    });