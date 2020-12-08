/*
Модуль содержит определения компонентов, отвечающих за отображения списка товаров
и одного элемента товара в списке.
*/

const product = {
    name: 'product',
    props: ['good', 'addGood'],
    template: `<div>
                    <img :src="good.img" class="card-img-top" :alt="good.product_name">
                    <div class="card-body">
                        <h5 class= "card-title" > {{ good.product_name }}</h5>
                        <p class="card-text">Цена: {{ good.price }}</p>
                        <button class="btn btn-primary" @click="addGood(good)">Купить</button>
                    </div>
                </div>`,
};

const productList = {
    name: 'product-list',
    // Компоненты списка товаров
    components: {
        'product': product,
    },
    data() {
        return {
            allGoods: [], // список всех товаров
            filteredGoods: [], // список отфильтрованных товаров
            basket: null, // ссылка на корзину
        };
    },
    template: `<div class="products_list">
                    <h1 v-if="filteredGoods.length==0"Товаров нет</h1>
                    <div class="card" v-for="good in filteredGoods">
                        <product :good="good" :addGood="addGood"></product>
                    </div>
                </div>`,
    methods: {
        /**
         * Метод добавляет новый товар в корзину.
         * @param good: объект-товар, который нужно добавить в корзину.
         */
        async addGood(good) {
            // Определяем, имеется ли товар в корзине
            const goodInBasket = this.basket.findGood(good.id_product);
            // Отправляем соотвествующий запрос POST или PUT
            if (goodInBasket) {
                // Товар уже есть в корзине
                this.basket.increaseNumber(goodInBasket);
                return;
            }
            // Товара в корзине нет
            const goodForBasket = {
                id_product: good.id_product,
                price: good.price,
                product_name: good.product_name,
                quantity: 1,
            };
            // Отправляем запрос POST
            r = this.$root.postRequest('/api/basket/', goodForBasket).then((data) => {
                if (data.status == 200)
                    return data.json();
            }).then((data) => {
                if (data.result == 1)
                    this.basket.addGood(goodForBasket);
                else
                    alert(`Не удалось добавить товар ${good.product_name} в корзину`);
            });
        },
    },
    // Действия, которые выполняются при загрузке страницы
    mounted() {
        // Получаем ссылку на корзину
        this.basket = this.$root.$refs.basket;
        // Получаем список всех товаров из сервера
        this.$root.getRequest('/api/products').then((data) => {
            if (data.status == 200)
                return data.json();
        }).then(data => {
            this.allGoods = data;
            this.filteredGoods = data;
        });
    }
};