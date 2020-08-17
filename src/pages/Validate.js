import React, { Component } from 'react';
import Axios from 'axios';

//Componente de confirmação do email, apenas manda uma mensagem pro backend
//e altera o status do usuário
class Validate extends Component {

    componentDidMount() {

        const elem = {
            id: this.props.match.params.id
        }
        
        Axios.post(`http://localhost:4000/validate/${this.props.match.params.id}`, elem)
            .then(() => {
                window.localStorage.setItem('isEmail', 'true')
                window.location = '/'
            })
            .catch(err => console.log("Erro: ", err.response))
        
    }

    render() {
        return (
            <div>
                <h1>Conta validada</h1>
                <p>Redirecionando pro dashboar...</p>
            </div>
        );
    }
}

export default Validate;