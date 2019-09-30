const Trampo = require('../Models/TrampoModel');
const jwt = require('jsonwebtoken');
const Configs = require('../Configs/configs');

let trampoRoutes = (route, routeAuth) => {
    routeAuth.post('/trampo/create', (req, res) => {
        Trampo.create(req.body).then(result => {
            res.status(200).send('aaa');
        });
    });
}

module.exports = trampoRoutes;