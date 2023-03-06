const largoColumnas = 30; //... Largo maximo de decimales a mostrar
const condicion = 0; //Tolerancia de error del 1%
const isHtml = true; //.. True si se necesita que se muestre el resultado en la pagina HTML

let Xa = 0; //... intervalo inferior
let Xb = 3; //... intervalo superior

let lastValue = {
    Iteracion: 0,
    Xa: 0,
    Xb: 0,
    Xr: 0,
    fXa: 0,
    fXb: 0,
    fXr: 0,
    fXa_fXr: 0,
    Ear: 0,
};

/**
 * Algoritmo que obtiene los resultados evaluados por el metodo de biseccion dada una función
 * @param {*} Xa
 * @param {*} Xb
 * @param {*} fx funcion a evaluar dentro del metodo, ej: Math.pow(x, 10) - 1
 */
const metodo_biseccion = (Xa, Xb, fx) => {
    let iteracion = 0;
    let Fxa = 0,
        Fxb = 0,
        Xr = 0,
        Fxr = 0;
    let Ear = 9999; //double
    let XmAnterior = 0;

    let intervalo = fx(Xa) * fx(Xb); //... Se debe validar que el intervalo dado inicialmente es valido, para ello f(Xa) * f(Xb) < 0
    console.log(`Condicion intervalo: f(a) * f(b) = ${intervalo} ${intervalo <= 0 ? ' ; Intervalo valido' : ' ; El intervalo no es valido'}\n`);

    if (intervalo > 0) {
        console.log(`No es valido el intervalo: f(a) * f(b) = ${intervalo} ; y esto debe ser < 0 !!!`);

        if (isHtml) {
            const divResultados = document.getElementById('divResultados');
            if (divResultados != null) {
                divResultados.innerHTML = `No es valido el intervalo: f(a) * f(b) = ${intervalo} ; y esto debe ser < 0 !!!`;
            }
        }
        return;
    }

    while (Ear * 100 > condicion) {
        XmAnterior = Xr;
        Fxa = fx(Xa);
        Fxb = fx(Xb);
        Xr = (Xa + Xb) / 2;
        Fxr = fx(Xr);
        Ear = Math.abs((Xr - XmAnterior) / Xr);

        if (iteracion === 0) {
            dibujarNombreColumnas();
            dibujarLineasDivisorias();
        }

        setlastValue(iteracion, Xa, Xb, Fxa, Fxb, Xr, Fxr, Ear);
        imprimir(iteracion, Xa, Xb, Fxa, Fxb, Xr, Fxr, Ear);

        if (Ear * 100 <= condicion) {
            dibujarLineasDivisorias();
            dibujarNombreColumnas();
        }

        if (Fxr >= 0) {
            Xb = Xr;
            Fxb = Fxr;
        } else if (Fxr < 0) {
            Xa = Xr;
            Fxa = Fxr;
        }
        iteracion++;
    }

    console.log('\n\nValores de ultima Iteración (hallar raiz):\n');
    console.log(`Iteracion: ${lastValue.Iteracion}\nXa :\t${lastValue.Xa}\nXb :\t${lastValue.Xb}\nfXa:\t${lastValue.fXa}\nfXb:\t${lastValue.fXb}\nXr :\t${lastValue.Xr} (raiz)\nfXr:\t${lastValue.fXr}\nEar:\t${lastValue.Ear}`);
    if (isHtml) {
        var selectedFn = document.getElementById('funciones');
        var text = selectedFn.options[selectedFn.selectedIndex].text;

        ultimoValor.innerHTML = `<h3>Ecuación: <b>${text}</b></h3><p>Iteración : ${lastValue.Iteracion}</p><p>Xa : ${lastValue.Xa}</p><p>Xb : ${lastValue.Xb}</p><p>f(Xa) : ${lastValue.fXa}</p><p>f(Xb) : ${lastValue.fXb}</p><p>Xr : ${lastValue.Xr} (raiz)</p><p>f(Xr) : ${lastValue.fXr}</p><p>Ear : ${lastValue.Ear}`;
    }
};

const setlastValue = (iteracion, xa, xb, fxa, fxb, xr, fxr, ear) => {
    lastValue = {
        Iteracion: iteracion,
        Xa: xa,
        Xb: xb,
        Xr: xr,
        fXa: fxa,
        fXb: fxb,
        fXr: fxr,
        fXa_fXr: normalizar(fxa * fxr),
        Ear: ear,
    };
};

const dibujarNombreColumnas = () => {
    console.log(
        `${normalizar('Iteracion')}\t${normalizar('Xa')}\t${normalizar('Xb')}\t${normalizar('xr (valores raices)')}\t${normalizar('f(Xa)')}\t${normalizar('f(Xb)')}\t${normalizar('f(Xr)')}\t${normalizar('f(Xa)*f(Xr)')}\t${normalizar('Ear')}`
    );
};

const dibujarLineasDivisorias = () => {
    console.log(
        `${'='.repeat(largoColumnas)}\t${'='.repeat(largoColumnas)}\t${'='.repeat(largoColumnas)}\t${'='.repeat(largoColumnas)}\t${'='.repeat(largoColumnas)}\t${'='.repeat(largoColumnas)}\t${'='.repeat(largoColumnas)}\t${'='.repeat(
            largoColumnas
        )}\t${'='.repeat(largoColumnas)}`
    );
};

