/*
Модуль содержит определения компонентов, отвечающих за отображения списка товаров
и одного элемента товара в списке.
*/

const product = {
    name: 'product',
    props: ['good', 'addGood'],
    template: `<div class="card-body">
                    <h5 class= "card-title" > {{ good.product_name }}</h5>
                    <p class="card-text">Цена: {{ good.price }}</p>
                    <button class="btn btn-primary" v-on:click="addGood(good)">Купить</button>
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
                        <product v-bind:good="good" v-bind:addGood="basket.addGood"></product>
                    </div>
                </div>`,
    // Действия, которые выполняются при загрузке страницы
    mounted() {
        // Получаем ссылку на корзину
        this.basket = this.$root.$refs.basket;
        // Получаем список всех товаров из сервера
        let url = 'catalogData.json';
        this.$root.getGoods(url).then((response) => {
            if (response.status == 200)
                return response.json()
        }).then((data) => {
            this.allGoods = data;
            this.filteredGoods = data;
        });
    }
};