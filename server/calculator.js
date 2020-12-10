/*
Модуль, чтобы попрактиковаться в использовании unit-тестирования с Jasmine.
*/

/**
 * Функция вычисляет сумму двух чисел.
 * @param a, b: складываемые числа.
 */
function sum(a, b) {
    if (isNaN(a) || isNaN(b))
        return null;
    return a + b;
}

/**
 * Функция вычисляет разность двух чисел.
 * @param a, b: числа для разности.
 */
function difference(a, b) {
    if (isNaN(a) || isNaN(b))
        return null;
    return a - b;
}

/**
 * Функция вычисляет произведение двух чисел.
 * @param a, b: умножаемые числа.
 */
function multiplication(a, b) {
    if (isNaN(a) || isNaN(b))
        return null;
    return a * b;
}

/**
 * Функция вычисляет отношение двух чисел.
 * @param a, b: числа.
 */
function division(a, b) {
    if (isNaN(a) || isNaN(b))
        return null;
    return a / b;
}

module.exports = {
    sum,
    difference,
    multiplication,
    division,
};