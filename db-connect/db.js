
const sql = require('mysql');

const connection = sql.createConnection({
    host:'localhost',
    user:'root',
    paaword:'',
    database:'gobus'
});


connection.connect( err => {
    if (err) throw err;
    console.log('database connected');
})

module.exports = connection;

