/**
 * Функция проверяет правильность ввода значений в поля формы перед отправкой.
 */
validate = (e) => {
    e.preventDefault();
    // Имя может содержать только буквы
    let name = document.getElementById('name');
    let regExp = /^[a-zа-я]+$/ig;
    check_and_paint(regExp, name);
    // Телефон имеет вид +7(000)000-0000
    let phone = document.getElementById('phone');
    regExp = /^\+\d\(\d{3}\)\d{3}-\d{4}$/ig;
    check_and_paint(regExp, phone);
    // Email имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru
    let email = document.getElementById('email');
    regExp = /^[a-z]+?[\.\-]?[a-z]+@[a-z]+\.[a-z]+$/ig;
    check_and_paint(regExp, email);
    // Текст произвольный (непустой)
    let msgText = document.getElementById('msgText');
    regExp = /./ig;
    check_and_paint(regExp, msgText);
}

/**
 * Функция проверяет на истинность регулярное выражение и в случае необходимости
 * закрашивает фон поля.
 * @param regExp: регулярное выражение;
 * @param field: поле, которое нужно проверить.
 */
check_and_paint = (regExp, field) => {
    if (regExp.test(field.value) == false)
        field.style = 'background: pink';
    else
        field.style = 'background: write';
}