const Sequelize = require("sequelize") ; // Importanto a bilioteca sequelize ; 
const connection = require("./database") ; // Importando a conexão com o banco de dados ; 

const Pergunta = connection.define('perguntas', { // Criando a tabela no banco de dados ; 
    titulo: { // Criando o campo titulo ; 
        type: Sequelize.STRING,  // Definindo o tipo como String (pois será texto curto) ; 
        allowNull: false // Definindo que não será permitido valores nulos ; 
    }, 
    descricao:{
        type: Sequelize.TEXT, // Definindo o tipo com Text (pois será textos longos) ; 
        allowNull: false // Definindo que não será permitido valores nulos ; 
    }
}) ; 

Pergunta.sync({force:false}).then(() => {} ) ; // Criando a tabela no banco de dados, caso ela não exista ; 

module.exports = Pergunta ; // Exportando o model de Pergunta ; 

