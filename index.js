const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connection = require('./database/database');
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
//database
connection
.authenticate()
.then(()=>{
    console.log("conexão feita com o bd")
})
.catch((msgErro)=>{
    console.log(msgErro)
})

//Ejs como view engine/ redenrizar html
app.set('view engine','ejs');
app.use(express.static('public'));
//bodyparser
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//rotas
app.get('/',(req, res)=>{
    Pergunta.findAll({raw:true}).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        }); 
    });
    
});

app.get('/perguntar',(req, res)=>{ 
    res.render("perguntar");
})
app.post("/salvarpergunta",(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //INSERINDO PERGUNTA NO BD
    Pergunta.create({titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");//redirecionando pag principal
    });
})

app.get('/pergunta/:id',(req, res)=>{ 
    var id = req.params.id;
    Pergunta.findOne({
        where:{id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            Resposta.findAll({
                
                where:{perguntaId : pergunta.id},
                order:[['id','Desc']]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
          
        }else{
            res.redirect("/");
        }
    })
})
app.post("/responder",(req, res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId : perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaId);
    });
});
app.listen(8080,()=>{
    console.log("App rodando")
});
