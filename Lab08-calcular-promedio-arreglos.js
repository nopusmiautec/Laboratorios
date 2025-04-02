function calcularPromedio(numeros) {
    if (!Array.isArray(numeros)) {
        throw new Error("El argumento debe ser un arreglo");
    }
    
    if (numeros.length === 0) {
        return 0;
    }
    
    const suma = numeros.reduce((total, num) => total + num, 0);
    return suma / numeros.length;
}

const miArreglo = [7, 8, 9, 10, 11];
console.log(`\nPromedio de [${miArreglo.join(', ')}] es: ${calcularPromedio(miArreglo)}`);