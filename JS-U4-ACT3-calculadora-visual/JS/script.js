const screen = document.getElementById('calculo');
const botones = document.querySelectorAll('button:not(#limpiar-historial)'); 
const historial = document.getElementById('historial');

let op = "";

const actualizarPantalla = (value) => {
    op += value;
    screen.value = op;
};

const calcularResultado = () => {
    try {
        const resultado = eval(op);
        screen.value = resultado;
        return resultado;
    } catch (error) {
        screen.value = "error";
        return null; 
    }
};

const limpiarPantalla = () => {
    op = "";
    screen.value = "";
};

const agregarElemento = (resultado) => {
    if (resultado !== null) {
        const nuevoElemento = document.createElement('li');
        nuevoElemento.textContent = resultado;
        historial.appendChild(nuevoElemento);
    }
};

const limpiarHistorial = () => {
    historial.innerHTML = "";
};

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.textContent;

        if (valor === '=') {
            const resultado = calcularResultado();
            agregarElemento(resultado);
        } else if (valor === 'C') {
            limpiarPantalla();
        } else {
            actualizarPantalla(valor);
        }
    });
});


const cleanButton = document.getElementById('limpiar-historial');
cleanButton.addEventListener('click', limpiarHistorial);
