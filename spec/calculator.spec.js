const calculator = require('../server/calculator');
const sum = calculator.sum;
const difference = calculator.difference;
const multiplication = calculator.multiplication;
const division = calculator.division;

/**
 * Тесты для суммы.
 */
describe('Функция sum()', () => {
    it('должна возвращать 5 для (1, 4)', () => {
        expect(sum(1, 4)).toBe(5);
    });
    it('должна возвращать null для ("1", 4)', () => {
        expect(sum("1", 4)).toBeNull;
    });
    it('должна возвращать null для (4)', () => {
        expect(sum(4)).toBeNull;
    });
});

/**
 * Тесты для вычитания.
 */
describe('Функция difference()', () => {
    it('должна возвращать -6 для (1, 7)', () => {
        expect(difference(1, 7)).toBe(-6);
    });
    it('должна возвращать null для ("1", 4)', () => {
        expect(difference("1", 4)).toBeNull;
    });
    it('должна возвращать null для (4)', () => {
        expect(difference(4)).toBeNull;
    });
});

/**
 * Тесты для произведения.
 */
describe('Функция multiplication()', () => {
    it('должна возвращать 144 для (2, 72)', () => {
        expect(multiplication(2, 72)).toBe(144);
    });
    it('должна возвращать null для ("1", 4)', () => {
        expect(multiplication("1", 4)).toBeNull;
    });
    it('должна возвращать null для (4)', () => {
        expect(multiplication(4)).toBeNull;
    });
});

/**
 * Тесты для деления.
 */
describe('Функция division()', () => {
    it('должна возвращать 3 для (81, 27)', () => {
        expect(division(81, 27)).toBe(3);
    });
    it('должна возвращать null для ("1", 4)', () => {
        expect(division("1", 4)).toBeNull;
    });
    it('должна возвращать null для (4)', () => {
        expect(division(4)).toBeNull;
    });
});