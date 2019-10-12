const mysql = require('mysql');
const env = 'PROD';
var settings = {};
if (env == 'PROD') {
  settings = {
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'bf026952482b8a',
    password: '2214ed7b',
    database: 'heroku_0eaa30b7132991a'
  }
}

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