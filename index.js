const express = require('express'); //demontra ao programa que vai usar o express

const server = express(); //inicia o server

server.use(express.json()); //demonstra que o express deve ler json

//Query Params = ?teste=1
//Route Params = /users/1
//Request Body = {"name": "Diego", "email": "email@email.com"}


//array com usuários:
const users = ['Diego', 'Gabriel', 'Robson'];

//middleware global:
server.use((req, res, next) =>{ 
    console.time('Request');
    console.log(`Método ${req.method}; URL: ${req.url}`);

    next();
    console.timeEnd('Request');
});
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

//middleware local:
function checkUserExists(req, res, next){ 
    if(!req.body.name){
        return res.status(400).json({error: 'Username is required!'})
    }
    return next();
};

function checkUserInArray(req, res, next){
    const user = users[req.params.index];

    if(!user){
        return res.status(400).json({error: "Username doesn't exists!"})
    }

    req.user = user;
    return next();
}
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

//methods
//GET: 1- pega todos os usuários, 2- pega um usuário pelo index usado como parâmetro.
server.get('/users', (req, res) => {
    return res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) => {

    return res.json(req.user);
});

//POST: 1- adiciona um usuário novo.
server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body;
    users.push(name);

    return res.json(users)
});

//PUT: 1- altera um usuário existente.
server.put('/users/:index', checkUserInArray,checkUserExists , (req, res) => {
    const {index} = req.params;
    const {name} = req.body;

    users[index] = name;

    return res.json(users);
});

//DELETE: 1- deleta um usuário existente.
server.delete('/users/:index', checkUserInArray, (req, res) => {
    const {index} = req.params;

    users.splice(index, 1);
    
    return res.send();
});
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=




server.listen(3000);