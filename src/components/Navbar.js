import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {

    isLogged = () => {

        //Caso o usuário esteja autenticado, mostrar os seguintes itens na navbar
        if (this.props.logStatus.user) {

            const arr = []

            //Caso o E-mail esteja confirmado ou o usuário é um administrador, mostrar os seguintes itens.
            if (this.props.logStatus.isEmail === 'true' || this.props.logStatus.isAdmin === 'true') {
                arr.push((
                    <>
                        <li key='1' className="navbar-item">
                            <Link to="/lista/workstations" className="nav-link">Workstations</Link>
                        </li>
                        <li key='2' className="navbar-item">
                            <Link to="/lista/reunioes" className="nav-link">Salas de Reunião</Link>
                        </li>
                    </>
                ));
            }

            //Se um usuário for um Administrador, ele pode editar todos os usuários, caso não, ele pode apenas editar seus próprios dados
            arr.push((  
                    <>
                        <li key='3' className="navbar-item">
                            <Link   
                                to={this.props.logStatus.isAdmin === 'true' ? '/lista/usuarios/' : `/lista/usuarios/edit/${this.props.logStatus.id}`} 
                                className="nav-link">
                                    {this.props.logStatus.isAdmin === 'true' ? 'Usuários' : 'Editar Usuário'}
                            </Link>
                        </li>
                    </>
            ));

            //Retornar o JSX resultante da concatenação gerada pelas condicionais
            return arr

        }
        //Do contrário apenas renderizar Login ou Registro (O usuário não está autenticado)
        else {
            return (
                    <>
                        <li key='4' className="navbar-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li key='5' className="navbar-item">
                            <Link to="/lista/usuarios/add" className="nav-link">Registrar</Link>
                        </li>
                    </>
            )
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