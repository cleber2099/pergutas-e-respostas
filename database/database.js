const Sequelize = require('sequelize');
const connection = new Sequelize('guiaperguntas','root','2099',{
  host: 'localhost',
  dialect: 'mysql'  
});

module.exports = connection;
