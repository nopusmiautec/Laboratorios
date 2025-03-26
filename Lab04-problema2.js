function sumaAleatoria() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const sumaCorrecta = num1 + num2;

    const inicio = Date.now();
    const respuestaUsuario = parseInt(prompt(`¿Cuánto es ${num1} + ${num2}?`));
    const fin = Date.now();
    const tiempoSegundos = ((fin - inicio) / 1000).toFixed(2);

    if (respuestaUsuario === sumaCorrecta) {
        document.write(`<p>Correcto! Tardaste ${tiempoSegundos} segundos.</p>`);
    } else {
        document.write(`<p>Incorrecto. La respuesta era ${sumaCorrecta}. Tardaste ${tiempoSegundos} segundos.</p>`);
    }
}

sumaAleatoria();

// Prueba en consola (simulada)
console.log("Prueba de sumaAleatoria: Verifica alertas y tiempo.");