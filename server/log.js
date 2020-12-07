/**
 * Модуль с функциями для выполнения логирования действий на сервере.
 */

const fs = require('fs');

class Log {
    /**
     * Конструктор класса.
     */
    constructor() {
        this.filename = './server/log.dat'; // путь к файлу с логами
        fs.access(this.filename, fs.F_OK, (err) => {
            if (err) {
                // Файла для логов нет, создадим пустой
                fs.writeFile(this.filename, '', (err) => {
                    if (err)
                        console.log(err);
                });
            }
        });
    }

    /**
     * Метод возвращает время в нужном формате.
     * @returns: время в формате yyyy-m-d H:M:S.
     */
    getTime() {
        const time = new Date();
        const H = time.getHours();
        const M = time.getUTCMinutes();
        const S = time.getSeconds();
        const y = time.getFullYear();
        const m = time.getMonth();
        const d = time.getDay();
        return `${y}-${m}-${d} ${H}:${M}:${S}`;
    }

    /**
     * Метод выводит в консоль содержимое файла с логами.
     */
    readActions(action) {
        fs.readFile(this.filename, 'utf-8', (err, data) => {
            if (err)
                console.log(err);
            else {
                console.log(`Содержимое файла ${this.filename}:`);
                console.log(`Содержимое файла ${data}`);
            }
        });
    }

    /**
     * Метод записывает действие.
     * @param action: действие, которое нужно записать.
     */
    writeAction(action) {
        fs.readFile(this.filename, 'utf-8', (err, data) => {
            if (err)
                console.log(err);
            else {
                data += `${this.getTime()} - ${action}\n`;
                fs.writeFile(this.filename, data, (err) => {
                    if (err)
                        console.log(err);
                });
            }
        });
    }
}

// Экспортируем класс
module.exports = Log;

// Для работы с модулем в консоли
if (require.main === module) {
    const log = new Log();
    log.readActions();
}