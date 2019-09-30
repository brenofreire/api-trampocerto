const banco = require('../Configs/banco');
const jwt = require('jsonwebtoken');

const create = (service) => {
    return new Promise((response, error) => {
        response(service);
        // banco.query();
    });
}

module.exports = {
    create
}