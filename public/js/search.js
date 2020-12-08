/*
Модуль содержит определение компонента, отвечающего за поиск.
*/

const search = {
    name: 'search',
    data() {
        return {
            searchWord: '', // поисковое слово
            productList: null, // ссылка на компонент со списком товаров
        }
    },
    template: `<div>
                    <input v-model="searchWord" class="form-control mr-sm-2" type="search" placeholder="Поиск"
                        aria-label="Search" v-on:keyup="searchGoods">
                    <button type="button" class="btn btn-outline-primary my-2 my-sm-0"
                        v-on:click="searchGoods">Искать</button>
                </div>`,
    methods: {
        /**
         * Метод ищет товары, совпадающие с поисковым словом.
         */
        searchGoods() {
            let regExp = new RegExp(this.searchWord, 'i');
            this.productList.filteredGoods = this.productList.allGoods.filter(good => regExp.test(good.product_name));
        },
    },
    // Действия, которые выполняются при загрузке страницы
    mounted() {
        // Получаем ссылку на компонент со списком товаров
        this.productList = this.$root.$refs.productList;
    }
};