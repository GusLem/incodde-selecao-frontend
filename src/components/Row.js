import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Row extends Component {

    //Renderiza apenas o Nome, Descrição ou Email (no caso específico de usuário) do elemento
    //(Para encaixar com os theads)
    generateValue = () => {
       return Object.keys(this.props.element)
        .filter(i => i === "nome" || i === "desc" || i === "email")
        .map(i => {
            return (<td>{this.props.element[i]}</td>)
        })

        
    }

    delListo = () => {
        if (this.props.element._id !== '5f3ae1921f3479b5002d6df2') {
            return (<> <Link to={`/lista/${this.props.tipo}/edit/${this.props.id}`}>Editar</Link> | <Link to='#' onClick={() => { this.props.delList(this.props.id) }}>Deletar</Link></>)
        }
    }

    actions = () => {
        //Caso o usuário seja Administrador ele tem privilégio completo no controle da CRUD
        if (window.localStorage.getItem('isAdmin') === 'true') {
            return(
                <td>
                   {this.delListo()}
                </td>  
            );
        }
        //Do contrário, ele só pode visualizar os detalhes do elemento
        else {
            return (
                <td>
                    <Link to={`/lista/${this.props.tipo}/edit/${this.props.id}`}>Ver Detalhes</Link>
                </td>
            );
        }
    }


    render() {
        return (
            <tr>  
                {this.generateValue()}
                {this.actions()}
            </tr>
        );
    }
}

export default Row;