import React, { Component } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import pt from "date-fns/locale/pt";
registerLocale("pt", pt);

/* Inputs para adicionar um agendamento ou reunião */

class AddAgendamento extends Component {

    state = {
        nome: '',
        desc: '',
        horario: '',
        criador: window.localStorage.getItem('user'),
        horarios: ["8h - 9h","9h - 10h","10h - 11h","11h - 12h","12h - 13h"],
        hora: "8h - 9h",
        data: new Date()

    }

    decideReuniao = (tipo) => {
        if (tipo === 'reunioes') {
            return (
                <>
                    <div className="form-group"> 
                    <label>Nome: (*)</label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.nome}
                        name="nome"
                        onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group"> 
                    <label>Descrição: (*)</label>
                    <input  type="text"
                        className="form-control"
                        value={this.state.desc}
                        name="desc"
                        onChange={this.onChange}
                        />
                    </div>
                </>
            );
        }
    }

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });

    horarioChange = (data,hora) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const dateStr = data.toLocaleDateString('pt-BR', options)
        const hourArr = hora.split(" - ")

        this.setState({
            horario: `${dateStr/*data.toString().substring(0,10)*/} de ${hourArr[0]} até ${hourArr[1]}`
        })
    }

    onHoraChange = (e) => {
        this.setState({
            hora: e.target.value
        })

        this.horarioChange(this.state.data,e.target.value);
    }

    onChangeDate = (date) => {
        this.setState({
          data: date
        })

        this.horarioChange(date,this.state.hora)
    }

    add = () => {
        this.props.addAgendamento(this.state);

        this.setState({
            nome: '',
            desc: '',
        })
    }

    componentDidMount() {
        this.horarioChange(this.state.data,this.state.hora)
    }
    

    render() {
        return (
            <div>
                {this.decideReuniao(this.props.tipo)}

                <div className="form-group">
                    <label>Data: (*)</label>
                    <div>
                    <ReactDatePicker
                        locale="pt"
                        dateFormat="dd/MM/yyyy"
                        selected={this.state.data}
                        name="data"
                        onChange={this.onChangeDate}
                    />
                    </div>
                </div>

                <div className="form-group">

                <label>Horario: </label>
                <select 
                    
                    required
                    className="form-control"
                    value={this.state.hora}
                    name="hora"
                    onChange={this.onHoraChange}>
                    {
                      this.state.horarios.map(i => {
                          return (<option key={i} value={i}>{i}</option>);
                      })
                    }
                </select>
              </div>


              <input type="button" value={this.props.tipo === 'reunioes' ? 'Adicionar Reunião' : 'Adicionar Agendamento'} className="btn btn-primary" onClick={this.add}/>
            </div>
        );
    }
}

export default AddAgendamento;