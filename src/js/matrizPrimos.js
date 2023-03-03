const cuadrado = document.getElementById('cuadrado');
const numero = document.getElementById('numero');

const sumaEsquinasCuadricula = (n) => {
    n = parseInt(n);
    let a1 = n - (n - 1);
    let a2 = n;
    let a3 = n * n - (n - 1);
    let a4 = n * n;

    return a1 + a2 + a3 + a4;
};

const crearCuadricula = (number) => {
    const isValidNumber = !isNaN(number) && number > 0;
    let contador = 0;
    let tr;
    let td;

    if (!isValidNumber) {
        cuadrado.innerHTML = '<h2>El número debe ser una cantidad impar positiva, mayor que cero</h2>';
    } else {
        for (let index_x = 0; index_x < number; index_x++) {
            tr = document.createElement('tr');

            for (let index_y = 0; index_y < number; index_y++) {
                contador += 1;
                td = document.createElement('td');
                if (isPrimo(contador)) td.classList.add('IsPrimo');
                td.innerHTML = contador;
                tr.appendChild(td);
            }
            cuadrado.appendChild(tr);
        }
    }
};

numero.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        cuadrado.innerHTML = '';
        crearCuadricula(numero.value);
        console.log('keypress Termine con el numero: ' + numero.value);
    }
});
