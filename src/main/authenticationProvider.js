import React from 'react';

import AuthService from '../app/service/authService';
import jwt from 'jsonwebtoken';

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class AuthenticationProvider extends React.Component{

    state = {
        authUser: null,
        isAuth: false,
        isLoading: true
    }

    sessionStart = (tokenDto) => {
        const token = tokenDto.token;
        const claims = jwt.decode(token);
        const usuario = {
            id: claims.userid,
            nome: claims.nome
        }        
        AuthService.login(usuario, token);
        this.setState( { isAuth: true, authUser: usuario } );
    }

    sessionEnd = () => {
        AuthService.removeUserAuth();
        this.setState( { isAuth: false, authUser: null} );
    }

    async componentDidMount(){
        const isAuth = AuthService.isUserAuth()
        if(isAuth){
            const usuario = await AuthService.refreshSession();
            this.setState({
                isAuth: true,
                authUser: usuario,
                isLoading: false
            })
        }else{
            this.setState( previousState => {
                return{
                    ...previousState,
                    isLoading: false
                }                
            })
        }
    }

    render(){

        if(this.state.isLoading){
            return null;
        }

        const context = {
            authUser: this.state.authUser,
            isAuth: this.state.isAuth,
            sessionStart: this.sessionStart,
            sessionEnd: this.sessionEnd
        }

        return(
            <AuthProvider value={context} >
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default AuthenticationProvider;