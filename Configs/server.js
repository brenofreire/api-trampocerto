const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 4444;


const jwt = require('jsonwebtoken');
const configs = require('./configs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('segredoSegredoso', configs.secret);


route = express.Router();
routeAuth = require('./auth')(express);


app.use('/', (req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.use('/', route);
app.use('/v1', routeAuth);
// Add headers

module.exports = {
    app,
    route,
    routeAuth
}

app.listen(port, () => {
    console.log('Escutando na porta: ' + port);
})