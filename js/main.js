// Адрес для запросов
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const app = new Vue({
    el: '#app',
    data: {
        allGoods: [], // список всех товаров
        filteredGoods: [], // список отфильтрованных товаров
        goodsInBasket: [], // товары в корзине
        searchWord: '', // поисковое слово
    },
    methods: {
        /**
         * Метод добавляет товар в корзину.
         * @param product: объект-товар, который нужно добавить в корзину.
         */
        async addGood(product) {
            let r = await fetch(`${API}/addToBasket.json?id=${product.id_product}`, { method: 'GET' });
            if (r.status == 200) {
                let data = await r.json();
                if (data.result == 1) {
                    alert(`В корзину добавлен товар ${product.product_name}`);
                    let good = this.goodsInBasket.find(good => good.id_product == product.id_product);
                    if (good)
                        // Товар уже есть в корзине
                        good.quantity++;
                    else {
                        // Товара в корзине нет
                        let newGood = {
                            id_product: product.id_product,
                            price: product.price,
                            product_name: product.product_name,
                            quantity: 1
                        };
                        this.goodsInBasket.push(newGood);
                    }
                }
                else
                    alert(`Не удалось добавить товар ${product.product_name} в корзину`);
            }
        },
        /**
         * Метод удаляет единицу товара из корзины.
         * @param product: объект-товар, который нужно удалить из корзины.
         */
        async deleteGood(product) {
            let r = await fetch(`${API}/deleteFromBasket.json?id=${product.id_product}`, { method: 'GET' });
            if (r.status == 200) {
                let data = await r.json();
                if (data.result == 1) {
                    alert(`Из корзины удален товар ${product.product_name}`);
                    let good = this.goodsInBasket.find(good => good.id_product == product.id_product);
                    if (good.quantity > 1)
                        // Товар будет в корзине и после удаления одной единицы
                        good.quantity--;
                    else {
                        // Товара полностью удален из корзины
                        let i = this.goodsInBasket.indexOf(good);
                        this.goodsInBasket.splice(i, 1);
                    }
                }
                else
                    alert(`Не удалось удалить товар ${product.product_name} из корзины`);
            }
        },
        /**
         * Метод запрашивает список всех товаров на сервере.
         * @param url: адрес, куда нужно сделать запрос.
         */
        getGoods(url) {
            return fetch(`${API}/${url}`, { method: 'GET' });
        },
        /**
         * Метод ищет товары, совпадающие с поисковым словом.
         */
        searchGoods() {
            let regExp = new RegExp(this.searchWord, 'i');
            this.filteredGoods = this.allGoods.filter(good => regExp.test(good.product_name));
        },
    },
    mounted() {
        // Получаем список всех товаров из сервера
        let url = 'catalogData.json';
        this.getGoods(url).then((response) => {
            if (response.status == 200)
                return response.json()
        }).then((data) => {
            this.allGoods = data;
            this.filteredGoods = data;
        });
        // Полуаем список товаров в корзине из сервера
        url = 'getBasket.json';
        this.getGoods(url).then((response) => {
            if (response.status == 200)
                return response.json()
        }).then((data) => {
            this.goodsInBasket = data.contents;
        });
    }
});