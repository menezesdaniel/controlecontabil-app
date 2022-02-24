import React from "react";
// os componentes React devem constar esta importacao
// tal importacao nao eh mais necessaria no App.js

import Login from "./views/login";

import 'bootswatch/dist/flatly/bootstrap.css';
import './custom.css'

class App extends React.Component {
  render (){
    return(
    //todos os nodes react devem estar dentro de uma unica DIV, podendo haver uma subdivisao internas dos nodes
    <div>
      <Login />
    </div>
    )
  }
}
// codigo em JSX

// exportação para futura importacao em outros arquivos
export default App;
