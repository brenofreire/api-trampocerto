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
          id INT NOT NULL PRIMARY KEY,
          type VARCHAR(64) NOT NULL UNIQUE,
          meta JSON    
        )
      `,
      services: `
        title VARCHAR(64) NOT NULL,
        type VARCHAR(64) NOT NULL,
        id_user INT(11) NOT NULL,
        id_partner INT(11),
        description TEXT,
        prize VARCHAR(16),
        situation VARCHAR(32),
        status TINYINT NOT NULL
      `
    }
    // delete schemas['services'];
    let raw = ['services_types']; 
    for (const table in schemas) {
      if(!raw.includes(table)) banco.query(`
        CREATE TABLE IF NOT EXISTS ${table} (
          id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
          ${schemas[table]},          
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP   
        );
      `); 
      else banco.query(schemas[table]);
    }
  });
}

module.exports = { createTables };