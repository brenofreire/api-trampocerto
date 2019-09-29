const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const Configs = require('../Configs/configs');

let rotas = (route, routeAuth) => {
    route.post('/register', (requisicao, response) => {
        User.register(requisicao.body).then((result) => {
            response.send(result);
        }).catch((err) => {
            response.send(err);
        });
    });
    route.post('/login', (requisicao, response) => {
        User.login(requisicao.body).then((result) => {
            response.send(result);
        }).catch((err) => {
            response.send(err);
        });
    });
}

module.exports = rotas;