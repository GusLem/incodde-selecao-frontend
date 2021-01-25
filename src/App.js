import React, { Component } from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from './components/Navbar'
import AddEdit from './pages/AddEdit';
import Login from './pages/Login';
import Lista from './pages/Lista';
import Dashboard from './pages/Dashboard';
import Validate from './pages/Validate';

class App extends Component {

  //Setta o state de acordo com o LocalStorage para emular uma session
  //Isto é apenas pro navbar
  state = {
    user: window.localStorage.getItem('user'),
    isAdmin: window.localStorage.getItem('isAdmin'),
    isEmail: window.localStorage.getItem('isEmail'),
    id: window.localStorage.getItem('id')
  }

  //Função para atualizar o state do app.js caso valores do localStorage mudem
  //Isto é apenas pro navbar
  stateRefresh = () => {
    this.setState({
      user: window.localStorage.getItem('user'),
      isAdmin: window.localStorage.getItem('isAdmin'),
      isEmail: window.localStorage.getItem('isEmail'),
      id: window.localStorage.getItem('id')
    })
  }


  render() {
    return (
      <Router>

        <div className="container">
          <Navbar logStatus={this.state} />
          <Route path ="/" exact render={props => (
            <>
              <Dashboard stateRefresh={this.stateRefresh} />
            </>
          )}/>
          <Route path ="/login" exact render={props => (
            <>
              <Login stateRefresh={this.stateRefresh} />
            </>
          )}/>
          <Route path ="/lista/:tipo" exact component={Lista} />
          <Route path ="/lista/:tipo/add" component={AddEdit} />
          <Route path ="/lista/:tipo/edit/:id" component={AddEdit} />
          <Route path ="/validate/:id" component={Validate} />
        </div>
        
      </Router>
    );
  }
}

export default App;



