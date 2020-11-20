/*
Задача 1.
Дан большой текст, в котором для оформления прямой речи используются одинарные
кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
*/

const text = "One: 'Hi Mary.' Two: 'Oh, hi.'</br>\
One: 'How are you doing?'</br>\
Two: 'I'm doing alright. How about you?'</br>\
One: 'Not too bad. The weather is great isn't it?'</br>\
Two: 'Yes. It's absolutely beautiful today.'</br>\
One: 'I wish it was like this more frequently.'</br>\
Two: 'Me too.'</br>\
One: 'So where are you going now?'</br>\
Two: 'I'm going to meet a friend of mine at the department store'</br>\
One: 'Going to do a little shopping?'</br>\
Two: 'Yeah, I have to buy some presents for my parents.'</br>\
One: 'What's the occasion?'</br>\
Two: 'It's their anniversary.'</br>\
One: 'That's great. Well, you better get going. You don't want to be late.'</br>\
Two: 'I'll see you next time.'</br>\
One: 'Sure.' Bye.'";

let content = document.getElementsByClassName('main')[0];
let task1 = `<h2>Задача 1</h2><p>${text.replace(/'/ig, '"')}</p>`;
content.insertAdjacentHTML("beforeend", task1);

/*
Задача 2.
Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
*/

let task2 = `<h2>Задача 2</h2><p>${text.replace(/\B'/ig, '"')}</p>`;
content.insertAdjacentHTML("beforeend", task2);