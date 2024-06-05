import { DatabaseModel } from "./DatabaseModel";
import { Habitat } from "./Habitat";

/**
 * Pool de conexão do banco de dados
 */
const database = new DatabaseModel().pool;

/**
 * Representa uma atração em um zoológico.
 */
export class Atracao {

    /**
     * O nome da atração.
     */
    private nomeAtracao: string;

    /**
     * A lista de atracaos presentes na atração.
     */
    private habitatAtracao: Habitat = new Habitat("");

    /**
     * Cria uma nova instância de Atracao.
     * 
     * @param _nome O nome da atração.
     * @param _atracaos A lista de atracaos presentes na atração.
     */
    constructor(_nome: string) {
        this.nomeAtracao = _nome;
    }

    /**
     * Obtém o nome da atração.
     * 
     * @returns O nome da atração.
     */
    public getNomeAtracao(): string {
        return this.nomeAtracao;
    }

    /**
     * Define o nome da atração.
     * 
     * @param _nomeAtracao O nome a ser atribuído à atração.
     */
    public setNomeAtracao(_nomeAtracao: string): void {
        this.nomeAtracao = _nomeAtracao;
    }

    /**
     * Obtém a lista de atracaos presentes na atração.
     * 
     * @returns A lista de atracaos da atração.
     */
    public getatracaos(): Habitat {
        return this.habitatAtracao;
    }

    /**
     * Define a lista de atracaos da atração.
     * 
     * @param _atracaos A lista de atracaos a ser atribuída à atração.
     */
    public setatracao(_habitat: Habitat): void {
        this.habitatAtracao = _habitat;
    }

    /**
     * Retorna uma lista com todos as atrações cadastradas no banco de dados
     * 
     * @returns Lista com todos as atrações cadastradas no banco de dados
     */
    static async listarAtracoes(): Promise<Array<Atracao> | string> {
        // Cria uma lista (array) vazia do tipo atracao
        const listaDeAtracoes: Array<Atracao> = [];

        // Construção da query para selecionar as informações de um atracao
        const querySelectAtracao = `SELECT * FROM atracao;`;

        // Tenta executar a query no banco de dados
        try {
            // Faz a consulta no banco de dados e retorna o resultado para a variável queryReturn
            const queryReturn = await database.query(querySelectAtracao);
            
            // Percorre todas as linhas da queryReturn e acessa cada objeto individualmente
            queryReturn.rows.forEach(atracao => {
                // Coloca o objeto dentro da lista de atrações
                listaDeAtracoes.push(atracao);
            });

            // retorna a lista de atrações para quem chamou a função
            return listaDeAtracoes;
        
        // caso aconteça algum erro no caminho, é lançada uma exceção
        } catch (error) {
            // Exibe o erro nos logs do navegador
            console.log(`Erro no modelo ${error}`);
            // Retorna a mensagem abaixo para quem chamou a função
            return "error, verifique os logs do servidor";
        }
    }

    /**
     * Assinatura de métodos
     */
    /**
     * Cadastra um objeto do tipo Atracao no banco de dados
     * 
     * @param atracao Objeto do tipo Atracao
     * @returns **true** caso sucesso, **false** caso erro
     */
    static async cadastrarAtracao(atracao: Atracao): Promise<boolean>;
    /**
     * Cadastra um objeto do tipo Atracao no banco de dados
     * 
     * @param atracao Objeto do tipo Atracao
     * @param idHabitat Id do habitat ao qual a atracão pertence
     * @returns **true** caso sucesso, **false** caso erro
     */
    static async cadastrarAtracao(atracao: Atracao, idHabitat: Habitat): Promise<boolean>;

