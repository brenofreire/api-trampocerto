const banco = require('../Configs/banco');
const server = require('../Configs/server');
const jwt = require('jsonwebtoken');
const Configs = require('../Configs/configs');
const nodemailer = require('nodemailer');
const tools = require('../Services/ToolsService');

const register = function (user) {
  return new Promise(async (response, error) => {
    let verifyUser = await banco.query(`
      SELECT id FROM temp_users 
      WHERE email = '${user.email}'
    `);
    if (!verifyUser.length) {
      user.token = tools.gerarHash();
      let createUser = await banco.query(`
        INSERT INTO temp_users 
        (
            name, email, password, type, accepted, token
        ) VALUES (
          '${user.name}',
          '${user.email}',
          '${user.password}',
          '${user.type}',
          '0',
          '${user.token}'
        )
      `);
      if (createUser) {
        let transport = nodemailer.createTransport({
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: '257275fd7a9637',
            pass: '040c6c65b31598'
          }
        });
        let message = {
          from: 'cadastro@trampocerto.com',
          to: `${user.email}`,
          subject: 'Conta TrampoCerto criada com sucesso!',
          html: `<b>Código:</b> <i>${user.token}</i>`,
        };
        transport.sendMail(message, function (err, info) {
          if (err) response({ message: 'Conta criada com sucesso!', status: 200 });
          else error({ message: 'Erro ao enviar email de confirmação!', status: 205 });
        });
      }
    } else response({ message: 'Deu ruim aqui parsero', status: 400 });
  }).catch((error) => { error({ message: 'Error', status: 400 }); });
}
const login = function (user) {
  return new Promise((response, error) => {
    banco.query(`
      SELECT name, email, role, id, type, password FROM users WHERE
      email = '${user.email}' AND
      password = '${user.password}'
    `).then(result => {
      if (result.length == 1) {
        let userData = {
          id: result[0].id,
          name: result[0].name,
          email: result[0].email,
          password: result[0].password,
          role: result[0].role,
          type: result[0].type,
        }
        let token = jwt.sign({ data: JSON.stringify(userData) }, Configs.secret, {
          expiresIn: 60 * 60 * 24
        });
        delete result[0].password;
        response({
          token: token,
          user: result[0],
          status: 200,
        });
      } else error({ message: 'Login ou senha inválidos.', status: 401 });
    });
  });
}

module.exports = {
  register,
  login,
}