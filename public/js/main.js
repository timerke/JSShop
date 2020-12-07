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
         * Мето отправляет запрос DELETE на сервер.
         * @param url: адрес запроса,
         * @param data: данные, отправляемые на сервер.
         */
        deleteRequest(url) {
            return fetch(url, { method: 'DELETE' });
        },

        /**
         * Метод отправляет запрос GET на сервер.
         * @param url: адрес запроса.
         */
        getRequest(url) {
            return fetch(url, { method: 'GET' });
        },

        /**
         * Метод отправляет запрос POST на сервер.
         * @param url: адрес запроса;
         * @param data: данные, отправляемые на сервер.
         */
        postRequest(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
        },

        /**
         * Мето отправляет запрос PUT на сервер.
         * @param url: адрес запроса,
         * @param data: данные, отправляемые на сервер.
         */
        putRequest(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
        },
    }
});