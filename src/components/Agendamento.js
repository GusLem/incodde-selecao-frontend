import React, { Component } from 'react';

class Agendamento extends Component {

    state = {
        isAdmin: window.localStorage.getItem('isAdmin'),
        localUser: window.localStorage.getItem('user'),
    }

    //Renderiza os inputs, caso seja agendamento
    //de workstation não é necessário nome e
    //descrição ou participantes
    decideReuniao = (tipo) => {

        const arr = [];

        if (tipo === 'reunioes') {
            arr.push((<><h4>{this.props.nome}</h4>
                <p>Descrição: {this.props.desc}</p></>))
        }
        arr.push(<><p>Horário: {this.props.horario}</p>
            <p>Criador por: {this.props.criador}</p></>);

        if (tipo === 'reunioes') {
            arr.push((<><p>Participantes: {this.props.participantes.join(", ")}</p></>))
        

            if (!(this.props.participantes.includes(this.state.localUser))) {        
                arr.push((<><input type="button" value="Participar" className="btn btn-secondary" onClick={() => {this.props.addParticipante(this.props.nome)}}/>
                <br/></>))
            }
        }
        if (this.state.isAdmin === 'true' || this.props.criador === this.state.localUser) {
            arr.push(<input type="button" value="Deletar" className="btn btn-danger" onClick={() => {this.props.delAgendamento(this.props.nome)}}/>)
        }
        return arr;
    }



    render() {
        return (
            <div>
                {this.decideReuniao(this.props.tipo)}
               

                <hr/>
            </div>
        );
    }
}

export default Agendamento;