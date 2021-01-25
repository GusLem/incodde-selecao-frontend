import React, { Component } from 'react';
import Axios from 'axios';
import LoginElement from '../components/LoginElement';

class Login extends Component {

    state = {
        email: '',
        senha: '',
        errors: []
    }

    //onChange universal para não ter que fazer onChange de cada variável
    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });

    onSubmit = (e) => {

        e.preventDefault();
    
        const login = {
          email: this.state.email,
          senha: this.state.senha,
        }

        //Quando logado, setta todas as variaveis da session
        Axios.post(`http://localhost:4000/login`, login)
            .then(res => {
                if (res.data.status === "Logado") {
                    window.localStorage.setItem('user',res.data.nome)
                    window.localStorage.setItem('email',res.data.emailValue)
                    window.localStorage.setItem('isAdmin',res.data.adm)
                    window.localStorage.setItem('isEmail',res.data.email)
                    window.localStorage.setItem('id',res.data.id)
                    window.localStorage.setItem('emailLink', '')
                    window.location = "/"
                }
                else {
                    //Passa erros pro array de erros
                    this.setState ({
                        errors: [res.data.status]
                    })
                }
            })
            .catch(err => console.log("Erro: ", err.response))


    }

    //Renderiza se o email ou senha foram inválidos
    showError = () => {
        return this.state.errors.map (i => {
            return (<div class="alert alert-danger" role="alert">{i}</div>)
        })
      }

    render() {
        return (
            <div>
                {this.showError()}
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>

                <LoginElement 
                    type="email"
                    text="E-mail: " 
                    value={this.state.email}
                    name="email"
                    onCh={this.onChange}
                />

                <LoginElement 
                    type="password"
                    text="Senha: " 
                    value={this.state.senha}
                    name="senha"
                    minL="6"
                    onCh={this.onChange}
                />
        
                <div className="form-group">
                    <input type="submit" value="Efetuar Login" className="btn btn-primary" />
                </div>
                </form>
          </div>
        );
    }
}

export default Login;