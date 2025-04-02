function generarFibonacci(limite) {
    if (limite <= 0) return [];
    if (limite === 1) return [0];
    
    const secuencia = [0, 1];
    
    while (secuencia[secuencia.length - 1] + secuencia[secuencia.length - 2] <= limite) {
        secuencia.push(secuencia[secuencia.length - 1] + secuencia[secuencia.length - 2]);
    }
    
    return secuencia;
}

function esFibonacci(numero) {
    if (numero < 0) return false;
    
    let a = 0, b = 1;
    if (numero === a || numero === b) return true;
    
    let c = a + b;
    while (c <= numero) {
        if (c === numero) return true;
        a = b;
        b = c;
        c = a + b;
    }
    
    return false;
}

console.log("=== Secuencia Fibonacci hasta 100 ===");
console.log(generarFibonacci(100));

console.log("\n=== Verificación de números Fibonacci ===");
const numerosVerificar = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 4, 10, 20];
numerosVerificar.forEach(num => {
    console.log(`¿${num} es Fibonacci? ${esFibonacci(num) ? 'Sí' : 'No'}`);
});