const msgForm = {
    name: 'msg-form',
    data() {
        return {
            name: '', // имя отправителя сообщения
            phone: '', // номер телефона
            mail: '', // почта
            msg: '', // текст сообщения
        };
    },
    template: `<div>
                    <h2>Обратная связь</h2>
                    <form class="form">
                        <div class="form-group row">
                            <label for="name" class="col-sm-2 col-form-label">Имя</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-bind:style="{background: colorName}"
                                id="name" placeholder="Имя" v-model="name">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="phone" class="col-sm-2 col-form-label">Телефон</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-bind:style="{background: colorPhone}"
                                id="phone" placeholder="+7(000)000-0000" v-model="phone">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control" v-bind:style="{background: colorEmail}"
                                id="email" placeholder="name@example.com" v-model="mail">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="msgText" class="col-sm-2 col-form-label">Сообщение</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" v-bind:style="{background: colorMSG}"
                                id="msgText" rows="3" v-model="msg"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-10">
                                <button type="button" class="btn btn-primary" v-on:click="validate">Отправить</button>
                            </div>
                        </div>
                    </form>
                </div>`,
    methods: {
        /**
         * Метод проверяет на истинность регулярное выражение и в случае необходимости
         * закрашивает фон поля.
         * @param regExp: регулярное выражение;
         * @param field: поле, которое нужно проверить.
         */
        check_and_paint(regExp, field) {
            if (regExp.test(field) == false)
                return 'pink';
            else
                return 'white';
        },
        /**
         * Функция проверяет правильность ввода значений в поля формы перед отправкой.
         */
        validate(e) {
            e.preventDefault();
            this.colorName;
            this.colorPhone;
            this.colorEmail;
            this.colorMSG;
        },
    },
    computed: {
        /**
         * Метод проверяет валидность имени отправителя сообщения.
         */
        colorName() {
            // Имя может содержать только буквы
            const regExp = /^[a-zа-я]+$/ig;
            return this.check_and_paint(regExp, this.name);
        },
        /**
         * Метод проверяет валидность номера телефона.
         */
        colorPhone() {
            get:
            // Телефон имеет вид +7(000)000-0000
            regExp = /^\+\d\(\d{3}\)\d{3}-\d{4}$/ig;
            return this.check_and_paint(regExp, this.phone);
        },
        /**
         * Метод проверяет валидность почтового адреса.
         */
        colorEmail() {
            // Email имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru
            regExp = /^[a-z]+?[\.\-]?[a-z]+@[a-z]+\.[a-z]+$/ig;

            return this.check_and_paint(regExp, this.mail);
        },
        /**
         * Метод проверяет валидность сообщения.
         */
        colorMSG() {
            // Текст произвольный (непустой)
            regExp = /./ig;
            return this.check_and_paint(regExp, this.msg);
        },
    },
};

const app = new Vue({
    el: '#app',
    // Компоненты приложения
    components: {
        'form-component': msgForm,
    },
});
