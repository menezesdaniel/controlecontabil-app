import React from 'react';

import AuthService from '../app/service/authService';

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class AuthenticationProvider extends React.Component{

    state = {
        authUser: null,
        isAuth: false
    }

    sessionStart = (usuario) => {
        AuthService.login(usuario);
        this.setState( { isAuth: true, authUser: usuario} );
    }

    sessionEnd = () => {
        AuthService.removeUserAuth();
        this.setState( { isAuth: false, authUser: null} );
    }

    render(){
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