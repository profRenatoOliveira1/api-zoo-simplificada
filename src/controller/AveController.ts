import { Ave } from "../model/Ave";
import { Request, Response } from "express";

/**
 * Controller para manipular o modelo Ave
 */
class AveController extends Ave {

    /**
     * Acessa o método do Model que lista todas as aves
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Reposta do resultado da operação
     */
    public async todos(req: Request, res: Response): Promise<Response> {
        // tenta recuperar a lista de objetos
        try {
            // cria objeto aves e atribui a ele o retorno do método listarAtracoes
            const aves = await Ave.listarAves();
            
            // retorna a lista de aves em formato JSON
            return res.status(200).json(aves);

        // caso aconteça algum erro, é lançada uma exceção
        } catch (error) {
            // caso aconteça algum erro, este é lançado nos logs do servidor
            console.log(`Erro ao acessar o modelo: ${error}`);
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json(`Erro ao acessar as informações, consulte os logs no servidor`);
        }
    }

    /**
     * Acessa o método do Model para cadastrar uma nova ave
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Resposta do resultado da operação
     */
    public async novo(req: Request, res: Response): Promise<Response> {
        // tenta inserir um novo objeto no banco de dados
        try {
            // Desestruturando objeto recebido pelo cliente
            const { nome, idade, genero, envergadura, idHabitat } = req.body;
            
            // Instanciando objeto Ave
            const novaAve = new Ave(nome, idade, genero, envergadura);
           
            // Chama o método para persistir a ave no banco de dados
            // O resultado é um booleano que será armazenado na variável result
            const result = await Ave.cadastrarAve(novaAve, idHabitat);
            
            // Verifica o estado da variável result
            if (result) {
                // Caso positivo, ele retorna uma mensagem de sucesso com status 200
                return res.status(200).json('Ave cadastrado com sucesso');
            } else {
                // Caso positivo, ele retorna uma mensagem de erro com status 400
                return res.status(400).json('Não foi possível cadastrar o ave no banco de dados');
            }
        
        // caso aconteça algum erro, é lançada uma exceção
        } catch (error) {
            // caso aconteça algum erro, este é lançado nos logs do servidor
            console.log(`Erro ao cadastrar a ave: ${error}`);
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json('Erro ao cadastrar ave, consulte os logs no servidor');
        }
    }

    /**
     * Acessa o método do Model para remover uma ave
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Resposta do resultado da operação
     */
    public async remover(req: Request, res: Response): Promise<Response> {
        // tenta remover um objeto no banco de dados
        try {
            // recuperando o id do animal a ser removido, recebido do cliente
            const idAnimal = parseInt(req.query.idAnimal as string);

            // chama a função para remover o animal
            // o resulado da função é um booleano que será armazenado na variável de controle resultado
            const resultado = await Ave.removerAve(idAnimal);

            // Verifica o estado na variável resultado
            if (resultado) {
                // se o resultado for **true**, retorna mensagem de sucesso
                return res.status(200).json('Animal foi removido com sucesso');
            } else {
                // se o resultado for **false**, retorna mensagem de erro
                return res.status(401).json('Erro ao remover animal');
            }

        // caso aconteça algum erro, é lançada uma exceção
        } catch (error) {
            // caso aconteça algum erro, este é lançado nos logs do servidor
            console.log(`Erro ao acessar o modelo: ${error}`);
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json("Erro ao remover ave, consulte os logs no servidor");
        }
    }

    /**
     * Acessa o método do Model para atualizar uma ave
     * 
     * @param req Requisição
     * @param res Resposta
     * @returns Resposta do resultado da operação
     */
    public async atualizar(req: Request, res: Response): Promise<Response> {
        // tenta atualizar um objeto no banco de dados
        try {
            // Desestruturando objeto recebido pelo cliente
            const { nome, idade, genero, envergadura } = req.body;
            
            // recuperando o id do animal a ser atualizado, recebido do cliente
            const idAnimal = parseInt(req.query.idAnimal as string);
            
            // Instanciando objeto do tipo Ave
            const novaAve = new Ave(nome, idade, genero, envergadura);
            
            // Chama o método para persistir a ave no banco de dados
            // O resultado é um booleano, que será armazenado na variável resultado
            const result = await Ave.atualizarAve(novaAve, idAnimal);
            
            // Verifica o estado na variável resultado
            if (result) {
                // se o resultado for **true**, retorna mensagem de sucesso
                return res.status(200).json('Ave atualizada com sucesso');
            } else {
                // se o resultado for **false**, retorna mensagem de erro
                return res.status(400).json('Não foi possível atualizar a ave no banco de dados');
            }

        // caso aconteça algum erro, é lançada uma exceção
        } catch (error) {
            // caso aconteça algum erro, este é lançado nos logs do servidor
            console.log(`Erro ao acessar modelo: ${error}`);
            // retorna um status 400 com uma mensagem de erro
            return res.status(400).json("Erro ao atualizar ave, consulte os logs no servidor");
        }
    }
}

export default AveController;