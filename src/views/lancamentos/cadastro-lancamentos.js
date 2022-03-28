import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'

class CadastroLancamentos extends React.Component {

    //variaveis a serem armazenadas
    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    // construtor da classe
    constructor(){
        super();
        this.service = new LancamentoService();
    }

    // eh executado depois de finalizada a renderizacao da pagina (render)
    componentDidMount(){
        const params = this.props.match.params
        if(params.id){
            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState( {...response.data, atualizando: true} )
                    // o spread operator (...) copia as propriedades enumeráveis de um objeto e aloca em um novo objeto
                }).catch(error => {
                    messages.mensagemErro(error.response.data)
                });
        }
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
                
        const { descricao, valor, mes, ano, tipo } = this.state;
        // operador destructuring para passar o valor das props do state
        
        const lancamento = {
            // colocando conforme abaixo equivale a 'descricao: descricao'
            descricao,
            valor,
            mes,
            ano,
            tipo,
            usuario: usuarioLogado.id
        };

        try{
            this.service.validar(lancamento)
        }catch(error){
            const mensagens = error.mensagens;

            mensagens.forEach( msg => messages.mensagemErro(msg) );
            return false;
        }

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!');
            }).catch( error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {

        // operador destructuring para passar o valor das props do state
        const { descricao, valor, mes, ano, tipo, status, usuario, id } = this.state;        
        
        const lancamento = {
            // colocando conforme abaixo equivale a 'descricao: descricao'
            descricao,
            valor,
            mes,
            ano,
            tipo,            
            usuario,
            status,
            id            
        };

        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento atualizado com sucesso!');
            }).catch( error => {
                messages.mensagemErro(error.response.data)
            })
    }

    // manipula o evento dos campos Text e SelectMenu, armazenando a entrada nas variaveis
    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value })
    }

    // renderizador do componente
    render(){

        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();

        return(
            <Card title={this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
                {/* ser atualizando for true, ele entrarah com o layout de atualizacao, caso contrario, de cadastro*/}
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" type="text"
                            className="form-control" 
                            name="descricao"
                            value={this.state.descricao}
                            onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>                

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text" className="form-control"
                            name="ano"
                            value={this.state.ano}
                            onChange={this.handleChange} />                           
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" lista={meses} className="form-control"
                            name="mes"
                            value={this.state.mes}
                            onChange={this.handleChange} />
                        </FormGroup>                        
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" type="text" className="form-control"
                            name="valor"
                            value={this.state.valor}
                            onChange={this.handleChange} />                            
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" lista={tipos} className="form-control" 
                            name="tipo"
                            value={this.state.tipo}
                            onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            <input id="inputStatus" type="text" disabled={true} className="form-control" 
                            name="status"
                            value={this.state.status} />
                        </FormGroup>
                    </div>                    
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.state.atualizando ?
                        (<button type="button"
                            onClick={this.atualizar}
                            className="btn btn-success">
                            <i className="pi pi-refresh"></i> Atualizar
                        </button>) :
                        (<button type="button"
                            onClick={this.submit}
                            className="btn btn-success">
                            <i className="pi pi-save"></i> Salvar
                        </button>)
                        }
                        {/* renderizacao condicional dos botoes para caso estiver atualizar ou cadastrando o lancamento*/}
                        <button type="button"
                            onClick={ e => this.props.history.push('/consulta-lancamentos')}
                            className="btn btn-danger">
                            <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>
                </div>                    
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos);