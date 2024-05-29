import express from 'express';
import cors from 'cors';
import { DatabaseModel } from './model/DatabaseModel';
import AveController from './controller/AveController';
import HabitatController from './controller/HabitatController';
import AtracaoController from './controller/AtracaoController';

const aveController = new AveController('', 0, '', 0);
const habitatController = new HabitatController('');
const atracaoController = new AtracaoController('');

const server = express();
const port = 3000;

server.use(express.json());
server.use(cors());

// Rota padrão para testes (NÃO USAR EM AMBIENTE PRODUÇÃO)
server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Informações: ${username} - ${password}`);
});

/**
 * Listar informações cadastradas no banco de dados
 */
// Listar todos as aves cadastradas
server.get('/aves', aveController.todos);
// Listar todos os habitats cadastradas
server.get('/habitats', habitatController.todos);
// Listar todas as atrações cadastradas
server.get('/atracoes', atracaoController.todos);

/**
 * Cadastrar informações no sistema
 */
// Cadastra informações de uma nova ave
server.post('/novo/ave', aveController.novo);
// Cadastra informações de um novo habitat
server.post('/novo/habitat', habitatController.novo);
// Cadastra informações de uma nova atracao
server.post('/novo/atracao', atracaoController.novo);

/**
 * Remover informações no sistema
 */
// Rota para remover um animal
server.delete('/remover/animal', aveController.remover);
// Rota para remover um habitat
server.delete('/remover/habitat', habitatController.atualizar);
// Rota para remover uma atração
server.delete('/remover/atracao', atracaoController.remover);

/**
 * Atualizar informações no sistema
 */
// Rota para atualizar as informações de um animal
server.put('/atualizar/animal', aveController.atualizar);
// Rota para atualizar as informações de um habitat
server.put('/atualizar/habitat', habitatController.atualizar);
// Rota para atualizar as informações de uma atração
server.put('/atualizar/atracao', atracaoController.atualizar);

new DatabaseModel().testeConexao().then((resbd) => {
    if(resbd) {
        server.listen(port, () => {
            console.info(`Servidor executando no endereço http://localhost:${port}/`);
        })
    } else {
        console.log(`Não foi possível conectar ao banco de dados`);
    }
})