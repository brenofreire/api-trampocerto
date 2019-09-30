const app = require('./Configs/server').app;
const route = require('./Configs/server').route;
const routeAuth = require('./Configs/server').routeAuth;

const rotasUsuario = require('./Controllers/UserController')(route, routeAuth);
const rotasTrampo = require('./Controllers/TrampoController')(route, routeAuth);

const migrations = require('./Database/migrations/tables.js').createTables().then().catch();
const seeders = require('./Database/seeders/seeders.js').createSeeds().then().catch();
 
