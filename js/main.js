// Адрес для запросов
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

/**
 * Функция отправляет запросы на сервер с помощью Promise.
 * @param url: адрес запроса.
 */
let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send()
    });
};

/**
 * Класс для объекта со списком товаров.
 */
class ProductsList {
    #goods;
    #filteredGoods;
    #allProducts;

    /**
     * Конструктор класса.
     * @param container: имя css-класса для блока со списком товаров.
     */
    constructor(container = '.main') {
        this.container = container; // css-класс блока товаров
        this.#goods = []; // список товаров
        this.#filteredGoods = []; // список отфильтрованных по поиску товаров
        this.#allProducts = []; // список экземпляров класса ProductItem
        this.#fetchGoods(); // заполняем список товаров goods
    }

    /**
     * Метод вычисляет суммарную стоимость всех товаров в списке товаров.
     * @return: суммарная стоимость всех товаров в списке.
     */
    #calculateTotalPrice() {
        let totalPrice = 0;
        for (let product of this.#filteredGoods) {
            totalPrice += product.price;
        }
        return totalPrice;
    }

    /**
     * Метод заполняет список товаров.
     */
    #fetchGoods() {
        getRequest(`${API}catalogData.json`)
            .then((data) => {
                this.#goods = JSON.parse(data);
                this.#filteredGoods = JSON.parse(data);
                // Отображаем товары на странице
                this.#render();
            })
            .catch((err) => console.log(err));
    }

    /**
     * Метод отображает товары на странице.
     */
    #render() {
        // Получаем блок для списка всех товаров
        const container = document.querySelector(this.container);
        container.innerHTML = '';
        let codeHTML = '';
        // Вставляем в блок все товары
        for (let product of this.#filteredGoods) {
            const productObject = new ProductItem(product);
            this.#allProducts.push(productObject);
            codeHTML += productObject.getHTMLString();
        }
        container.insertAdjacentHTML('beforeend', codeHTML);
        // Показываем суммарную стоимость товаров
        this.#showTotalPrice();
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
     * Метод фильтрует товары по поиску, введенному пользователем.
     * @param searchWord: слово для поиска в названиях товаров.
     */
    filterGoods(searchWord) {
        const regExp = new RegExp(searchWord, 'i');
        this.#filteredGoods = this.#goods.filter(good => regExp.test(good.product_name));
        this.#render();
    }

    /**
     * Метод возвращает название товара из списка товаров по Id товара.
     * @param id: Id товара.
     * @return: название товара.
     */
    getProductTitle(id) {
        for (let product of this.#allProducts) {
            if (id == product.id)
                return product.title;
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
        this.id = product.id_product; // Id товара
        this.title = product.product_name; // имя
        this.price = product.price; // цена
    }

    /**
     * Метод создает HTML-код для карточки товара.
     */
    getHTMLString() {
        return `<div class="card product-item">
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
    #goods;
    #allProducts;

    /**
     * Конструктор класса.
     */
    constructor(container = '.main') {
        this.container = container; // css-класс блока корзины с товарами
        this.#goods = []; // список товаров
        this.#allProducts = []; // список экземпляров класса ProductInBasket
    }

    /**
     * Метод проверяет, есть ли в корзине товар.
     * @param id: Id товара.
     * @return: товар, найденный в корзине, null иначе.
     */
    #checkInBasket(id) {
        for (let item of this.#allProducts) {
            if (id == item.id)
                return item;
        }
        return null;
    }

    /**
     * Метод отображает корзину с товарами.
     */
    #render() {
        // Получаем блок для списка всех товаров
        const container = document.querySelector(this.container);
        container.innerHTML = '';
        // Вставляем в блок все товары
        for (let product of this.#goods) {
            const productObject = new ProductInBasket(product);
            this.#allProducts.push(productObject);
            container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    /**
     * Метод добавляет единицу товара в корзину.
     * @param btn: кнопка, по которой кликнули, чтобы добавить товар в корзину.
     */
    async addProduct(btn) {
        // Отправляем Id товара с запросом на добавление товара в корзину
        let r = await fetch(`${API}addToBasket.json?id=${btn.id}`, { method: 'GET' });
        let response = await r.json();
        if (r.status == 200) {
            if (response.result == 1) {
                alert(`Товар добавлен в корзину`);
                return true;
            }
        }
        return false;
    }

    /**
     * Метод увеличивает/уменьшает на 1 количество товара из корзины.
     * @param btn: кнопка, по которой кликнули.
     */
    changeNumber(btn) {
        let [id, change] = btn.id.split(' ');
        let product = this.#checkInBasket(id);
        // Делаем запрос на добавление или уменьшение единицы товара и в случае
        // положительного ответа отображаем изменение в карточке товара
        if (change == '+' && this.addProduct(btn))
            product.increase();
        if (change == '-' && this.deleteProduct(btn))
            product.decrease();
        product.renderChanges();
    }

    /**
     * Метод удаляет единицу товара из корзины.
     * @param btn: кнопка, по которой кликнули, чтобы удалить товар.
     */
    async deleteProduct(btn) {
        // Отправляем Id товара с запросом на удаление единицы товара из корзины
        let r = await fetch(`${API}deleteFromBasket.json?id=${btn.id}`, { method: 'GET' });
        let response = await r.json();
        if (r.status == 200) {
            if (response.result == 1) {
                alert(`Товар удален из корзины`);
                return true;
            }
        }
        return false;
    }

    /**
     * Метод получает список товаров в корзине.
     */
    async fetchGoods() {
        let r = await fetch(`${API}getBasket.json`, { method: 'GET' });
        let response = await r.json();
        if (r.status == 200) {
            // Извлекаем все данные
            this.totalPrice = response.amount; // полная стоимость корзины
            this.totalCount = response.countGoods; // количество товаров в корзине
            this.#goods = response.contents; // список товаров в корзине
            // Отображаем корзину на экране
            this.#render();
        }
    }
}

/**
 * Класс для элемента корзины товаров. Класс наследует свойства и методы от класса
 * ProductItem.
 */
class ProductInBasket extends ProductItem {
    /**
     * Конструктор класса.
     */
    constructor(product) {
        super(product); // вызываем конструктор класса-родителя
        this.number = product.quantity; // количество штук товара
    }

    /**
     * Метод вычисляет суммарную стоимость товара из корзины.
     * @return: суммарная стоимость товара из корзины.
     */
    #calculateTotalSum() {
        return this.price * this.number;
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
                    <div class="card-body">
                        <h5 class="card-title">${this.title}</h5>
                        <p class="card-text">Цена: ${this.price}</p>
                        <p id="${this.id} price" class="card-text">Стоимость: ${this.#calculateTotalSum()}</p>
                        <p id="${this.id} number" class="card-text">Количество: ${this.number}</p>
                        <button id="${this.id} +" class="btn btn-primary" onclick="basket.changeNumber(this)">+</button>
                        <button id="${this.id} -" class="btn btn-primary" onclick="basket.changeNumber(this)">-</button>
                    </div>
                </div>`;
    }

    /**
     * Метод увеличивает на 1 количество товара.
     */
    increase() {
        this.number++;
    }

    /**
     * Метод отображает изменения в количестве штук товара из корзины.
     */
    renderChanges() {
        let totalPrice = document.getElementById(`${this.id} price`);
        let number = document.getElementById(`${this.id} number`);
        totalPrice.innerText = `Стоимость: ${this.#calculateTotalSum()}`;
        number.innerText = `Количество: ${this.number}`;
    }
}

// Создаем объект со списком товаров на странице
var productList = new ProductsList();
// Создаем корзину
var basket = new Basket();
// Получаем кнопку для поиска и задаем для нее функцию, которая будет вызываться при клике
document.getElementById('searchBtn').addEventListener('click', e => {
    let searchWord = document.querySelector('input[type="search"]').value;
    productList.filterGoods(searchWord);
});