let banco = require('../../Configs/banco.js');

let createSeeds = () => {
  return new Promise((response) => {
    let seeds = {
      users: `
        INSERT INTO users (
          id, name, email, password, type, role, status, created_at, updated_at
        ) VALUES (
          1,
          'Breno Freire',
          'breno@breno.com',
          '123123123',
          'admin',
          '4',
          '1',
          '${Date.now()}',
          '${Date.now()}'
        ), (
          2,
          'Cliente',
          'cliente@trampocerto.com',
          '123123123',
          'user',
          '4',
          '1',
          '${Date.now()}',
          '${Date.now()}'
        ), (
          3,
          'Partner',
          'partner@trampocerto.com',
          '123123123',
          'partner',
          '4',
          '1',
          '${Date.now()}',
          '${Date.now()}'
        )
        ON DUPLICATE KEY UPDATE 
        name = VALUES(name),
        email = VALUES(email),
        password = VALUES(password),
        role = VALUES(role),
        created_at = VALUES(created_at),
        updated_at = VALUES(updated_at)
      `,
      services_types: `
        INSERT INTO services_types (
          id, type
        ) VALUES (
          1,
          'pintura'
        ), (
          2,
          'encanamento'
        ), (
          3,
          'estrutural'
        ), (
          4,
          'eletrica'
        )
        ON DUPLICATE KEY UPDATE
        id = VALUES(id),
        type = VALUES(type)
      `,
    }
    for (const seed in seeds) banco.query(seeds[seed]);
  });
}

module.exports = { createSeeds };