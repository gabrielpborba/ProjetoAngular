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
app.use(body.bodyParser.json());

app.post('/api/contato', function(req, res){
    console.log(JSON.stringify(req.body));
    res.status(200).json({success: true});
});

const fs = require('fs');
const dbFolder = __dirname + '/db';
const contadosDbPath = dbFolder + '/contatos.jason';

//pagina 50 step 2 continuar

