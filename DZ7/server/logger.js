const fs = require('fs');
const moment = require('moment');
const file = './server/db/stats.json';

const logItem = {
    timeEvent: moment,
    action: '',
    productId: 0,
    productName: '',
    // quantity: 0,
};

const log = (action, req, cart) => {
    // console.log(action);
    const cartList = JSON.parse(cart);
    logItem.timeEvent = moment().format('LLLL');
    logItem.action = action;

    if (action === 'add' || action === 'del') {
        logItem.productId = +req.body.id_product;
        logItem.productName = req.body.product_name;
        logItem.quantity = req.body.quantity;
    }
    if (action === 'change' ) {
        const find = cartList.contents.find(el => el.id_product === +req.params.id);
        logItem.productId = +req.params.id;
        logItem.productName = find.product_name;
        logItem.quantity = find.quantity;
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