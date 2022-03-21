import React from 'react'
// os componentes React devem constar esta importacao
// tal importacao nao eh mais necessaria no App.js

import Routes from './routes'
import Navbar from '../components/navbar'
import AuthenticationProvider from './authenticationProvider'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

class App extends React.Component {
  render (){
    return(
    //todos os nodes react devem estar dentro de uma unica DIV, podendo haver uma subdivisao internas dos nodes
    <AuthenticationProvider>
      <Navbar />     
      <div className="container">
        {/* funcao Routes, responsavel por apresentar as paginas da SPA react (single page application) */}
        <Routes />
      </div>
    </AuthenticationProvider>
    )
  }
}
// codigo em JSX

// exportação para futura importacao em outros arquivos
export default App
