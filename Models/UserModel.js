const banco = require('../Configs/banco');
const server = require('../Configs/server');
const jwt = require('jsonwebtoken');
const Configs = require('../Configs/configs');
const nodemailer = require('nodemailer');

const register = async function (user) {
    return new Promise(async (response) => {
        let verifyUser = await banco.query(`
            SELECT id FROM temp_users 
            WHERE email = '${user.email}'
        `);
        if (!verifyUser.length) {
            let createUser = await banco.query(`
                INSERT INTO temp_users 
                (
                    name, email, password, type, accepted
                ) VALUES (
                    '${user.name}',
                    '${user.email}',
                    '${user.password}',
                    '${user.type}',
                    '0'
                )
            `);
            if (createUser) {
                
                var transport = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                      user: "257275fd7a9637",
                      pass: "040c6c65b31598"
                    }
                });

                const message = {
                    from: 'elonmusk@tesla.com', // Sender address
                    to: 'to@email.com',         // List of recipients
                    subject: 'Design Your Model S | Tesla', // Subject line
                    text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
                };
                
                transport.sendMail(message, function(err, info) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log(info);
                    }
                });

                response(createUser);
            }
        } else {
            response('Deu ruim aqui parsero');
        }
    }).catch((error) => {
        error('Error');
    });
}
const login = function (user) {
    return new Promise((response, error) => {
        let verifyAccount = `
            SELECT name, email FROM users WHERE
            email = '${user.email}' AND
            password = '${user.password}'
        `
        banco.query(verifyAccount).then(result => {
            if (result.length == 1) {
                let userData = {
                    id: result[0].id,
                    name: result[0].name,
                    email: result[0].email,
                    password: result[0].password
                }
                var token = jwt.sign({ data: JSON.stringify(userData) }, Configs.secret, {
                    expiresIn: 60 * 60 * 24
                });
                response({
                    token: token,
                    user: result[0],
                });
            } else {
                error('Login ou senha inválidos.');
            }
        });
    }); 
}

module.exports = {
    register,
    login,
}