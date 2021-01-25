import React from 'react';

const LoginElement = (props) => {
    return (
        <div className="form-group"> 
            <label>{props.text}</label>
            <input  type={props.type}
                required
                className="form-control"
                minLength={props.minL}
                value={props.value}
                name={props.name}
                onChange={props.onCh}
                />
        </div>
    );
};

export default LoginElement;

/*
<div className="form-group"> 
                    <label>E-mail: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.email}
                        name="email"
                        onChange={this.onChange}
                        />
                </div>
                <div className="form-group"> 
                    <label>Senha: </label>
                    <input  type="password"
                        required
                        className="form-control"
                        minLength="6"
                        value={this.state.senha}
                        name="senha"
                        onChange={this.onChange}
                        />
                </div>
*/