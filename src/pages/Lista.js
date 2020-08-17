import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios';
import Row from '../components/Row';


//Este componente lista todas as CRUDs e se modifica
//dependendo do usuário e do contexto.

class Lista extends Component {
    
    state = {
        list: [],
    };

    //Deleta elemento da DB
    delList = (id) => {
        //o this.props.match.params.tipo é um parametro da URL que define
        //qual table está sendo utilizada, o front-end e o back-end compartilham
        //da mesmas routes pra facilitar o fluxo de mensagens
        Axios.delete(`http://localhost:4000/${this.props.match.params.tipo}/delete/${id}`)
            .then(res => {
                console.log(res.data)
                this.setState({list: this.state.list.filter(i => i._id !== id)});
            })
            .catch(err => console.log("Erro: ", err.response))
    }

    //Gera string dependendo da table que está aberta
    titleSingle = (tipo) => {
        let result;
        switch (tipo) {

            case 'workstations':
                result = 'Workstation'
            break;
  
            case 'reunioes':
                result = 'Sala de Reunião'
            break;
  
            case 'usuarios':
                result = 'Usuário'
            break;
  
            default:
                result = 'ERROR'
            break;
  
        }
  
        return result
    }

    //Mesma coisa, porém no plural
    titlePlural = (tipo) => {
        let result;
        switch (tipo) {

            case 'workstations':
                result = 'Workstations'
            break;
  
            case 'reunioes':
              result = 'Salas de Reunião'
            break;
  
            case 'usuarios':
              result = 'Usuários'
            break;
  
            default:
              result = 'ERROR'
            break;
  
        }
  
        return result
    }

    //Renderiza os elementos da table
    generateRows = () => {
        return this.state.list
            .map(
                element => {
                    return <Row element={element} delList={this.delList} id={element._id} tipo={this.props.match.params.tipo} key={element._id}/>;
                })
    }

    //Checa se o usuário pode ou não adicionar elementos
    canAdd = () => {
        if (window.localStorage.getItem('isAdmin') === 'true') {
            return (<Link className="btn btn-primary" to={`/lista/${this.props.match.params.tipo}/add`}>Adicionar {this.titleSingle(this.props.match.params.tipo)}</Link>)
        }
    }

    //Força renderização da outra table caso o parametro tipo mude
    //(Mudar de route no mesmo componente não renderiza)
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.tipo !== this.props.match.params.tipo) {
            Axios.get(`http://localhost:4000/${this.props.match.params.tipo}/`)
                .then(res => {
                    this.setState({list: res.data});
                })
                .catch(err => console.log("Erro: ", err.response))
        }

    }
    
    
    componentDidMount() {

        //Redireciona o Usuário pra tela de Login caso ele não esteja autenticado
        if (!(window.localStorage.getItem('user'))) {
            window.location = "/login"
        }

        //Carrega Table da DB    
        Axios.get(`http://localhost:4000/${this.props.match.params.tipo}/`)
            .then(res => {
                this.setState({list: res.data});
            })
            .catch(err => console.log("Erro: ", err.response))
        
        
    }

    render() {
        return (
            <div>
                <h3>{this.titlePlural(this.props.match.params.tipo)}</h3>
                {this.canAdd()}
                <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Nome</th>
                        {/*Muda thead dependendo do paramêtro tipo*/}
                        <th>{this.props.match.params.tipo === 'usuarios' ? 'E-mail' : 'Descrição'}</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    { this.generateRows() }
                </tbody>
                </table>
            </div>
        );
    }
}

export default Lista;