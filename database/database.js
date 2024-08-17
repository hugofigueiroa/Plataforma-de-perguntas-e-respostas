const Sequelize = require('sequelize') ; // Importando a biblioteca sequelize ; 

const connection = new Sequelize("guiaperguntas", "root", "05092005hb", { // Criando a conexão com o Banco de Dados ; 
    host: 'localhost' , 
    dialect: 'mysql'
}); 

module.exports = connection ; // Exportando a conexão para ser usada em outros arquivos ; 

