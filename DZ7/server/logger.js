const fs = require('fs');
const moment = require('moment');
const file = './server/db/stats.json';

const logItem = {
    timeEvent: moment,
    action: '',
    productId: 0,
    productName: '',
    quantity: 0, //количество товара в корзине (т.е. после выполнения операции)
};

const log = (action, req, cart) => {
    const cartList = JSON.parse(cart);
    logItem.timeEvent = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    logItem.action = action;

    if (action === 'add') {
        logItem.productId = +req.body.id_product;
        logItem.productName = req.body.product_name;
        logItem.quantity = req.body.quantity;
    }
    if (action === 'del') {
        logItem.productId = +req.body.id_product;
        logItem.productName = req.body.product_name;
        logItem.quantity = 0; //после удаления в корзине ничего не остается - 0
    }
    if (action === 'change') {
        const find = cartList.contents.find(el => el.id_product === +req.params.id);
        logItem.productId = +req.params.id;
        logItem.productName = find.product_name;
        logItem.quantity = +find.quantity; // значение берем из новой Корзины после выполнения операции изменения
    }

    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const logs = JSON.parse(data);
            logs.push(logItem);
            fs.writeFile(file, JSON.stringify(logs, null, 4), (err) => {
                if (err) console.log('err');
            })
        }
    })
};

module.exports = {
    log,
};