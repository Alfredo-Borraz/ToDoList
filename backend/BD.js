const mysql = require("mysql");
/* require("./app/routes/task.routes.js")(app); */

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    port: "8889",
    database: "ToDo"
});

connection.connect(function (err) {
    if (err) {
        return console.error('error: '+err.message);
    }
    console.log('connected to my MysQl server');
});

module.exports = connection;