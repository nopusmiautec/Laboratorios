function promedios(matriz) {
    return matriz.map(fila => {
        const suma = fila.reduce((total, num) => total + num, 0);
        return (suma / fila.length).toFixed(2); // Redondea a 2 decimales
    });
}

// Pedir al usuario las dimensiones de la matriz
const filas = parseInt(prompt("Ingresa el número de filas de la matriz:"));
const columnas = parseInt(prompt("Ingresa el número de columnas de la matriz:"));

// Validar dimensiones
if (isNaN(filas) || isNaN(columnas) || filas <= 0 || columnas <= 0) {
    document.write("<p>Error: Ingresa dimensiones válidas (números mayores a 0).</p>");
} else {
    const matriz = [];

    // Solicitar datos para cada fila
    for (let i = 0; i < filas; i++) {
        const inputFila = prompt(`Ingresa los ${columnas} números de la fila ${i + 1} separados por comas (ej: 1,2,3):`);
        const fila = inputFila.split(',').map(num => parseFloat(num.trim()));

        // Validar fila
        if (fila.length !== columnas || fila.some(isNaN)) {
            document.write(`<p>Error en fila ${i + 1}: Ingresa exactamente ${columnas} números válidos.</p>`);
            matriz.length = 0; // Limpiar matriz si hay error
            break;
        }
        matriz.push(fila);
    }

    // Mostrar resultados si la matriz es válida
    if (matriz.length > 0) {
        const proms = promedios(matriz);
        document.write("<h3>Matriz ingresada:</h3>");
        document.write("<pre>" + matriz.map(fila => fila.join('\t')).join('\n') + "</pre>");
        document.write("<h3>Promedios por fila:</h3>");
        document.write("<ul>" + proms.map((prom, i) => `<li>Fila ${i + 1}: ${prom}</li>`).join('') + "</ul>");
    }
}

// Prueba en consola
console.assert(
    JSON.stringify(promedios([[1, 2], [3, 4]])) === JSON.stringify(["1.50", "3.50"]),
    "Error en promedios"
);