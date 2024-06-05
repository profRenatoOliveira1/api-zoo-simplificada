import express from 'express';
import cors from 'cors';
import { DatabaseModel } from './model/DatabaseModel';
import AveController from './controller/AveController';
import HabitatController from './controller/HabitatController';
import AtracaoController from './controller/AtracaoController';

// Instanciando um novo objeto do controller AveController
// assim podemos acessar os métodos do controller
const aveController = new AveController('', 0, '', 0);

// Instanciando um novo objeto do controller HabitatController
// assim podemos acessar os métodos do controller
const habitatController = new HabitatController('');

// Instanciando um novo objeto do controller AtracaoController
// assim podemos acessar os métodos do controller
const atracaoController = new AtracaoController('');

// Criando um web server usando o express
const server = express();
// Definindo a porta que a aplicação irá rodar
const port = 3000;

// Configurando o serivdor para usar JSON
server.use(express.json());
// Configurando o servidor para usar CORS
server.use(cors());

// Rota padrão para testes (NÃO USAR EM AMBIENTE PRODUÇÃO)
server.get('/', (req, res) => {
    res.send('Hello World!');
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

// Verifica se é possível realizar uma conexão com o banco de dados
new DatabaseModel().testeConexao().then((resbd) => {
    // Verifica se o resultado da função de teste for verdadeiro (TRUE)
    if(resbd) {
        // Caso seja verdadeiro o servidor é iniciado
        server.listen(port, () => {
            console.info(`Servidor executando no endereço http://localhost:${port}/`);
        })
    // Caso seja falso (FALSE) é lançado um log de erro
    } else {
        console.log(`Não foi possível conectar ao banco de dados`);
    }
})