// Список с товарами
const products = [
    { id: 1, title: 'Notebook', price: 20000, filename: 'static/img/notebook.jpg' },
    { id: 2, title: 'Mouse', price: 1500, filename: 'static/img/mouse.jpg' },
    { id: 3, title: 'Keyboard', price: 5000, filename: 'static/img/keyboard.jpg' },
    { id: 4, title: 'Gamepad', price: 4500, filename: 'static/img/gamepad.jpg' },
    { id: 4, title: 'Speaker', price: 500, filename: 'static/img/speaker.jpg' },
    { id: 4, title: 'Hard disk', price: 4300, filename: 'static/img/hdd.jpg' },
    { id: 4, title: 'Monitor', price: 440, filename: 'static/img/monitor.jpg' },
];

/**
 * Стрелочная функция создает HTML-код для карточки товара.
 * @param title: название товара;
 * @param price: стоимость;
 * @param figPath: путь к картинке товара.
 * @return: HTML-код карточки с товаром.
 */
const renderProduct = (title, price, figPath) => {
    return `<img src="${figPath}" class="card-img-top" alt="Картинка ${title}">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${price}</p>
                <button class="btn btn-primary">Добавить в корзину</button>
            </div>`;
};

/**
 * Функция создает элементы для всех товаров в каталоге.
 * @param list: список товаров.
 */
const catalogInit = (list) => {
    // Получаем HTML-коды для карточек всех товаров и сохраняем в список
    const productsCodes = list.map((item) => renderProduct(item.title, item.price, item.filename));
    // Получаем блок с товарами
    let products_div = document.querySelector('.products');
    // Создаем элементы-карточки для всех товаров и добавляем их в блок товаров
    for (let productCode of productsCodes) {
        let product_div = document.createElement('div');
        product_div.className = 'card product-item';
        product_div.innerHTML = productCode;
        products_div.appendChild(product_div);
    }
};

catalogInit(products);
