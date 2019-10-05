const Trampo = require('../Models/TrampoModel');
const jwt = require('jsonwebtoken');
const Configs = require('../Configs/configs');

let trampoRoutes = (route, routeAuth) => {
  routeAuth.post('/trampo/create', (req, res) => {
    let user = verifyType({ req: req, res: res, type: 'user' });
    Trampo.create(req.body).then(result => {
      res.status(200).send(result);
    }).catch(err => {
      res.status(400).send(err);
    });
  });
  routeAuth.post('/trampo/:situation/:service_id', (req, res) => {
    let user = verifyType({ req: req, res: res });
    Trampo.changeServiceSituation(req.body.id_user, req.params.service_id, req.params.situation).then(result => {
      res.status(result.status).send(result);
    }).catch(err => {
      res.status(err.status).send(err);
    });
  });
  routeAuth.get('/trampo/search_services', (req, res) => {
    verifyType({ req: req, res: res, type: 'partner'});
    Trampo.serachServices(req.query.searchValue, req.query.serviceType, req.query.offset).then(result => {
      res.send(result);
    }).catch(() => {
      res.send('Error');
    });
  });
}
function verifyType({ req, res, type }) {
  let userSession = JSON.parse(jwt.verify(req.headers.authorization, Configs.secret).data);
  if (type && type != userSession['type']) res.status(400).send({
    message: 'Usuário não permitido!',
  }); 
  return userSession;
}

module.exports = trampoRoutes;