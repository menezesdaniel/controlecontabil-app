import LocalStorageService from './localstorageService';

import jwt from 'jsonwebtoken';
import ApiService from '../apiservice';

export const USUARIO_LOGADO = '_usuario_logado';
export const TOKEN = 'access_token';

export default class AuthService{

    static isUserAuth(){
        const token = LocalStorageService.obterItem(TOKEN);

        if(!token){
            return false;
        }
        
        const decodedToken = jwt.decode(token);
        const expiration = decodedToken.exp;
        const isTokenInvalid = Date.now() >= (expiration * 1000);

        return !isTokenInvalid;
    }

    static removeUserAuth(){
        LocalStorageService.excluirItem( USUARIO_LOGADO );
        LocalStorageService.excluirItem( TOKEN );
    }

    static login(usuario, token){
        LocalStorageService.adicionarItem( USUARIO_LOGADO, usuario );
        LocalStorageService.adicionarItem( TOKEN, token );
        ApiService.registrateToken( token );

        //armazena o id do usuario logado para posteriores requisicoes a API do servidor
    }

    static getAuthUser(){
        return LocalStorageService.obterItem(USUARIO_LOGADO);
    }

    static refreshSession(){
        const token = LocalStorageService.obterItem(TOKEN);
        const usuario = AuthService.getAuthUser();
        AuthService.login(usuario, token);
        return usuario;
    }
}