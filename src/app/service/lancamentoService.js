import ApiService from '../apiservice'

import ErroValidacao from './exception/ErroValidacao'

export default class LancamentoService extends ApiService {
    
    // construtor da classe, indicando o caminho da url a ser utilizado
    constructor(){
        super('/api/lancamentos')
    }

    // enumeracao dos meses para cadastro do lancamento
    obterListaMeses(){
        return[
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 }
        ]
    }

    // enumeracao dos possiveis tipos de lancamento
    obterListaTipos(){
        return[
            { label: 'Selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' }
        ]
    }

    // metodo GET para obter um lancamento pelo seu id
    obterPorId(id){
        return this.get(`/${id}`);
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, { status });
    }

    validar(lancamento){
        const erros = [];

        if(!lancamento.ano){
            erros.push("Informe o Ano.");
        }

        if(!lancamento.mes){
            erros.push("Informe o Mês.");
        }

        if(!lancamento.descricao){
            erros.push("Informe a Descrição.");
        }

        if(!lancamento.valor){
            erros.push("Informe o Valor.");
        }

        if(!lancamento.tipo){
            erros.push("Informe o Tipo.");
        }
        

        if (erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }


    // metodo POST para salvar um lancamento
    salvar(lancamento){
        return this.post('/', lancamento);
    }

    // metodo POST para atualizar um lancamento
    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento);
    }

    // metodo GET para filtrar os lancamentos do BD, montando a url e enviando para a API do servidor
    consultar(lancamentoFiltro){
        let params = `?ano=${lancamentoFiltro.ano}`

        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }

        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }

        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`
        }

        if(lancamentoFiltro.usuario){
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }

        if(lancamentoFiltro.descricao){
            params = `${params}&usuario=${lancamentoFiltro.descricao}`
        }

        return this.get(params);
    }

    // metodo DELETE para deletar um lancamento
    deletar(id){
        return this.delete(`/${id}`);        
    }
}