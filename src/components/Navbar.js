import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavbarElement from './NavbarElement';
import NavbarLogin from './NavbarLogin';

class Navbar extends Component {

    isLogged = () => {

        //Renderizar Login ou Registro (O usuário não está autenticado)
        if (!this.props.logStatus.user) {
            return (
                <NavbarLogin />
            )
        }
        //Mostrar Navbar normalemente (O usuário está autenticado)
        else {

            const arr = []

            //Caso o E-mail esteja confirmado ou o usuário é um administrador, mostrar os seguintes itens.
            if (this.props.logStatus.isEmail === 'true' || this.props.logStatus.isAdmin === 'true') {
                arr.push(
                    <NavbarElement key='1' dest="/lista/workstations" text="Workstations" />,
                    <NavbarElement key='2' dest="/lista/reunioes" text="Salas de Reunião" />
                );
            }

            //Se um usuário for um Administrador, ele pode editar todos os usuários, caso não, ele pode apenas editar seus próprios dados

            
            arr.push(
                <NavbarElement 
                    key='3' 
                    dest={this.props.logStatus.isAdmin === 'true' ? '/lista/usuarios/' : `/lista/usuarios/edit/${this.props.logStatus.id}`}
                    text={this.props.logStatus.isAdmin === 'true' ? 'Usuários' : 'Editar Usuário'}
                />
            );
            
            //Retornar o JSX resultante da concatenação gerada pelas condicionais
            return arr

        }
    }

    render() {
        return (     
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to={this.props.logStatus.user === null ? '/login' : '/'} className="navbar-brand">Coworking</Link>
                <div className="navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {this.isLogged()}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;