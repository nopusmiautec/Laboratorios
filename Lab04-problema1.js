function generarTabla(numero) {
    if (isNaN(numero) || numero <= 0) {
        document.write("<p>Por favor, ingresa un número valido mayor a 0.</p>");
        return;
    }

    let tabla = `
    <table border="1" style="border-collapse: collapse; margin: 20px 0;">
        <tr>
            <th>Número</th>
            <th>Cuadrado</th>
            <th>Cubo</th>
        </tr>
    `;

    for (let i = 1; i <= numero; i++) {
        tabla += `
                <tr>
                    <td>${i}</td>
                    <td>${i ** 2}</td>
                    <td>${i ** 3}</td>
                </tr>
            `;
    }

    tabla += "</table>";
    document.write(tabla);
}

const num = parseInt(prompt("Ingresa un número para generar la tabla:"));
generarTabla(num);

console.assert(typeof generarTabla === 'function', "La función 'generarTabla' no existe");