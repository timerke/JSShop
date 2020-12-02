/*
Модуль содержит определение компонентов, отвечающих за корзину и товаров в корзине.
*/

const productInBasket = {
    name: 'product-in-basket',
    props: ['good', 'addGood', 'deleteGood', 'index'],
    template: `<tr>
                    <td>{{ good.product_name }}</td>
                    <td>{{ good.price }}</td>
                    <td>{{ good.quantity }}</td>
                    <td>{{ good.price * good.quantity }}</td>
                    <td>
                        <button type="button" class="btn btn-primary"
                            v-on:click="addGood(good)">+</button>
                        <button type="button" class="btn btn-primary"
                            v-on:click="deleteGood(good)">-</button>
                    </td>
                </tr>`,
    // Действия, которые выполняются при загрузке страницы
    mounted() {

    }
};

const basket = {
    name: 'basket',
    // Компоненты корзины
    components: {
        'product-in-basket': productInBasket,
    },
    data() {
        return {
            goodsInBasket: [], // список товаров в корзине
        }
    },
    template: `<div class="dropleft">
                    <button class="btn btn-outline-primary my-2 my-sm-0 dropdown-toggle" type="button"
                        id="basketBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Корзина
                    </button>
                    <!--Содержимое корзины-->
                    <div v-if="goodsInBasket.length>0" class="dropdown-menu" aria-labelledby="basketBtn">
                        <div class="dropdown-item">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">Название</th>
                                        <th scope="col">Цена</th>
                                        <th scope="col">Количество</th>
                                        <th scope="col">Стоимость</th>
                                        <th scope="col">+/-</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <product-in-basket  v-for="good in goodsInBasket" v-bind:good="good"
                                    v-bind:addGood="addGood" v-bind:deleteGood="deleteGood">
                                    </product-in-basket>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!--Корзина пустая-->
                    <div v-else class="dropdown-menu" aria-labelledby="basketBtn">
                        Корзина пустая
                    </div>
                </div>`,
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
    },
    // Действия, которые выполняются при загрузке страницы
    mounted() {
        // Полуаем список товаров в корзине из сервера
        url = 'getBasket.json';
        this.$root.getGoods(url).then((response) => {
            if (response.status == 200)
                return response.json()
        }).then((data) => {
            this.goodsInBasket = data.contents;
        });
    }
}