    /**
     * Implementação da classe cadastrarAtracao
     */
    static async cadastrarAtracao(atracao: Atracao, idHabitat?: Habitat): Promise<Boolean> {
        // Cria uma variável de controle do tipo booleano para guardar o status do resultado da query
        let insertResult = false;
        // Cria uma variável para armazenar a query que será executada no banco de dados
        let queryInsertAtracao: string;
        
        // Tenta executar a query no banco de dados
        try {
            // Verifica se o idHabitat foi passado como um parâmetro para a função
            if(!idHabitat) {
                // Caso não tenha sido passado
                // Construção da query para inserir as informações de uma Ave. A query irá retornar o ID gerado para o animal pelo banco de dados
                queryInsertAtracao = `INSERT INTO atracao (nomeatracao) 
                                            VALUES 
                                            ('${atracao.getNomeAtracao().toUpperCase()}');`;
            } else {
                // Caso tenha sido passado
                // Construção da query para inserir as informações de uma Ave. A query irá retornar o ID gerado para o animal pelo banco de dados
                queryInsertAtracao = `INSERT INTO atracao (nomeatracao, idhabitat) 
                                            VALUES 
                                            ('${atracao.getNomeAtracao().toUpperCase()}', ${idHabitat});`;
            }

            // Faz a query de insert no banco de dados, passando para o banco as informações do objeto recebibo como parâmetro pela função
            await database.query(queryInsertAtracao)
                // Testa para ter certeza que foi possível inserir os dados no banco
                .then((resultAtracao) => {
                    if (resultAtracao.rowCount != 0) {
                        // Se o número de linhas for diferente de zero, a operação deu certo e o valor VERDADEIRO é atribuido na variável
                        insertResult = true;
                    }
                });
            
            // Retorna VERDADEIRO para quem chamou a função, indicando que a operação foi realizada com sucesso
            return insertResult;
        
        // caso aconteça algum erro no caminho, é lançada uma exceção
        } catch (error) {
            // Imprime o erro no console
            console.log(error, insertResult);

            // Caso a inserção no banco der algum erro, é restorno o valor FALSO para quem chamou a função
            return insertResult;
        }
    }

    /**
     * Remove uma atração do banco de dados
     * 
     * @param idAtracao ID da atração
     * @returns **true** caso sucesso, **false** caso erro
     */
    static async removerAtracao(idAtracao: number): Promise<Boolean> {
        // Variável para controlar o resultado da função 
        let queryResult = true;

        // Tenta executar a query no banco de dados
        try {
            // Query para deletar a atração da tabela atracao
            const queryDeleteAtracao = `DELETE FROM atracao WHERE idatracao=${idAtracao};`;
            
            // Executando a query
            await database.query(queryDeleteAtracao)
            // Testar o resultado da query
            .then(async (result) => {
                // Se o resultado for diferente de zero, a query foi executada com sucesso
                if(result.rowCount !== 0) {
                    // atribui o valor VERDADEIRO a queryResult
                    queryResult = true;
                }
            })

            // Retorna o resultado da função
            return queryResult;
        
        // caso aconteça algum erro no caminho, é lançada uma exceção
        } catch (error) {
            // Exibe o erro no console
            console.log(`Erro: ${error}`);
            // Retorna a variável queryResult com valor FALSE
            return queryResult;
        }
    }

    /**
     * Atualiza as informações da atração
     * 
     * @param atracao Objeto atracao contendo as informações
     * @param idAtracao ID da atração a ser alterada
     * @returns **true** caso a atualização seja feita, **false** caso ocorra algum problema
     */
    static async atualizarAtracao(atracao: Atracao, idAtracao: number): Promise<Boolean> {
        // Variável para controlar o resultado da função
        let queryResult = false;

        // Tenta executar a query no banco de dados
        try {
            // Query para alterar a atração da tabela atração
            const queryUpdateAtracao = `UPDATE atracao SET
                                        nomeatracao='${atracao.getNomeAtracao().toUpperCase()}'
                                        WHERE idatracao=${idAtracao};`;

            // Executa a query
            await database.query(queryUpdateAtracao)
            // Testar o resultado da query
            .then((result) => {
                // Se o resultado for diferente de zero, a query foi executada com sucesso
                if(result.rowCount !== 0) {
                    // atribui o valor VERDADEIRO a queryResult
                    queryResult = true;
                }
            })
            // Retorna o resultado da função
            return queryResult;

        // caso aconteça algum erro no caminho, é lançada uma exceção
        } catch (error) {
            // Exibe o erro nos logs do servidor
            console.log(`Erro: ${error}`);
            // Retorna a variável queryResult com valor FALSE
            return queryResult;
        }
    }
}
