let banco = require('../../Configs/banco.js');

let createTables = () => {
  return new Promise((response) => {
    let schemas = {
      users: `
        CREATE TABLE IF NOT EXISTS users (
          id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
          
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          type VARCHAR(255) NOT NULL,
          role ENUM('1','2','3','4') DEFAULT 1,

          created_at VARCHAR(255) NOT NULL,
          updated_at VARCHAR(255) NOT NULL
        );        
      `,
      temp_uers: `
        CREATE TABLE IF NOT EXISTS temp_users (
          id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,

          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          type VARCHAR(255) NOT NULL,
          accepted TINYINT DEFAULT 0,
          token VARCHAR(255),
          

          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `
    }
    for (const table in schemas) banco.query(schemas[table]);
  });
}

module.exports = { createTables };