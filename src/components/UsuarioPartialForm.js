import React, { Component } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import pt from "date-fns/locale/pt";
registerLocale("pt", pt);

class UsuarioPartialForm extends Component {

  isRegister = () => {

    //Se o usuário estiver logado e for administrado, ele pode
    //conceder privilégios de administrador para outro usuário
    if ((window.localStorage.getItem('user') && window.localStorage.getItem('isAdmin') === 'true')) {
      return (
        <>
        <div className="form-group"> 
          <label>Admin?  </label>
          <input  
            type="checkbox"
            checked={this.props.statusAdm}
            name="statusAdm"
            onChange={this.props.onAdminChange}
          />
        </div>
        </>
      )
    }
  }

  render() {
    return (
      <>
        <div className="form-group"> 
                    <label>Nome: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.props.nome}
                        name="nome"
                        onChange={this.props.onChange}
                        />
                  </div>
        <div className="form-group"> 
                  <label>Senha: (*) </label>
                  <input  type="password"
                      required
                      className="form-control"
                      minLength="6"
                      value={this.props.senha}
                      name="senha"
                      onChange={this.props.onChange}
                      />
              </div>
        <div className="form-group">
            <label>Data de Nascimento: (*)</label>
            <div>
            <ReactDatePicker
                locale="pt"
                dateFormat="dd/MM/yyyy"
                selected={this.props.aniv}
                name="date"
                onChange={this.props.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group"> 
            <label>CPF: (*)  </label>
            <input  type="text"
                required
                className="form-control cpf-mask"
                value={this.props.cpf}
                name="cpf"
                onChange={this.props.onCPFchange}
                />
          </div>
          <div className="form-group"> 
            <label>Endereço: (*)  </label>
            <input  type="text"
                required
                className="form-control"
                value={this.props.ende}
                name="ende"
                onChange={this.props.onChange}
                />
          </div>
        <div className="form-group"> 
          <label>Biografia: </label>
          <input  type="text"
              className="form-control"
              value={this.props.bio}
              name="bio"
              onChange={this.props.onChange}
              />
        </div>
        <div className="form-group"> 
            <label>E-mail: (*) </label>
            <input  type="text"
                required
                className="form-control"
                pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?" //Valida Email
                value={this.props.email}
                name="email"
                onChange={this.props.onChange}
                />
          </div>

          {this.isRegister()}
      </>
    );
  }
}

export default UsuarioPartialForm;

/* */