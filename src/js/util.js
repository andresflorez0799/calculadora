/**
 * Valida si una cantidad es un numero primo
 * @param {*} num  numero a validar si es un numero primo
 * @returns true si es primo
 */
const isPrimo = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
};

/**
 * Valida si el numero pasado por parametro es un valor numérico valido y si es impar
 * @param {*} number Valor que representa una cantidad númerica
 * @returns true ó verdadero si es un numero y este es impar
 */
const isNumberImpar = (number) => isValidNumber(number) && number % 2 !== 0;

/**
 * Retorna verdadero si el valor pasado por parametro representa un numero mayor que cero
 * @param {*} number Valor que representa una cantidad númerica
 * @returns true ó verdadero si es un numero es valido.
 */
const isValidNumber = (number) => !isNaN(number) && number > 0;
