import ApiService from '../apiservice';

import ErroValidacao from '../service/exception/ErroValidacao';

class UsuarioService extends ApiService{

    // construtor da classe, indicando o caminho da url a ser utilizado
    constructor(){
        super('/api/usuarios');
    }

    // metodo POST para autenticar um usuario com suas credenciais
    autenticar(credenciais){
        return this.post('/autenticar', credenciais);
    }

    // metodo GET para obter saldo de determinado usuario
    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`);
    }

    // metodo POST para cadastrar um novo usuario
    salvar(usuario){
        return this.post('', usuario);
    }

    validar(usuario){
        const erros = []

        if(!usuario.nome){
            erros.push('O campo Nome é obrigatório!');
        }

        if(!usuario.email){
            erros.push('O campo e-mail é obrigatório!')
        } else 
        //eslint-disable-next-line
        if(!usuario.email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)){
            //REGEX para validacao do email
            erros.push('Informe um e-mail válido!');
        }

        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Repita a senha digitada!');
        } else if(usuario.senha !== usuario.senhaRepeticao){
            erros.push('As senhas digitadas não são iguais!');
        }

        if( erros && erros.length > 0 ){
            throw new ErroValidacao(erros);
        }
        
    }

}

export default UsuarioService