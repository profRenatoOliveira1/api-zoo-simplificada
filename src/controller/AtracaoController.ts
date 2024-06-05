import { Atracao } from "../model/Atracao";
import { Request, Response } from "express";

/**
 * Controller para manipular o modelo Atracao
 */
class AtracaoController extends Atracao {

    /**
     * Acessa o método do Model que lista todas as atrações
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Reposta do resultado da operação
     */
    public async todos(req: Request, res: Response): Promise<Response> {
        // tenta recuperar a lista de objetos
        try {
            // cria objeto atracoes e atribui a ele o retorno do método listarAtracoes
            const atracoes = await Atracao.listarAtracoes();

            // retorna a lista de atracoes em formato JSON
            return res.status(200).json(atracoes);

        // caso aconteça algum erro, é lançada uma exceção
        } catch (error) {
            // caso aconteça algum erro, este é lançado nos logs do servidor
            console.log(`Erro ao acessar o modelo: ${error}`);
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json(`Erro ao acessar as informações, consulte os logs no servidor`);
        }
    }

    /**
     * Acessa o método do Model para cadastrar uma nova atração
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Resposta do resultado da operação
     */
    public async novo(req: Request, res: Response): Promise<Response> {
        // tenta inserir um novo objeto no banco de dados
        try {
            // Desestruturando objeto recebido pelo cliente
            const { nomeAtracao, idHabitat } = req.body;

            // Instanciando objeto Atracao
            const novaAtracao = new Atracao(nomeAtracao);

            // variável de controle, ao ser criada ela recebe o valor FALSE
            let result = false;

            // verifica se o idHabitat não veio vazio do cliente
            if (idHabitat != undefined) {
                // Chama o método para persistir a atracao no banco de dados associando ao id
                // o resultado é um booleano, que será armazenado na variável de controle result
                result = await Atracao.cadastrarAtracao(novaAtracao, idHabitat);
            } else {
                // Chama o método para persistir a atracao no banco de dados
                // o resultado é um booleano, que será armazenado na variável de controle result
                result = await Atracao.cadastrarAtracao(novaAtracao);
            }

            // verifica se o resultado da query foi executada com sucesso
            if (result) {
                // Caso positivo, ele retorna uma mensagem de sucesso com status 200
                return res.status(200).json('Atração cadastrado com sucesso');
            } else {
                // Caso positivo, ele retorna uma mensagem de erro com status 400
                return res.status(400).json('Não foi possível cadastrar a atração no banco de dados');
            }

        // caso aconteça algum erro, é lançada uma exceção
        } catch (error) {
            // caso aconteça algum erro, este é lançado nos logs do servidor
            console.log(`Erro ao cadastrar a ave: ${error}`);
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json('Não foi possível cadastrar a atração no banco de dados');
        }
    }

    /**
     * Acessa o método do Model para remover uma atração
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Resposta do resultado da operação
     */
    public async remover(req: Request, res: Response): Promise<Response> {
        // tenta remover um objeto no banco de dados
        try {
            // recuperando o id da atração a ser removida recebida do cliente
            const idAtracao = parseInt(req.query.idAtracao as string);

            // chama a função para remover a atração
            // o resulado da função é um booleano que será armazenado na variável de controle resultado
            const resultado = await Atracao.removerAtracao(idAtracao);

            // Verifica o estado na variável resultado
            if (resultado) {
                // se o resultado for **true**, retorna mensagem de sucesso
                return res.status(200).json('Atração foi removida com sucesso');
            } else {
                // se o resultado for **false**, retorna mensagem de erro
                return res.status(401).json('Erro ao remover atração');
            }

        // caso aconteça algum erro, é lançada uma exceção
        } catch (error) {
            // caso aconteça algum erro, este é lançado nos logs do servidor
            console.log(`Erro ao acessar o modelo: ${error}`);
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json("Erro ao remover atração, consulte os logs no servidor");
        }
    }

    /**
     * Acessa o método do Model para atualizar uma atração
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Resposta do resultado da operação
     */
    public async atualizar(req: Request, res: Response): Promise<Response> {
        // tenta atualizar um objeto no banco de dados
        try {
            // Desestruturando objeto recebido pelo cliente
            const { nomeAtracao } = req.body;
            
            // recuperando o id da atração a ser atualizada, recebido do cliente
            const idAtracao = parseInt(req.query.idAtracao as string);

            // Instanciando objeto do tipo Atracao
            const novaAtracao = new Atracao(nomeAtracao);

            // Chama o método para persistir a ave no banco de dados
            // O resultado é um booleano, que será armazenado na variável resultado
            const resultado = await Atracao.atualizarAtracao(novaAtracao, idAtracao);

            // Verifica o estado na variável resultado
            if (resultado) {
                // se o resultado for **true**, retorna mensagem de sucesso
                return res.status(200).json('Atração foi alterada com sucesso');
            } else {
                // se o resultado for **false**, retorna mensagem de erro
                return res.status(401).json('Erro ao alterar atração');
            }
        
        // caso aconteça algum erro, é lançada uma exceção
        } catch (error) {
            // caso aconteça algum erro, este é lançado nos logs do servidor
            console.log(`Erro ao acessar modelo: ${error}`);
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json("Erro ao atualizar atração, consulte os logs no servidor");
        }
    }
}

export default AtracaoController;