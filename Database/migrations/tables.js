let banco = require('../../Configs/banco.js');

let createTables = () => {
  return new Promise((response) => {
    let schemas = {
      users: `
        name VARCHAR(96) NOT NULL,
        email VARCHAR(96) NOT NULL,
        password VARCHAR(96) NOT NULL,
        type VARCHAR(64) NOT NULL,
        role ENUM('1','2','3','4') DEFAULT 1,
        status TINYINT NOT NULL
      `,
      temp_uers: `
        name VARCHAR(96) NOT NULL,
        email VARCHAR(96) NOT NULL,
        password VARCHAR(96) NOT NULL,
        type VARCHAR(64) NOT NULL,
        accepted TINYINT DEFAULT 0,
        token VARCHAR(6)
      `,
      services_types: `
        CREATE TABLE IF NOT EXISTS services_types (
          id INT UNSIGNED NOT NULL PRIMARY KEY,
          type VARCHAR(64) NOT NULL UNIQUE,
          meta JSON    
        )
      `,
      services: `
        title VARCHAR(64) NOT NULL, 
        type VARCHAR(64) NOT NULL,
        id_user INT UNSIGNED NOT NULL,
        id_partner INT UNSIGNED,
        description TEXT,
        prize VARCHAR(16),
        situation VARCHAR(32),
        slug VARCHAR(128) NOT NULL,
        status TINYINT NOT NULL DEFAULT 1
      `,       
    }
    let raw = ['services_types']; 
    for (const table in schemas) {
      if(!raw.includes(table)) banco.query(`
        CREATE TABLE IF NOT EXISTS ${table} (
          id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
          ${schemas[table]},          
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP   
        );
      `); 
      else banco.query(schemas[table]);
    }
    banco.query(`
      ALTER TABLE services 
        ADD FOREIGN KEY (type) REFERENCES services_types(type),
        ADD FOREIGN KEY (id_user) REFERENCES users(id),
        ADD FOREIGN KEY (id_partner) REFERENCES users(id);
    `);
  });
}

module.exports = { createTables }; 