import { Habitat } from "../model/Habitat";
import { Request, Response } from 'express';

/**
 * Controller para manipular o modelo Habitat
 */
class HabitatController extends Habitat {

    /**
     * Acessa o método do Model que lista todas os Habitats
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Reposta do resultado da operação
     */
    public async todos(req: Request, res: Response): Promise<Response> {
        // tenta recuperar a lista de objetos
        try {
            // cria objeto habitats e atribui a ele o retorno do método listarHabitats
            const habitats = await Habitat.listarHabitats();

            // retorna a lista de habitats em formato json
            return res.status(200).json(habitats);

            // caso aconteça algum erro, é lançada uma exceção
        } catch (error) {
            // caso aconteça algum erro, este é lançado nos logs do servidor
            console.log(`Erro ao acessar o modelo: ${error}`);
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json(`Erro ao acessar as informações, acesse os logs no servidor`);
        }
    }

    /**
     * Acessa o método do Model para cadastrar um novo habitat
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Resposta do resultado da operação
     */
    public async novo(req: Request, res: Response): Promise<Response> {
        // tenta inserir um novo objeto no banco de dados
        try {
            // Desestruturando objeto recebido pelo cliente
            const { nomeHabitat } = req.body;

            // Instanciando objeto do tipo Habitat
            const novoHabitat = new Habitat(nomeHabitat);

            // Chama o método para persistir o habitat no banco de dados
            // o resultado é um booleano, que será armazenado na variável de controle result
            const result = await Habitat.cadastrarHabitat(novoHabitat);

            // Verifica se a query foi executada com sucesso
            if (result) {
                // Caso positivo, ele retorna uma mensagem de sucesso com status 200
                return res.status(200).json('Habitat cadastrado com sucesso');
            } else {
                // Caso positivo, ele retorna uma mensagem de erro com status 400
                return res.status(400).json('Não foi possível cadastrar o habitat no banco de dados');
            }

            // caso aconteça algum erro, é lançada uma exceção
        } catch (error) {
            // caso aconteça algum erro, este é lançado nos logs do servidor
            console.log(`Erro ao cadastrar a ave: ${error}`);
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json('Erro ao cadastrar habitat, consulte os logs no servidor');
        }
    }

    /**
     * Acessa o método do Model para remover um habitat
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Resposta do resultado da operação
     */
    public async remover(req: Request, res: Response): Promise<Response> {
        // tenta remover um objeto no banco de dados
        try {
            // recuperando o id do habitat a ser removido, recebido pelo cliente
            const idHabitat = parseInt(req.query.idHabitat as string);

            // chama a função para remover o animal
            // o resulado da função é um booleano que será armazenado na variável de controle resultado
            const resultado = await Habitat.removerHabitat(idHabitat);

            // Verifica o estado na variável resultado
            if (resultado) {
                // se o resultado for **true**, retorna mensagem de sucesso
                return res.status(200).json('Habitat foi removida com sucesso');
            } else {
                // se o resultado for **false**, retorna mensagem de erro
                return res.status(401).json('Erro ao remover habitat');
            }

            // caso aconteça algum erro, é lançada uma exceção
        } catch (error) {
            // se o resultado for **true**, retorna mensagem de sucesso
            console.log(`Erro ao acessar o modelo: ${error}`);
            // se o resultado for **false**, retorna mensagem de erro
            return res.status(400).json("Erro ao remover habitat, consulte os logs no servidor");
        }
    }

    /**
     * Acessa o método do Model para atualizar um habitat
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Resposta do resultado da operação
     */
    public async atualizar(req: Request, res: Response): Promise<Response> {
        // tenta atualizar um objeto no banco de dados
        try {
            // Desestruturando objeto recebido pelo cliente
            const { nomeHabitat } = req.body;
            
            // recuperando o id do animal a ser atualizado, recebido do cliente
            const idHabitat = parseInt(req.query.idHabitat as string);

            // Instanciando objeto do tipo Habitat
            const novoHabitat = new Habitat(nomeHabitat);

            // Chama o método para persistir a ave no banco de dados
            // O resultado é um booleano, que será armazenado na variável resultado
            const resultado = await Habitat.atualizarHabitat(novoHabitat, idHabitat);

            // Verifica o estado na variável resultado
            if (resultado) {
                // se o resultado for **true**, retorna mensagem de sucesso
                return res.status(200).json('Habitat foi atualizado com sucesso');
            } else {
                // se o resultado for **false**, retorna mensagem de erro
                return res.status(401).json('Erro ao atualizar habitat, consulte os logs no servidor');
            }
        
        // caso aconteça algum erro, é lançada uma exceção
        } catch (error) {
            // caso aconteça algum erro, este é lançado nos logs do servidor
            console.log(`Erro ao acessar modelo: ${error}`);
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json("Erro ao atualizar habitat, consulte os logs no servidor");
        }
    }
}

export default HabitatController;