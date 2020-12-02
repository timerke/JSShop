// Адрес для запросов
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const app = new Vue({
    el: '#app',
    // Компоненты приложения
    components: {
        'basket': basket,
        'product-list': productList,
        'search': search,
    },
    methods: {
        /**
         * Метод запрашивает список товаров (всех товаров или товаров из корзины).
         * @param url: адрес, куда нужно сделать запрос.
         */
        getGoods(url) {
            return fetch(`${API}/${url}`, { method: 'GET' });
        },
    }
});