/**
 * Realiza la impresion por consola de los valores para cada iteracion
 * @param {*} iteracion , numero actual de la iteración
 * @param {*} xa valor actual xa
 * @param {*} xb valor actual xb
 * @param {*} fxa f(xa)
 * @param {*} fxb f(xb)
 * @param {*} xr xr ó valores de raices
 * @param {*} fxr f(xr)
 * @param {*} ear Error absoluto
 */
const imprimir = (iteracion, xa, xb, fxa, fxb, xr, fxr, ear) => {
    try {
        xa = normalizar(fixed(xa));
        xb = normalizar(fixed(xb));
        fxa = normalizar(fixed(fxa));
        fxb = normalizar(fixed(fxb));
        xr = normalizar(fixed(xr));
        fxr = normalizar(fixed(fxr));
        ear = normalizar(fixed(ear));
        let fxa_fxr = normalizar(fxa * fxr);

        console.log(`${iteracion}\t${xa}\t${xb}\t${xr}\t${fxa}\t${fxb}\t${fxr}\t${fxa_fxr}\t${ear}`);

        if (isHtml) {
            imprimirHTML(iteracion, xa, xb, fxa, fxb, xr, fxr, fxa_fxr, ear);
        }
    } catch (error) {
        console.error(error);
        console.error(`Error: iteracion ${iteracion}, fxa * fxr = ${fxa * fxr}`);
    }
};

const imprimirHTML = (iteracion, xa, xb, fxa, fxb, xr, fxr, fxa_fxr, ear) => {
    const tabla = document.getElementById('resultados');

    if (tabla != undefined) {
        const tr = document.createElement('tr');

        const tds = `<td>${iteracion}</td><td>${xa}</td><td>${xb}</td><td>${xr}</td><td>${fxa}</td><td>${fxb}</td><td>${fxr}</td><td>${fxa_fxr}</td><td>${ear}</td>`;
        tr.innerHTML = tds;

        tabla.appendChild(tr);
    }
};

const fixed = (valor) => roundOff(parseFloat(valor).toFixed(largoColumnas - 3), largoColumnas - 3);

/**
 * Normaliza los valores para presentar por consola
 * @param {*} valor
 * @returns texto normalizado
 */
const normalizar = (valor) => {
    try {
        if (valor == null || valor == undefined) return ' '.repeat(largoColumnas);

        let valorString = `${valor}`;

        return `${valorString} ${' '.repeat(largoColumnas - valorString.length)}`;
    } catch (error) {
        console.error(error);
    }
};

let roundOff = (num, places) => {
    const x = Math.pow(10, places);
    return Math.round(num * x) / x;
};

/**
 * Función a evaluar dentro de la biseccion, contiene la definicion de la funcion f(x), ej: Math.pow(x, 10) - 1;
 * @param {*} x valor a validar dentro de la f(x)
 * @returns resultado de la validacion de la funcion f(x)
 */
const fx = (x) => {
    const fnObject = {
        1: function () {
            return Math.pow(x, 10) - 1;
        },
        2: function () {
            return Math.cos(1 + Math.sqrt(x));
        },
        3: function () {
            return (1 / 5) * Math.pow(x, 5) - 3 * Math.pow(x, 4) + 9 * Math.pow(x, 2) + 1;
        },
    };

    if (isHtml) {
        var selectedFn = document.getElementById('funciones');
        var valorFn = selectedFn.options[selectedFn.selectedIndex].value;
        return fnObject[valorFn]();
    } else return fnObject[1]();

    //... f(x) = x^10 - 1
    //return Math.pow(x, 10) - 1;

    //... f(x) = cos(1 + sqrt(x))
    //return Math.cos(1 + Math.sqrt(x));

    //... f(x) = (1/5)x^5 - 3x^4 + 9x^2 + 1
    //return (1 / 5) * Math.pow(x, 5) - 3 * Math.pow(x, 4) + 9 * Math.pow(x, 2) + 1;
};

/**
 * Ejecucion de la funcion por el metodo de bisección
 */
metodo_biseccion(Xa, Xb, fx);

if (isHtml) {
    const changeIntervalo_superior = document.querySelector('#intervalo_superior');
    const changeIntervalo_inferior = document.querySelector('#intervalo_inferior');
    const changeFunciones = document.querySelector('#funciones');

    changeIntervalo_superior.addEventListener('change', (e) => recalcular());
    changeIntervalo_inferior.addEventListener('change', (e) => recalcular());
    changeFunciones.addEventListener('change', (e) => recalcular());

    const recalcular = () => {
        if (isNaN(intervalo_superior.value) || isNaN(intervalo_inferior.value)) {
            alert('El valor de los intervalos no son validos');
        } else {
            const resultados = document.querySelector('#resultados');
            resultados.innerHTML = '';
            Xa = parseInt(intervalo_superior.value);
            Xb = parseInt(intervalo_inferior.value);

            metodo_biseccion(Xa, Xb, fx);
        }
    };
}
