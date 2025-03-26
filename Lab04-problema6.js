class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.puntuacion = 0;
        this.nivel = 1;
    }

    sumarPuntos(puntos) {
        this.puntuacion += puntos;
        if (this.puntuacion >= this.nivel * 100) {
            this.subirNivel();
        }
        return this.puntuacion;
    }

    subirNivel() {
        this.nivel++;
        return this.nivel;
    }
}

// Pedir datos al usuario
const nombreJugador = prompt("Ingresa tu nombre de jugador:");
const puntos = parseInt(prompt("Ingresa los puntos a sumar (ej: 50):"));

if (!nombreJugador || isNaN(puntos)) {
    document.write("<p>Error: Nombre o puntos inválidos.</p>");
} else {
    const jugador = new Jugador(nombreJugador);
    jugador.sumarPuntos(puntos);

    document.write(`
        <h3>Jugador: ${jugador.nombre}</h3>
        <p>Puntuación total: ${jugador.puntuacion}</p>
        <p>Nivel actual: ${jugador.nivel}</p>
    `);
}

// Prueba en consola
const jugadorTest = new Jugador("Test");
console.assert(jugadorTest.sumarPuntos(100) === 100, "Error en sumarPuntos");