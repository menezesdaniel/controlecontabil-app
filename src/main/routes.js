import React from 'react'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'
import LandingPage from '../views/landingPage'
import { AuthConsumer } from './authenticationProvider'

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'

function AuthRoute( { component: Component, isUserAuth, ...props } ){
    return(
        <Route exact {...props} render={ (componentProps) => {
            if( isUserAuth ){
                return(
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={ {pathname : '/login', state : { from: componentProps.location} } } />
                )
            }
        }} />
    )
}

function Routes(props){    
    return(
        <BrowserRouter>
            <Switch>
                {/* paginas e os caminhos da SPA react que serao apresentadas por App.js */}                
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cadastro-usuarios" component={CadastroUsuario} />

                <AuthRoute isUserAuth={props.isUserAuth} path="/home" component={Home} />
                <AuthRoute isUserAuth={props.isUserAuth} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <AuthRoute isUserAuth={props.isUserAuth} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
                {/* o parametro id eh opcional (?), pode ser passado ou nao*/}                
            </Switch>        
        </BrowserRouter>
    )    
}

export default () => (
    <AuthConsumer>
        { (context) => (
            <Routes isUserAuth={context.isAuth} />
        )}
    </AuthConsumer>    
);