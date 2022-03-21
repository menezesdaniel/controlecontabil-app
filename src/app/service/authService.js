import LocalStorageService from './localstorageService';

export const USUARIO_LOGADO = '_usuario_logado';

export default class AuthService{

    static isUserAuth(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO);
        return usuario && usuario.id;
    }

    static removeUserAuth(){
        LocalStorageService.excluirItem(USUARIO_LOGADO);
    }

    static login(usuario){
        LocalStorageService.adicionarItem( USUARIO_LOGADO, usuario );
        //armazena o id do usuario logado para posteriores requisicoes a API do servidor
    }

    static getAuthUser(){
        return LocalStorageService.obterItem(USUARIO_LOGADO);
    }
}