const Trampo = require('../Models/TrampoModel');
const jwt = require('jsonwebtoken');
const Configs = require('../Configs/configs');

let trampoRoutes = (route, routeAuth) => {
  // Cria um serviço
  routeAuth.post('/trampo/create', (req, res) => {
    let user = verifyType({ req: req, res: res, type: 'user' });
    Trampo.create(req.body).then(result => {
      res.status(200).send(result);
    }).catch(err => {
      res.status(400).send(err);
    });
  });
  // Muda o status de um serviço
  routeAuth.get('/trampo/:situation/:service_id', (req, res) => {
    let user = verifyType({ req: req, res: res });
    Trampo.changeServiceSituation({
      id_user: user.type != 'partner' ? user.id : null,
      id_partner: user.type == 'partner' ? user.id : null,
      service_id: Number(req.params.service_id),
      situation: req.params.situation
    }).then(result => {
      res.status(result.status).send(result);
    }).catch(err => {
      res.status(err.status).send(err);
    });
  });
  // Pesquisa serviços disponíveis
  routeAuth.get('/trampo/search', (req, res) => {
    const user = verifyType({ req: req, res: res, type: 'partner' });
    if (user) Trampo.serachServices(req.query.searchValue, req.query.serviceType, req.query.offset, user.id).then(result => {
      res.status(200).send(result);
    }).catch(() => {
      res.status(400).send('Erro ao buscar lista de serviços.');
    });
  });
  // Pega os tipos de serviços disponiveis
  route.get('/trampo/services_types', (req, res) => {
    Trampo.getServicesTypes().then(result => {
      res.status(200).send(result);
    }).catch(() => {
      res.status(400).send('Erro ao retornar serviços.');
    });
  });
  // 
  route.get('/trampo/services_types', (req, res) => {
    Trampo.getServicesTypes().then(result => {
      res.status(200).send(result);
    }).catch(() => {
      res.status(400).send('Erro ao retornar serviços.');
    });
  });
}
function verifyType({ req, res, type }) {
  let userSession = JSON.parse(jwt.verify(req.headers.authorization, Configs.secret).data);
  if (type && type != userSession['type']) {
    res.status(400).send({
      message: 'Usuário não permitido!',
    });
    return false;
  } else return userSession;
}

module.exports = trampoRoutes;