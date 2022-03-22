const express = require("express");
const app = express();

//Ejs como view engine/ redenrizar html
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/:nome/:lang',(req, res)=>{
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
      {  nome: "Doritos",preco: 3.12},
      { nome: "Coca",preco: 5},
      { nome: "Jaca",preco: 10}
    ]

    res.render("index",{
        nome: nome,
        lang: lang,
        empre: "Guia do programador",
        inscritos: 8000,
        msg: exibirMsg,
        produtos:produtos
    });
})
app.listen(8080,()=>{
    console.log("App rodando")
})