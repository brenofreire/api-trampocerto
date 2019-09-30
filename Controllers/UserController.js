const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const Configs = require('../Configs/configs');

let userRoutes = (route, routeAuth) => {
    route.post('/register', (req, res) => {
        User.register(req.body).then((result) => {
            res.status(result.status).send(result);
        }).catch((err) => {
            res.status(err.status).send(err);
        });
    });
    route.post('/login', (req, res) => {
        User.login(req.body).then((result) => {
            res.status(result.status).send(result);
        }).catch((err) => {
            res.status(err.status).send(err);
        });
    });
}

module.exports = userRoutes;