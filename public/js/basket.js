/*
Модуль содержит определение компонентов, отвечающих за корзину и товаров в корзине.
*/

const productInBasket = {
    name: 'product-in-basket',
    props: ['good', 'increaseNumber', 'decreaseNumber', 'deleteGood'],
    template: `<tr>
                    <td>{{ good.product_name }}</td>
                    <td>{{ good.price }}</td>
                    <td>{{ good.quantity }}</td>
                    <td>{{ good.price * good.quantity }}</td>
                    <td>
                        <button type="button" class="btn btn-primary"
                            @click="increaseNumber(good)">+</button>
                        <button type="button" class="btn btn-primary"
                            @click="decreaseNumber(good)">-</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-primary"
                            @click="deleteGood(good)">Удалить</button>
                    </td>
                </tr>`,
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
                                        <th scope="col">Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <product-in-basket  v-for="good in goodsInBasket" :good="good"
                                    :increaseNumber="increaseNumber" :decreaseNumber="decreaseNumber"
                                    :deleteGood="deleteGood">
                                    </product-in-basket>
                                </tbody>
                            </table>
                            <p>Полная стоимость: <b>{{ calculateTotalSum }}</b> </p>
                        </div>
                    </div>
                    <!--Корзина пустая-->
                    <div v-else class="dropdown-menu" aria-labelledby="basketBtn">
                        Корзина пустая
                    </div>
                </div>`,
    methods: {
        /**
         * Метод добавляет в массив товаров из корзины новый товар.
         * @param good: объект-товар, который нужно добавить в корзину.
         */
        addGood(good) {
            this.goodsInBasket.push(good);
        },

        /**
         * Метод уменьшает на единицу количество товаров в корзине.
         * @param good: объект-товар, который нужно удалить из корзины.
         */
        async decreaseNumber(good) {
            if (good.quantity <= 1) {
                // После удаления единицы товара в корзине не останется данного товара
                this.deleteGood(good);
                return;
            }
            // Отправляем запрос PUT
            let data = {
                id_product: good.id_product,
                quantity: -1,
            };
            this.$root.putRequest(`/api/basket/${good.id_product}`, data).then((data) => {
                if (data.status == 200)
                    return data.json();
            }).then((data) => {
                if (data.result == 1)
                    good.quantity--;
                else
                    alert(`Не удалось удалить товар ${good.product_name} из корзины`);
            });
        },

        /**
         * Метод удаляет товар из корзины.
         * @param good: объект-товар, который нужно удалить из корзины.
         */
        async deleteGood(good) {
            // Отправляем запрос DELETE
            this.$root.deleteRequest(`/api/basket/${good.id_product}`).then((data) => {
                if (data.status == 200)
                    return data.json();
            }).then((data) => {
                if (data.result == 1) {
                    let i = this.goodsInBasket.indexOf(good);
                    this.goodsInBasket.splice(i, 1);
                }
                else
                    alert(`Не удалось удалить товар ${good.product_name} из корзины`);
            });
        },

        /**
         * Метод увеличивает на единицу количество товаров в корзине.
         * @param good: объект-товар, который нужно добавить в корзину.
         */
        async increaseNumber(good) {
            // Отправляем запрос PUT
            let data = {
                id_product: good.id_product,
                quantity: 1,
            };
            this.$root.putRequest(`/api/basket/${good.id_product}`, data).then((data) => {
                if (data.status == 200)
                    return data.json();
            }).then((data) => {
                if (data.result == 1)
                    good.quantity++;
                else
                    alert(`Не удалось добавить товар ${good.product_name} в корзину`);
            });
        },

        /**
         * Метод возвращает товар из корзины по Id.
         * @param good_id: Id товара.
         * @returns: объект-товар или undefined, если товара нет.
         */
        findGood(good_id) {
            return this.goodsInBasket.find((g) => g.id_product == good_id);
        },
    },
    computed: {
        /**
         * Метод вычисляет полную стоимость товаров в корзине.
         * @returns: полная стоимость корзины.
         */
        calculateTotalSum() {
            let sum = 0;
            for (let good of this.goodsInBasket)
                sum += good.quantity * good.price;
            return sum;
        },
    },
    // Действия, которые выполняются при загрузке страницы
    mounted() {
        // Полуаем список товаров в корзине из сервера
        this.$root.getRequest('/api/basket').then((data) => {
            if (data.status == 200)
                return data.json();
        }).then((data) => { this.goodsInBasket = data.contents; });
    }
}