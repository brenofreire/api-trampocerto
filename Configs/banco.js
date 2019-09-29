const mysql = require('mysql');

const dbConnection = function () {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'api.trampocerto'
    });
}

const query = function (query) {
    return new Promise((response, erro) => {
        let connection = dbConnection();
        connection.query(query, function (err, result) {
            if (err) {
                connection.end();
                erro(err);
            } else {
                connection.end();
                response(result);
            }
        });
    });
}

module.exports = { query }