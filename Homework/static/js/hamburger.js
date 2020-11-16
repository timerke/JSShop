const BIG_HAMBURGER = { price: 100, calories: 40 };
const SMALL_HAMBURGER = { price: 50, calories: 20 };
const CHEESE = { price: 10, calories: 20 };
const SALAD = { price: 20, calories: 5 };
const POTATOES = { price: 15, calories: 10 };
const CONDIMENT = { price: 15, calories: 0 };
const MAYONNAISE = { price: 20, calories: 5 };

/**
 * Класс для объектов-гамбургеров.
 */
class Hamburger {
    /**
     * Конструктор класса.
     */
    constructor(hamburger = BIG_HAMBURGER) {
        this.price = hamburger.price; // цена
        this.calories = hamburger.calories; // калории
        this.additives = []; // начинки к гамбургеру
        this.condiment = null; // приправа
        this.mayonnaise = null; // майонез
    }

    /**
     * Метод выбирает тип гамбургера.
     */
    chooseType() {
        let hamburgers = document.getElementsByName('hamburger');
        for (let hamburger of hamburgers) {
            if (hamburger.checked) {
                if (hamburger.value == 'big') {
                    this.price = BIG_HAMBURGER.price; // цена
                    this.calories = BIG_HAMBURGER.calories; // калорий
                }
                else {
                    this.price = SMALL_HAMBURGER.price; // цена
                    this.calories = SMALL_HAMBURGER.calories; // калорий
                }
            }
        }
    }

    /**
     * Метод добавляет начинки к гамбургеру.
     */
    addAdditive() {
        this.additives = [];
        let additives = document.getElementsByName('additive');
        console.log(additives);
        for (let additive of additives) {
            if (additive.checked)
                this.additives.push(new Additive(additive.value));
        }
    }

    /**
     * Метод добавляет приправу или майонез.
     */
    addCondimentMayonnaise(name) {
        if (name == 'condiment') {
            this.condiment = null;
            let elements = document.getElementsByName(name);
            for (let element of elements) {
                if (element.checked && element.value == 'yes')
                    this.condiment = new Additive(name);
            }
        }
        else if (name == 'mayonnaise') {
            this.mayonnaise = null;
            let elements = document.getElementsByName(name);
            for (let element of elements) {
                if (element.checked && element.value == 'yes')
                    this.condiment = new Additive(name);
            }
        }
    }

    /**
     * Метод вычисляет полную стоимость и калорийность гамбургера.
     * @return: полная стоимость и калорийность.
     */
    calculateTotal() {
        // Сам гамбургер
        let price = this.price;
        let calories = this.calories;
        // Начинки
        for (let additive of this.additives) {
            price += additive.price;
            calories += additive.calories;
        }
        // Приправа
        if (this.condiment) {
            price += this.condiment.price;
            calories += this.condiment.calories;
        }
        // Майонез
        if (this.mayonnaise) {
            price += this.mayonnaise.price;
            calories += this.mayonnaise.calories;
        }
        return [price, calories];
    }
}

/**
 * Класс для добавки для гамбургера.
 */
class Additive {
    /**
     * Конструктор класса.
     */
    constructor(name) {
        this.name = name;
        if (name == 'cheese') {
            this.price = CHEESE.price; // цена
            this.calories = CHEESE.calories; // калорий
        }
        else if (name == 'salad') {
            this.price = SALAD.price; // цена
            this.calories = SALAD.calories; // калорий
        }
        else if (name == 'potatoes') {
            this.price = POTATOES.price; // цена
            this.calories = POTATOES.calories; // калорий
        }
        else if (name == 'condiment') {
            this.price = CONDIMENT.price; // цена
            this.calories = CONDIMENT.calories; // калорий
        }
        else if (name == 'mayonnaise') {
            this.price = MAYONNAISE.price; // цена
            this.calories = MAYONNAISE.calories; // калорий
        }
    }
}

/**
 * Функция вызывается при выборе гамбургера и добавок к нему.
 * @param element: элемент, по которому кликнули.
 */
function chooseType(element) {
    // Определяем, что было изменено в составе гамбургера
    if (element.name == 'hamburger') {
        hamburger.chooseType();
    }
    else if (element.name == 'additive') {
        hamburger.addAdditive();
    }
    else if (element.name == 'condiment' || element.name == 'mayonnaise') {
        hamburger.addCondimentMayonnaise(element.name);
    }
    // Вычисляем полную стоимость и калорийность
    console.log(hamburger);
    let [price, calories] = hamburger.calculateTotal();

    // Выводим на экран
    priceBlock.innerText = `Стоимость: ${price}`;
    caloriesBlock.innerText = `Калории: ${calories}`;
}

// Создаем объект-гамбургер
var hamburger = new Hamburger();
// Создаем объект-приправа
// Блоки для вывода стоимости и калорий
var priceBlock = document.getElementById("price");
var caloriesBlock = document.getElementById("calories");

