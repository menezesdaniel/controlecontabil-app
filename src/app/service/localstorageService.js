export default class LocalStorageService{

    // armazena o id do usuario logado para posteriores requisicoes a API do servidor
    static adicionarItem(chave, valor){
        localStorage.setItem(chave, JSON.stringify(valor) );
    } 
    
    // recupera o id do usuario logado
    static obterItem(chave){
        const item = localStorage.getItem(chave);
        return JSON.parse(item);
    }

    // exclui o usuario logado (desloga)
    static excluirItem(chave){
        localStorage.removeItem(chave);
    }

}