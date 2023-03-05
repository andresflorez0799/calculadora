const largoColumnas = 30; //... Largo maximo de decimales a mostrar
const condicion = 0; //Tolerancia de error del 1%
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
        xa = fixed(xa);
        xb = fixed(xb);
        fxa = fixed(fxa);
        fxb = fixed(fxb);
        xr = fixed(xr);
        fxr = fixed(fxr);
        ear = fixed(ear);

        console.log(`${normalizar(iteracion)}\t${normalizar(xa)}\t${normalizar(xb)}\t${normalizar(xr)}\t${normalizar(fxa)}\t${normalizar(fxb)}\t${normalizar(fxr)}\t${normalizar(fxa * fxr)}\t${normalizar(ear)}`);
    } catch (error) {
        console.error(`Error: iteracion ${iteracion}, fxa * fxr = ${fxa * fxr}`);
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
        console.log(typeof valor);
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
    //... f(x) = -2 + 7x -5x^2 + 6x^3
    //return -2 + 7 * x - 5 * Math.pow(x, 2) + 6 * Math.pow(x, 3);

    //... f(x) = x^10 - 1
    //return Math.pow(x, 10) - 1;

    //... f(x) = (1/5)x^5 - 3x^4 + 9x^2 + 1
    //return (1 / 5) * Math.pow(x, 5) - 3 * Math.pow(x, 4) + 9 * Math.pow(x, 2) + 1;

    //... f(x) = cos(1 + sqrt(x))
    return Math.cos(1 + Math.sqrt(x));
};

const Xa = 8; //... intervalo inferior
const Xb = 15; //... intervalo superior

/**
 * Ejecucion de la funcion por el metodo de bisección
 */
metodo_biseccion(Xa, Xb, fx);
