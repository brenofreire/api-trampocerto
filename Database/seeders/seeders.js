let banco = require('../../Configs/banco.js');

let createSeeds = () => {
  return new Promise((response) => {
    let seeds = {
      users: `
        INSERT INTO users (
            id, name, email, password, type, role, created_at, updated_at
        ) VALUES 
        (
            1,
            'Breno Freire',
            'breno@breno.com',
            '123123123',
            'user',
            '4',
            '${Date.now()}',
            '${Date.now()}'
        ),
        (
            2,
            'Admin',
            'admin@breno.com',
            '123123123',
            'user',
            '4',
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
    }
    for (const seed in seeds) banco.query(seeds[seed]);
  });
}

module.exports = { createSeeds };