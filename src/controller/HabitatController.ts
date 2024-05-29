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
        try {
            // cria objeto habitats e atribui a ele o retorno do método listarHabitats
            const habitats = await Habitat.listarHabitats();
            // retorna a lista de habitats em formato json
            return res.status(200).json(habitats);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
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
        try {
            // Desestruturando objeto recebido pelo front-end
            const { nomeHabitat } = req.body;
            // Instanciando objeto Habitat
            const novoHabitat = new Habitat(nomeHabitat);
            // Chama o método para persistir o habitat no banco de dados
            const result = await Habitat.cadastrarHabitat(novoHabitat);
            // Verifica se a query foi executada com sucesso
            if (result) {
                return res.status(200).json('Habitat cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar o habitat no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar a ave: ${error}`);
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
        try {
            // recuperando o id do habitat a ser removido
            const idHabitat = parseInt(req.query.idHabitat as string);

            // chama a função para remover o animal e armazena o resultado na variável
            const resultado = await Habitat.removerHabitat(idHabitat);

            if (resultado) {
                // se o resultado for **true**, retorna mensagem de sucesso
                return res.status(200).json('Habitat foi removida com sucesso');
            } else {
                // se o resultado for **false**, retorna mensagem de erro
                return res.status(401).json('Erro ao remover habitat');
            }
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
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
        // Desestruturando objeto recebido pelo front-end
        const { nomeHabitat } = req.body;
        // recuperando o id do animal a ser atualizado
        const idHabitat = parseInt(req.query.idHabitat as string);

        // Instanciando objeto Habitat
        const novoHabitat = new Habitat(nomeHabitat);

        // Chama o método para persistir a ave no banco de dados e armazena o resultado na variável
        const resultado = await Habitat.atualizarHabitat(novoHabitat, idHabitat);

        if (resultado) {
            // se o resultado for **true**, retorna mensagem de sucesso
            return res.status(200).json('Habitat foi atualizado com sucesso');
        } else {
            // se o resultado for **false**, retorna mensagem de erro
            return res.status(401).json('Erro ao atualizar habitat, consulte os logs no servidor');
        }
    }
}

export default HabitatController;