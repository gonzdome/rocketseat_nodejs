const express = require('express');

const server = express();

//quando o user acessar essa rota exibirá o que está entre chaves;

//query params ----------------------------------------

/* server.get('/teste', (req, res) => { 
   const nome = req.query.nome;

    return res.json({ message: `Hello ${nome}`})
}); */

//route params ----------------------------------------
const users = ['Diego', 'Gabriel', 'Robson'];

server.get('/users/:index', (req, res) => {
    const {index} = req.params;

    return res.json(users[index]);
});

//Request Body ----------------------------------------

server.listen(3000);