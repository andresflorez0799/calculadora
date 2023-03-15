const numero = document.getElementById('numero');
const sumaEsquinas = document.getElementById('sumaEsquinas');
const ulPasosValidacion = document.getElementById('ulPasosValidacion');
const valoresEsquinas = document.getElementById('valoresEsquinas');
const isCrearGrafica = document.getElementById('isCrearGrafica');
let numerosMagicos = [];

const encontrarSumaEsquinasEsPrimo = (numberFin) => {
    let conteo = 0;
    let esPrimo = false;
    let sumatoria = 0;

    if (!isNaN(numberFin) && numberFin > 1) {
        divDemostracion.style.display = 'inline-block';
        for (let index = 1; index <= numberFin; index++) {
            sumatoria = sumaEsquinasCuadricula(index);
            esPrimo = isPrimo(sumatoria);
            conteo++;
            if (esPrimo) {
                break;
            }
        }
    }
};

const sumaEsquinasCuadricula = (n) => {
    n = parseInt(n);
    let a1 = n - (n - 1);
    let a2 = n;
    let a3 = n * n - (n - 1);
    let a4 = n * n;

    numerosMagicos[0] = a1;
    numerosMagicos[1] = a2;
    numerosMagicos[2] = a3;
    numerosMagicos[3] = a4;

    crearPasoValidacionItem(n, a1, a2, a3, a4);

    return a1 + a2 + a3 + a4;
};

const crearPasoValidacionItem = (n, vertice_a, vertice_b, vertice_c, vertice_d) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const suma = vertice_a + vertice_b + vertice_c + vertice_d;
    const esPrimo = isPrimo(suma);

    let texto = `cuando n es ${n} => `;
    if (n > 1) {
        texto += `<b class='valIteracion'>${vertice_a} + ${vertice_b} + ${vertice_c} + ${vertice_d} = <i class='valorSumaDetalle'>${suma}</i> <c>${esPrimo ? ' es Primo' : 'NO es Primo'}</c></b>`;
        valoresEsquinas.innerHTML = `${n}-(${n}-1) + ${n} + ((${n}^2)-${n}-1) + (${n}^2) entonces ${vertice_a} + ${vertice_b} + ${vertice_c} + ${vertice_d} = <b style='color:red;'> ${suma}</b> ${esPrimo ? ' es Primo' : 'No es Primo'}`;
        dimensionMatriz.innerHTML = `(n * n) => (${n} * ${n})`;
    }

    span.innerHTML = texto;
    if (esPrimo) span.style.backgroundColor = 'yellow';
    else span.style.backgroundColor = 'transparent';
    li.appendChild(span);
    ulPasosValidacion.appendChild(li);
};

const crearCuadricula = (number) => {
    const isValidNumber = !isNaN(number) && number > 1;
    let contador = 0;
    let tr;
    let td;

    if (!isValidNumber) {
        cuadrado.innerHTML = '<h2>El número debe ser una cantidad impar positiva, mayor que uno</h2>';
        valoresEsquinas.innerHTML = 'Matriz no valida, indique un numero mayor';
    } else {
        if (isCrearGrafica.checked)
            for (let index_x = 0; index_x < number; index_x++) {
                tr = document.createElement('tr');

                for (let index_y = 0; index_y < number; index_y++) {
                    contador += 1;
                    td = document.createElement('td');
                    if (isPrimo(contador)) td.classList.add('IsPrimo');
                    td.innerHTML = contador;
                    if (numerosMagicos.includes(contador)) td.classList.add('resultar');
                    tr.appendChild(td);
                }
                cuadrado.appendChild(tr);
            }
    }
};

numero.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        ulPasosValidacion.innerHTML = '';
        cuadrado.innerHTML = '';
        encontrarSumaEsquinasEsPrimo(numero.value);
        crearCuadricula(numero.value);
        cuadrado.style.display = 'inline-block';
        console.log('keypress Termine con el numero: ' + numero.value);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    cuadrado.style.display = 'none';
    numerosMagicos = [];
});

isCrearGrafica.addEventListener('click', function (e) {
    if (isCrearGrafica.checked) {
        crearCuadricula(numero.value);
    } else {
        cuadrado.innerHTML = '';
    }
});
