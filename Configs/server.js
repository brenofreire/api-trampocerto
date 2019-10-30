const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 4444;
const cors = require('cors');



const jwt = require('jsonwebtoken');
const configs = require('./configs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('segredoSegredoso', configs.secret);


route = express.Router();
routeAuth = require('./auth')(express);

app.use(cors());
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