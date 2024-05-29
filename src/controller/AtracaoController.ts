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
        try {
            // cria objeto atracoes e atribui a ele o retorno do método listarAtracoes
            const atracoes = await Atracao.listarAtracoes();

            // retorna a lista de atracoes em formato json
            return res.status(200).json(atracoes);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
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
        try {
            // Desestruturando objeto recebido pelo front-end
            const { nomeAtracao, idHabitat } = req.body;

            // Instanciando objeto Ave
            const novaAtracao = new Atracao(nomeAtracao);

            let result = false;

            // verifica se o idHabitat não veio vazio do front-end
            if (idHabitat != undefined) {
                // Chama o método para persistir a atracao no banco de dados associando ao id
                result = await Atracao.cadastrarAtracao(novaAtracao, idHabitat);
            } else {
                // Chama o método para persistir a atracao no banco de dados
                result = await Atracao.cadastrarAtracao(novaAtracao);
            }

            // verifica se a query foi executada com sucesso
            if (result) {
                return res.status(200).json('Atração cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar a atração no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar a ave: ${error}`);
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
        try {
            // recuperando o id da atração a ser removida
            const idAtracao = parseInt(req.query.idAtracao as string);

            // chama a função para remover a atração e armazena o resultado na variável
            const resultado = await Atracao.removerAtracao(idAtracao);

            if (resultado) {
                // se o resultado for **true**, retorna mensagem de sucesso
                return res.status(200).json('Atração foi removida com sucesso');
            } else {
                // se o resultado for **false**, retorna mensagem de erro
                return res.status(401).json('Erro ao remover atração');
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
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
        try {
            // Desestruturando objeto recebido pelo front-end
            const { nomeAtracao } = req.body;
            // recuperando o id da atração a ser atualizada
            const idAtracao = parseInt(req.query.idAtracao as string);

            // Instanciando objeto Atração
            const novaAtracao = new Atracao(nomeAtracao);

            // Chama o método para persistir a ave no banco de dados e armazena o resultado na variável
            const resultado = await Atracao.atualizarAtracao(novaAtracao, idAtracao);

            if (resultado) {
                // se o resultado for **true**, retorna mensagem de sucesso
                return res.status(200).json('Atração foi alterada com sucesso');
            } else {
                // se o resultado for **false**, retorna mensagem de erro
                return res.status(401).json('Erro ao alterar atração');
            }
        } catch (error) {
            console.log(`Erro ao acessar modelo: ${error}`);
            return res.status(400).json("Erro ao atualizar atração, consulte os logs no servidor");
        }
    }
}

export default AtracaoController;