const fs = require('fs');
const moment = require('moment');

const logItem = {
    timeEvent: moment,
    action: '',
    productId: null,
    productName: '',
    request: '',
};

const logger = (action, id, name, req) => {
    console.log(req);
    const file = './server/db/stats.json';
    let log = "A"; //moment();
    logItem.timeEvent = moment();
    logItem.action = action;
    logItem.productId = id;
    logItem.productName = name;
    logItem.request = req;
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

    // // console.log(moment(), action, id, name);
    // // const log = logItem(moment, action, id, name);
    // fs.readFile(file, 'utf-8', (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         let newLog = data + moment();
    //         // newLog.push(log);
    //         fs.writeFile(file, newLog, (err) => {
    //             if (err) {
    //                 console.log(err);
    //                 // res.send('{"result": 0}');
    //             } else {
    //                 // res.send('{"result": 1}');
    //             }
    //         });
    //     }
    // })
};

module.exports = {
    logger,
};