const fs = require('fs');
const cart = require('./cart');
const logger = require('./logger'); //maw homework

const actions = {
    add: cart.add,
    change: cart.change,
    del: cart.del, //maw homework
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
                    logger.log(action, req, newCart); //после успешной опреации запишем в лог это событие.
                }
            })
        }
    });
};

module.exports = handler;
