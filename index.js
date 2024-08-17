const express = require("express") ; // Importando a bibliotecca express ; 
const app = express() ; // Criando uma instância do express para a variável "app" ; 
const bodyParser = require("body-parser") ; // Importando a biblioteca body-parser ; 
const connection = require("./database/database") ; // Importando a conexão com o MySQL ; 
const Pergunta = require("./database/Pergunta") ; // Importando o arquivo Pergunta ; 
const Resposta = require("./database/Resposta") ; // Importando o arquivo Resposta ; 


connection // Fazendo a conexão com o banco de dados ; 
    .authenticate()
    .then(() => { 
        console.log("Conexão feita com o banco de dados!") ; 
    })
    .catch((msgErro) => {
        console.log(msgErro) ;
    }); 

app.set('view engine', 'ejs') ; // Configura o mecanismo de visualização (template engine) que será utilizado para renderizar as páginas HTML em EJS ; 
app.use(express.static('public')) ; // Configura o diretório de arquivos estáticos (CSS, imagens, JavaScript) ; 

app.use(bodyParser.urlencoded({extended:false})) ; // Permite que o usuário envie dados de um formulário e traduz em umna extrutura JavaScript ; 
app.use(bodyParser.json()) ; // Permite que seja lidos dados de formulário via JSON ; 

app.get("/", (req, res) => { // Criando a rota principal da aplicação (direcionando para a página de HOME) ; 
    Pergunta.findAll({raw:true, order: [
        ['id', 'DESC']
    ]}).then(perguntas => {  // Metódo responsável por percorrer o banco de dados e retornar os dados contidos nele ;
        res.render("index.ejs", {
            perguntas: perguntas // Enviando as perguntas para o front-end ; 
        }); 
    }) ;
})

app.get("/perguntar", (req, res) => { // Criando a rota da página de perguntas da aplicação ; 
    res.render("perguntar.ejs") ; 
})

app.post("/salvarpergunta", (req, res) => { // Criando a rota que receberá os dados do formulário ; 
    let titulo = req.body.titulo ; // Recuperando e atribuindo a variável o título digitado pelo usuário no formulário ; 
    let descricao = req.body.descricao ; // Recuperando e atribuindo a variável a descrição digitada pelo usuário no formulário ; 
    Pergunta.create({ // Salvando dados dentro da tabela no banco de dados ; 
        titulo: titulo , // Indicando que o campo título receberá a variável título ; 
        descricao: descricao // Indicando que a descrição receberá a variável descrição ; 
    }).then(() => {
        res.redirect("/") ; 
    }) ; 
})

app.get("/pergunta/:id", (req, res) => { // Criando a rota da página que selecionará uma pergunta específica pelo ID ; 
    let id = req.params.id ; // Recuperando o ID e atribuindo a variável id ; 
    Pergunta.findOne({ // Metódo que busca no banco de dados baseado em um ID específico ;  
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined) { // Verificando se existe uma pergunta com o ID existente ; 

            Resposta.findAll({ // Recuprando no banco de dados todas as respostas que correspondem a essa pergunta ; 
                where: {perguntaId: pergunta.id} ,
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta, 
                    respostas: respostas
                }) ; 
            })

            
        } 
        else { // Caso caia no ELSE, não exite pergunta com o ID informado ; 
            res.redirect("/") ;
        }
    }) ;
})

app.post("/responder", (req, res) => { // Criando a rota que será responsável por salvar a resposta no banco de dados ;
    let corpo = req.body.corpo ; // Recuperando e atribuindo a variável o "corpo" da resposta digitado pelo usuário ;
    let perguntaId = req.body.pergunta ; // Recuperando e atribuindo a variável o ID da pergunta a ser respondida pelo usuáerio ; 
    Resposta.create({ // Salvando os dados dentro da tabela no banco de dados ; 
        corpo: corpo, // Indicando que o campo corpo receberá a variável corpo ; 
        perguntaId: perguntaId // Indicando que o campo PerguntaID receberá o campo perguntaID
    }).then(() => {
        res.redirect(`/pergunta/${perguntaId}`) ; 
    })
})  

app.listen(8080, (erro) => { // Criando o servidor da aplicação, e atribuindo a porta 8080 ; 
    let servidorIniciado = erro ? "Erro ao executar servidor!" : "Servidor iniciado com sucesso" ; // Operador ternário que indicará se o servidor foi iniciado ou não ; 
    console.log(servidorIniciado) ; 
})