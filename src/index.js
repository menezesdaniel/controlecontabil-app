//arquivo de entrada da aplicação react, o qual a iniciarah

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
//ReactDOM eh o renderizador da aplicacao no modo web
// recebe o App que ele vai renderizar e o local (em "root, dentro de index.html)

reportWebVitals();
