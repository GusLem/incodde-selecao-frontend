import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios';

class Dashboard extends Component {

    state = {
        user: window.localStorage.getItem('user'),
        emailLink: ''
    }

    componentDidMount() {
        //Redireciona o Usuário pra tela de Login caso ele não esteja autenticado
        if (!(window.localStorage.getItem('user'))) {
            window.location = "/login"
        }

        //Caso o email ainda não esteja confirmado, manda email de confirmação
        if (window.localStorage.getItem('isEmail') !== 'true' && window.localStorage.getItem('isAdmin')!== 'true') {
            
            //Caso o link do ethereal não tenha sido gerado, gerar um.
            if(window.localStorage.getItem('emailLink') === '') {

                const elem = {
                    id: window.localStorage.getItem('id'),
                    email: window.localStorage.getItem('email')
                }

                this.setState({
                    emailLink: ( <p>Gerando Email...</p> )
                })
                
                Axios.post('http://localhost:4000/send', elem)
                    .then(res => {
                        window.localStorage.setItem('emailLink', res.data)
                        this.setState({
                            emailLink: ( <a target="_blank" rel="noopener noreferrer" href={res.data}>E-mail Simulado</a> )
                        })
                    })
                    .catch(err => console.log("Erro: ", err.response))

            }
            //Caso tenha, usar o que já está disponível
            else {
                this.setState({
                    emailLink: ( <a target="_blank" rel="noopener noreferrer" href={window.localStorage.getItem('emailLink')}>E-mail Simulado</a>)
                })
            }
        }

    }

    geraEmail = () => {
        
        if (this.state.emailLink !== '') {
            return(
            <>
                <p>É sua primeira vez aqui ou você mudou seu endereço de email recentemente</p>
                <p>Mandamos um email para validar sua conta:</p>
                {this.state.emailLink}
                <br/>
                <br/>
                <p>Este site não pode mandar emails, então geramos uma mensagem no Ethereal Email,</p>
                <p>Se quiser acessar e ver todas as mensagens, acesse o <a href="https://ethereal.email/" target="_blank" rel="noopener noreferrer">Ethereal Email</a> </p>
                <p>E utilize as seguintes credenciais:</p>
                <p>Email: toy.murazik36@ethereal.email</p>
                <p>Senha: euQBKHdfg8PsH6QMGJ</p>
            </>)
        }
    }

    render() {
        
        return (
            <div>
                <h1>Olá, {this.state.user}</h1>
                {this.geraEmail()}
                <br/>
                <Link to="/login" onClick={() => {window.localStorage.clear(); this.props.stateRefresh();}}>Logout</Link>
            </div>
        );
    }
}

export default Dashboard;