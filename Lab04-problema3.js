function contador(numeros) {
    let negativos = 0;
    let ceros = 0;
    let positivos = 0;

    numeros.forEach(num => {
        if (num < 0) negativos++;
        else if (num === 0) ceros++;
        else positivos++;
    });

    return { negativos, ceros, positivos };
}

// Pedir al usuario que ingrese números separados por comas
const input = prompt("Ingresa números separados por comas (ej: 1,-2,0,5):");
const arreglo = input.split(',').map(num => parseFloat(num.trim()));

// Verificar si hay valores no numéricos
if (arreglo.some(isNaN)) {
    document.write("<p>Error: Ingresa solo números válidos.</p>");
} else {
    const resultado = contador(arreglo);
    document.write(`
        <h3>Resultado del conteo:</h3>
        <p>Negativos: ${resultado.negativos}</p>
        <p>Ceros: ${resultado.ceros}</p>
        <p>Positivos: ${resultado.positivos}</p>
    `);
}

// Prueba en consola
console.assert(
    JSON.stringify(contador([-1, 0, 1])) === JSON.stringify({ negativos: 1, ceros: 1, positivos: 1 }),
    "Error en contador"
);