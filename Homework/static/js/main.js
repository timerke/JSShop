/**
 * Класс для объекта со списком товаров.
 */
class ProductsList {
    #goods;
    #allProducts;

    /**
     * Конструктор класса.
     * @param container: имя css-класса для блока со списком товаров.
     */
    constructor(container = '.main') {
        this.container = container; // css-класс блока товаров
        this.#goods = []; // список товаров
        this.#allProducts = []; // список экземпляров класса ProductItem
        this.#fetchGoods(); // заполняем список товаров goods
        this.#render(); // отображаем товары на странице
        this.#showTotalPrice(); // показываем суммарную стоимость товаров
    }

    /**
     * Метод заполняет список товаров.
     */
    #fetchGoods() {
        this.#goods = [
            { id: 1, title: 'Notebook', price: 20000, img: 'static/img/notebook.jpg' },
            { id: 2, title: 'Mouse', price: 1500, img: 'static/img/mouse.jpg' },
            { id: 3, title: 'Keyboard', price: 5000, img: 'static/img/keyboard.jpg' },
            { id: 4, title: 'Gamepad', price: 4500, img: 'static/img/gamepad.jpg' },
            { id: 5, title: 'Speaker', price: 500, img: 'static/img/speaker.jpg' },
            { id: 6, title: 'Hard disk', price: 4300, img: 'static/img/hdd.jpg' },
            { id: 7, title: 'Monitor', price: 440, img: 'static/img/monitor.jpg' },
        ];
    }

    /**
     * Метод отображает товары на странице.
     */
    #render() {
        // Получаем блок для списка всех товаров
        const container = document.querySelector(this.container);
        // Вставляем в блок все товары
        for (let product of this.#goods) {
            const productObject = new ProductItem(product);
            this.#allProducts.push(productObject);
            container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    /**
     * Метод вычисляет суммарную стоимость всех товаров в списке товаров.
     * @return: суммарная стоимость всех товаров в списке.
     */
    #calculateTotalPrice() {
        let totalPrice = 0;
        for (let product of this.#allProducts) {
            totalPrice += product.price;
        }
        return totalPrice;
    }

    /**
     * Метод отображает в блоке со списком всех товаров суммарную стоимость всех товаров.
     */
    #showTotalPrice() {
        // Получаем блок для списка всех товаров
        const container = document.querySelector(this.container);
        // Вставляем в блок суммарную стоимость
        container.insertAdjacentHTML("afterbegin", `<h2>Суммарная стоимость всех товаров ${this.#calculateTotalPrice()}</h2>`);
    }

    /**
     * Метод возвращает товар из списка товаров по Id товара.
     * @param id: Id товара.
     * @return: экземпляр класса ProductItem.
     */
    getProduct(id) {
        for (let product of this.#allProducts) {
            if (id == product.id)
                return product;
        }
    }
}

/**
 * Класс для объекта-товара.
 */
class ProductItem {
    /**
     * Конструктор класса.
     * @param product: объект-товар.
     */
    constructor(product) {
        this.id = product.id; // Id товара
        this.title = product.title; // имя
        this.price = product.price; // цена
        this.img = product.img; // путь к изображению товара
    }

    /**
     * Метод создает HTML-код для карточки товара.
     */
    getHTMLString() {
        return `<div class="card product-item">
                    <img src="${this.img}" class="card-img-top" alt="Картинка ${this.title}">
                    <div class="card-body">
                        <h5 class="card-title">${this.title}</h5>
                        <p class="card-text">${this.price}</p>
                        <button id="${this.id}" class="btn btn-primary" onclick="basket.addProduct(this)">Добавить в корзину</button>
                    </div>
                </div>`;
    }
}

/**
 * Класс для корзины товаров.
 */
class Basket {
    /**
     * Конструктор класса.
     */
    constructor(container = '.main') {
        this.container = container; // css-класс блока корзины с товарами
        this.basketItems = []; // список товаров в корзине
    }

