const express = require('express');
const fs = require('fs');
const Log = require('./log');
const log = new Log();
const app = express();

// Активируем мидлвары
app.use(express.json()); // работаем с json
app.use('/', express.static('./public')); // запросы в корень сайта

/**
 * Функция определяет количество товаров в корзине.
 * @param basket: массив товаров.
 * @returns: количество товаров и полная стоимость корзины.
 */
calculateBasket = (basket) => {
    let sum = 0;
    for (let good of basket) {
        sum += good.quantity * good.price;
    }
    return [basket.length, sum];
}

// Получения каталога товаров
app.get('/api/products', (req, res) => {
    fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
        if (err)
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        else
            res.send(data);
    });
});

// Получения данных из корзины
app.get('/api/basket', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (err)
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        else
            res.send(data);
    });
});

// Добавление нового товара в корзину
app.post('/api/basket', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (err)
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        else {
            // Парсим корзину, добавляем товар и записываем в БД
            const basket = JSON.parse(data);
            basket.contents.push(req.body);
            [basket.countGoods, basket.amount] = calculateBasket(basket.contents);
            fs.writeFile('./server/db/basket.json', JSON.stringify(basket), (err) => {
                if (err)
                    res.sendStatus(404, '{"result": 0}');
                else {
                    // Отправляем ответ и записываем лог
                    res.send('{"result": 1}');
                    log.writeAction(`Добавлен товар ${req.body.product_name}`);
                }
            });
        }
    });
});

// Изменяем количество товара
app.put('/api/basket/:id', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (err)
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        else {
            // Парсим корзину, ищем товар по Id и изменяем количество
            const basket = JSON.parse(data);
            const product = basket.contents.find(el => el.id_product == +req.params.id);
            product.quantity += req.body.quantity;
            [basket.countGoods, basket.amount] = calculateBasket(basket.contents);
            fs.writeFile('./server/db/basket.json', JSON.stringify(basket), (err) => {
                if (err)
                    res.send('{"result": 0}');
                else {
                    // Отправляем ответ и записываем лог
                    res.send('{"result": 1}');
                    log.writeAction(`Изменено количество товара ${product.product_name} на ${req.body.quantity}`);
                }
            });
        }
    });
});

// Удаление товара из корзины
app.delete('/api/basket/:id', (req, res) => {
    fs.readFile('./server/db/basket.json', 'utf-8', (err, data) => {
        if (err)
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        else {
            // Парсим корзину, ищем товар по Id и удаляем
            const basket = JSON.parse(data);
            const i = basket.contents.findIndex(el => el.id_product == +req.params.id);
            const product_name = basket.contents[i].product_name;
            basket.contents.splice(i, 1);
            [basket.countGoods, basket.amount] = calculateBasket(basket.contents);
            fs.writeFile('./server/db/basket.json', JSON.stringify(basket), (err) => {
                if (err)
                    res.send('{"result": 0}');
                else
                {
                    // Отправляем ответ и записываем лог
                    res.send('{"result": 1}');
                    log.writeAction(`Удален товар ${product_name}`);
                }
            });
        }
    });
});

/**
 * Запуск сервера на порте port.
 */
const port = 5555;
app.listen(port, () => {
    console.log(`Listening ${port} port...`);
});