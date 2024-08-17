const Sequelize = require("sequelize") ; // Importanto a bilioteca sequelize ; 
const connection = require("./database") ; // Importando a conexão com o banco de dados ; 

const Resposta = connection.define("respostas", { // Criando a tabela no banco de dados ; 

    corpo : { // Criando o campo "corpo" ; 
        type: Sequelize.TEXT, // Definindo o campo como text (pois será textos longos) ; 
        allowNull: false // Definindo que não será permitido valores nulos ; 
    },
    perguntaId : { // Criando o campo "pergunta ID" que referenciará a pergunta ; 
        type: Sequelize.INTEGER, // Definindo o campo como inteiro ; 
        allowNull: false // Definindo que não será permitido valores nulos ; 
    }
})

Resposta.sync({force:false}).then(() => {});  // Cria a tabela no banco de dados, caso não exista ; 

module.exports = Resposta ; // Esportando o model de Resposta ; 