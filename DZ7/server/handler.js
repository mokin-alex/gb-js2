const fs = require('fs');
const cart = require('./cart');
const logger = require('./logger');

const actions = {
    add: cart.add,
    change: cart.change,
    del: cart.del,
};

const handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            const newCart = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                    if (action === 'add' || action === 'del') logger.logger(action, req.body.id_product, req.body.product_name, req.body.quantity);
                    else logger.logger(action, req.params.id, req.body.product_name, req.body.quantity);
                }
            })
        }
    });
};

module.exports = handler;
