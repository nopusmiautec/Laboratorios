function inverso(num) {
    if (typeof num !== "number") {
        return "Entrada inválida. Debe ser un número.";
    }
    let strNum = Math.abs(num).toString().split("").reverse().join("");
    let resultado = parseInt(strNum, 10);
    return num < 0 ? -resultado : resultado;
}

// Función para manejar el evento del botón
document.addEventListener("DOMContentLoaded", function () {
    const btnInvertir = document.getElementById("btnInvertir");
    if (btnInvertir) {
        btnInvertir.addEventListener("click", function () {
            const inputNumero = document.getElementById("numero").value;
            const resultado = inverso(parseInt(inputNumero, 10));
            document.getElementById("resultado").textContent = "Número invertido: " + resultado;
        });
    }
});
