
function calculadora(num1, num2, operacion) {
    let result;

    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (operacion === 1) {
        result = num1 + num2;
        console.log(`El resultado de la suma es: ${result}`);
    }
    else if (operacion === 2) {
        result = num1 - num2;
        console.log(`El resultado de la resta es: ${result}`);
    }
    else if (operacion === 3) {
        result = num1 * num2;
        console.log(`El resultado de la multiplicación es: ${result}`);
    }
    else if (operacion === 4) {
        if (num2 === 0) {
            console.log("Error: No se puede dividir entre cero.");
            return;
        }
        result = num1 / num2;
        console.log(`El resultado de la división es: ${result}`);
    }
    else if (operacion === 0) {
        console.log("Favor de ingresar una opción válida");
    }
    else {
        console.log("Opción inválida");
    }
}


let num1 = prompt("Ingresa el primer valor:");
let num2 = prompt("Ingresa el segundo valor:");
let operacion = parseInt(prompt("Ingrese 1 para SUMA, 2 para RESTA, 3 para MULTIPLICACIÓN, 4 para DIVISIÓN:"));


calculadora(num1, num2, operacion);
