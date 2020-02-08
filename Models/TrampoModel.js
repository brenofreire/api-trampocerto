const banco = require('../Configs/banco');
const jwt = require('jsonwebtoken');

//======================================================//
//================= CREATE NEW SERVICE =================//
//======================================================//
const create = (service) => {
  return new Promise((response, error) => {
    service = validateService(service);
    // response(service);
    let create_service = banco.query(`
      INSERT INTO services (
        title, type, id_user, id_partner, description, prize, situation, slug, status
      ) VALUES (
        '${service.title}',
        '${service.type}',
        ${service.id_user},
        ${service.id_partner},
        '${service.description}',
        '${service.prize}',
        'created',
        '${service.slug}',
        '${service.status}'
      )
    `);
    if (create_service) response({ message: 'Serviço criado com sucesso!', status: 200 });
    else error({ message: 'Erro ao criar serviço', status: 400 });
  });
}
//=================================================//
//============= CHANGE SERVICE STATUS =============//
//=================================================//
const changeServiceSituation = ({id_user = null , id_partner = null, service_id, situation}) => {
  return new Promise(async (response, error) => {
    let action = {
      accepted: 'aceito',
      initialized: 'iniciado',
      finished: 'finalizado',
      refused: 'recusado',
      canceled: 'cancelado',
      deleted: 'excluído',
    }
    await banco.query(`
      INSERT INTO services_chats (
        id_partner, id_user, id_service, situation, status
      ) VALUES (
        ${id_partner},
        ${id_user},
        ${service_id},
        '${situation}',
        1
      )
    `);
    response({ message: `Serviço ${action[situation]} com sucesso!`, status: 200 });
    return;

    // verify if the partner is able to accept the service    
    if (situation == 'accepted') var verififyAcceptable = await banco.query(`
      SELECT id_partner, COUNT(id) AS created FROM services
      WHERE services.id = ${service_id}
      AND (services.id_partner IS NULL OR services.id_partner = ${user})
      AND services.situation = 'created'
    `);
    // if he is, it updates the service with the partner id
    if (verififyAcceptable && verififyAcceptable[0]['created'] == 1) {
      let accept_service = banco.query(`
        UPDATE services SET
        id_partner = ${user},
        situation = '${situation}'
        WHERE id = ${service_id}
      `);
      if (accept_service) response({ message: `Serviço ${action[situation]} com sucesso!`, status: 200 });
      else error({ message: 'Houve um erro inesperado ao aceitar serviço!', status: 400 });
    }
    // if he is not able to accept (he already accepted or someone else accepted)
    else error({ message: `Este serviço já foi ${action[situation]}!`, status: 401 });
  });
}
//=============================================================//
//======================= LIST SERVICES =======================//
//=============================================================//
function serachServices(serachValue, serviceType = null, offset, id_partner) {
  return new Promise(async (response, error) => {
    serviceType = serviceType ? `AND services.type = '${serviceType}'` : '';
    let services = await banco.query(`
      SELECT 
        services.*, 
        users.name AS client_name,
        (
          SELECT COUNT(id) FROM services_chats chat
          WHERE chat.id_partner = ${id_partner}
          AND chat.id_service = services.id
        ) AS service_isNew 
      FROM services       
      INNER JOIN users ON services.id_user = users.id
      WHERE (
        services.title LIKE '%${serachValue ? serachValue : ''}%'
        OR services.type LIKE '%${serachValue ? serachValue : ''}%'
      )
      AND services.status = 1
      AND services.situation = 'created'
      ${serviceType}
      HAVING service_isNew = 0
    `);
    if (services) response({ services: services, status: 200 });
    else response({ services: null, status: 305 });
  });
}
//=============================================//
//============= GET SERVICE TYPES =============//
//=============================================//
function getServicesTypes() {
  return new Promise(async (response, error) => {
    let service_types = await banco.query(`
      SELECT * FROM services_types
    `);
    if (service_types.length) response(service_types);
    else response({ message: 'Sem tipos de serviços cadastrados', status: 200 });
  });
}
//=========================================================//
//======================= UTILITIES =======================//
//=========================================================//
function validateService(service) {
  return {
    title: service.title ? service.title : '',
    type: service.type ? service.type : '',
    id_user: service.id_user ? service.id_user : null,
    id_partner: service.id_partner ? service.id_partner : null,
    description: service.description ? service.description : null,
    prize: service.prize ? service.prize : null,
    situation: service.situation ? service.situation : null,
    slug: service.slug ? service.slug : service.type,
    status: 1,
  }
}

module.exports = {
  create,
  changeServiceSituation,
  serachServices,
  getServicesTypes,
}