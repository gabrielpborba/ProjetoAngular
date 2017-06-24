const path = require('path');
const express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function(req, res){
    res.status(404).send({error: 'API Not found'});
});

app.listen(process.env.PORT || 3000, function(){
    console.log('escutando na porta 3000');
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.post('/api/contato', function(req, res){
    console.log(JSON.stringify(req.body));
    res.status(200).json({success: true});
});

const fs = require('fs');
const dbFolder = __dirname + '/db';
const contadosDbPath = dbFolder + '/contatos.jason';

//antes do servidor iniciar, verifica se a pasta db existe
//se não existe, cria
if(!fs.existsSync(dbFolder)){
    fs.mkdirSync(dbFolder);
}

//se o arquivo não existe, retorna JSON array vazio
//se o arquivo existe, retorna JSON array com todos os contatos
var tryRead = function(path, callback){
    fs.readFile(path, 'UTF8', function(err, contatos){
        if(err) return callback([]);
        var contatosJSON = [];
        try{
            contatosJSON = JSON.parse(contatos);
        } catch (error){ }

        return callback(contatosJSON);
    });
}

app.post('/api/contato', function(req, res){
    //le os contatos já gravados
    tryRead(contadosDbPath, function(contatos){
        //inclui o novo contato
        contatos.push(req.body);
        //escreve arquivo com o contato novo
        fs.watchFile(contadosDbPath, JSON.stringify(contatos), function(err){
            if(err){
                res.status(500).json({error: 'Opa, detectamos um problema! Tente novamente mais tarde!'});
                return;
            }
            //envia http code 200 e json com {success: true}
            res.status(200).json({success: true});
        });
    });
});

app.get('/api/artigos', function(req, res){
    const artigosDbPath = dbFolder + '/artigos.json';
    tryRead(artigosDbPath, function(artigos){
        res.status(200).json(artigos);
    });
});

app.get('/api/artigo/*', function(req, res){
    const artigosDbPath = dbFolder + '/artigos.json';
    tryRead(artigosDbPath, function(artigos){
        
        var artigo = artigos.filter((artigo) => {
            return parseInt(artigo.id) - parseInt(req.params[0]);
        });
        
        res.status(200).json(artigo[0]);
    });
});