const jwt = require('jsonwebtoken');
const configs = require('./configs');

module.exports = (express) => {
    //Endpoints autenticados
    routeAuth = express.Router();
    routeAuth.use((request, response, next) => {
        var token = request.headers['authorization'];
        if (!token) {
            response.statusCode = 401;
            response.end("jwt_auth_invalid_token");
        }
        validaToken(token).then(function (usuario) {
            if (usuario) {
                usuario = JSON.parse(usuario);
                request.usuario = usuario;
                next();
            } else {
                response.statusCode = 401;
                response.end("jwt_auth_invalid_token");
            }
        }).catch(function (erro) {
            response.statusCode = 401;
            response.end(erro);
        });
    });
    return routeAuth;
}

validaToken = (token) => {
    return new Promise((response, erro) => {
        if (token) jwt.verify(token, configs.secret, (err, decoded) => {
            if (err) erro('jwt_auth_invalid_token');
            else response(decoded.data);
        });
        else erro('jwt_auth_invalid_token');
    });
}