    /**
     * Метод добавляет товар в корзину.
     * @param btn: кнопка, по которой кликнули, чтобы добавить товар в корзину.
     */
    addProduct(btn) {
        console.log(this);
        // Получаем товар, который добавили в корзину
        let product = productList.getProduct(btn.id);
        // Проверяем, есть ли в корзине такой товар
        let basketItem = this.#checkInBasket(btn.id);
        if (basketItem)
            // Товар в корзине уже есть, увеличиваем количество на 1
            basketItem.increase();
        else
            // Товара в корзине нет, добавляем в список
            this.basketItems.push(new BasketItem(product));
    }

    /**
     * Метод проверяет, есть ли в корзине товар.
     * @param id: Id товара.
     * @return: товар, найденный в корзине, null иначе.
     */
    #checkInBasket(id) {
        for (let item of this.basketItems) {
            if (id == item.id)
                return item;
        }
        return null;
    }

    /**
     * Метод отображает корзину с товарами.
     */
    render() {
        // Получаем блок для списка всех товаров
        const container = document.querySelector(this.container);
        console.log(this);
        container.innerHTML = '';
        // Вставляем в блок все товары
        for (let item of this.basketItems)
            container.insertAdjacentHTML('beforeend', item.getHTMLString());
    }

    /**
     * Метод увеличивает/уменьшает на 1 количество товара из корзины.
     * @param btn: кнопка, по которой кликнули.
     */
    changeNumber(btn) {
        let [id, change] = btn.id.split(' ');
        let product = this.#checkInBasket(id);
        if (change == '+')
            product.increase()
        else if (change == '-')
            product.decrease();

        console.log(product);
        product.renderChanges();
    }
}

/**
 * Класс для элемента корзины товаров. Класс наследует свойства и методы от класса
 * ProductItem.
 */
class BasketItem extends ProductItem {
    /**
     * Конструктор класса.
     */
    constructor(product, number = 1) {
        super(product); // вызываем конструктор класса-родителя
        this.number = number; // количество штук товара
    }

    /**
     * Метод увеличивает на 1 количество товара.
     */
    increase() {
        this.number++;
    }

    /**
     * Метод уменьшает на 1 количество товара.
     */
    decrease() {
        if (this.number > 0)
            this.number--;
    }

    /**
     * Метод создает HTML-код для карточки товара в корзине.
     */
    getHTMLString() {
        return `<div id="${this.id}" class="card product-item">
                    <img src="${this.img}" class="card-img-top" alt="Картинка ${this.title}">
                    <div class="card-body">
                        <h5 class="card-title">${this.title}</h5>
                        <p class="card-text">Цена: ${this.price}</p>
                        <p class="card-text">Стоимость: ${this.#calculateTotalSum()}</p>
                        <p class="card-text">Количество: ${this.number}</p>
                        <button id="${this.id} +" class="btn btn-primary" onclick="basket.changeNumber(this)">+</button>
                        <button id="${this.id} -" class="btn btn-primary" onclick="basket.changeNumber(this)">-</button>
                    </div>
                </div>`;
    }

    /**
     * Метод отображает изменения в количестве штук товара из корзины.
     */
    renderChanges() {
        let product = document.getElementById(this.id);
        let totalPrice = product.childNodes[3].childNodes[5];
        let number = product.childNodes[3].childNodes[7];
        totalPrice.innerText = `Стоимость: ${this.#calculateTotalSum()}`;
        number.innerText = `Количество: ${this.number}`;
    }

    /**
     * Метод вычисляет суммарную стоимость товара из корзины.
     * @return: суммарная стоимость товара из корзины.
     */
    #calculateTotalSum() {
        return this.price * this.number;
    }
}

// Создаем объект со списком товаров на странице
var productList = new ProductsList();
// Создаем корзину
var basket = new Basket();
// Получаем кнопку Корзина
let basketBtn = document.getElementById('basketBtn');