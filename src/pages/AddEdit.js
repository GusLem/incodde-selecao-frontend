import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';
import { cpfMask } from '../tools/mask'
import Agendamento from '../components/Agendamento';
import ReuniaoPartialForm from '../components/ReuniaoPartialForm';
import UsuarioPartialForm from '../components/UsuarioPartialForm';

//Este componente funciona como leitor, modificador e adicionador de elementos da CRUD
//E se modifica dependendo do contexto

class AddEdit extends Component {

    //O state carrega todas as variáveis possíveis dos
    //inputs que podem aparecer nesse componente
    state = {
        nome: '',
        aniv: new Date(),
        cpf: '',
        ende: '',
        bio: '',
        email: '',
        senha: '',
        statusAdm: false,
        desc: '',
        agendamentos: [],
        tempId: '',
        localUser: window.localStorage.getItem('user'),
        isAdmin: window.localStorage.getItem('isAdmin'),
        errors: []
    }
    
    //onChange universal para não ter que fazer onChange de cada variável
    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    });

    //onChange excepcional do CPF pois usa mask
    onCPFchange = (e) => {
      this.setState({
        cpf: cpfMask(e.target.value)
      })
    }

    //onChange do status de Administrador que usa Checkbox
    onAdminChange = (e) => this.setState({
      statusAdm: e.target.checked
    });

    //onChange de aniversário que usa o React Date Picker
    onChangeDate = (date) => {
        this.setState({
          aniv: date
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
    
        //Objeto que será enviado no POST contém todas as variáveis
        //possíveis de ser mandadas, as que não servirem
        //são automaticamente ignoradas
        const newElem = {
          nome: this.state.nome,
          desc: this.state.desc,
          aniv: this.state.aniv,
          cpf: this.state.cpf,
          ende: this.state.ende,
          bio: this.state.bio,
          email: this.state.email,
          senha: this.state.senha,
          statusAdm: this.state.statusAdm,
          emailConfirmado: window.localStorage.getItem('isEmail') ? window.localStorage.getItem('isEmail') : false,
          agendamentos: this.state.agendamentos
        }

        //Checa se existe um parametro id na URL
        //Caso não, estamos adicionando um elemento
        if (this.props.match.params.id === undefined) {
          Axios.post(`http://localhost:4000/${this.props.match.params.tipo}/add`, newElem)
            .then(res => {
              
                      //Checa se o usuário está logado, se ele estiver, ele é administrador
                      //só administradores podem adicionar usuarios manualmente
                      if (window.localStorage.getItem('user')) {
                        window.location = `/lista/${this.props.match.params.tipo}`;
                      }
                      //Caso não, alguém está se registrando
                      else {

                        
                        //Logamos ele automaticamente e redirecionamos pra Dashboard
                        window.localStorage.setItem('user',this.state.nome)
                        window.localStorage.setItem('email', this.state.email)
                        window.localStorage.setItem('isAdmin','false')
                        window.localStorage.setItem('isEmail','false')
                        window.localStorage.setItem('id',res.data)
                        window.localStorage.setItem('emailLink', '')
                        window.location = "/"
                        
                      }
            })
            .catch(err => console.log("Erro: ", err.response))
        }
        //Caso tenha, estamos editando um elemento
        else {
          Axios.post(`http://localhost:4000/${this.props.match.params.tipo}/update/${this.props.match.params.id}`, newElem)
            .then(res => {
              //TODO: Checar se essa condicional faz sentido
              if ((window.localStorage.getItem('user') && (window.localStorage.getItem('isAdmin') === 'true' )) || !(this.props.match.params.tipo === 'usuarios')) {
                window.location = `/lista/${this.props.match.params.tipo}`;
              }
              else {
                window.location = "/"
              }
            })
            .catch(err => console.log("Erro: ", err.response)) 

            //Checar se o elemento editado são usuários
            if (this.props.match.params.tipo === 'usuarios' 
                && window.localStorage.getItem('isAdmin') !== 'true') {

                  //Caso sim, se o usuário mudar de email, resettar a confirmação de email
                  if (window.localStorage.getItem('email') !== this.state.email) {
                    window.localStorage.setItem('isEmail','false')
                    window.localStorage.setItem('emailLink', '')

                    window.localStorage.setItem('email', this.state.email)
                  }

                  //Caso o usuário mude de nome, resettar o nome na session
                  if (window.localStorage.getItem('user') !== this.state.user) {
                    window.localStorage.setItem('user', this.state.nome)
                  }
                  
            }

            
        
        }

    }

    //Carrega agendamentos ou reuniões contidos no elemento
    loadReuniao = (arr) => {
      return arr.map(element => {
          return <Agendamento 
                    addParticipante={this.addParticipante} 
                    delAgendamento={this.delAgendamento} 
                    nome={element.nome} 
                    desc={element.desc} 
                    horario={element.horario} 
                    criador={element.criador} 
                    participantes={element.participantes}
                    tipo={this.props.match.params.tipo} 
                  />
      })


      
    }

    
    //Gera string dependendo da table que está aberta
    titleSingle = (tipo) => {
      let result;
      switch (tipo) {

          case 'workstations':
              result = 'Workstation'
          break;

          case 'reunioes':
            result = 'Sala de Reunião'
          break;

          case 'usuarios':
            result = 'Usuário'
          break;

          default:
            result = 'ERROR'
          break;

      }

      return result
  }

  //Gera titulo da página
  titleEdit = (tipo) => {
    if (window.localStorage.getItem('isAdmin') === 'true') {
      const title = this.titleSingle(tipo);
      const edit = this.props.match.params.id !== undefined ? "Editar " : "Criar "
      return edit + title;
    }
    else {return ''}
  }

  //Adiciona agendamento ou reunião no elemento
  addAgendamento = (agend) => {

        const err = []

        if (agend.nome === '' && this.props.match.params.tipo === 'reunioes') {
          err.push("Preencha o nome")
        }

        if (agend.desc === '' && this.props.match.params.tipo === 'reunioes') {
        err.push("Preencha a descrição")
      }

      if(this.state.agendamentos.some(i => i.horario === agend.horario)) {
        err.push("Horário conflitante")
      }

      this.setState({
        errors: err
      })

      if (err.length > 0) {
        window.scrollTo(0,0)
        return null;
      }

     const arr = this.state.agendamentos

     
     
     const newAgenda = {
      nome: agend.nome,
      desc: agend.desc,
      horario: agend.horario,
      criador: agend.criador,
      participantes: [this.state.localUser]
     }
     
     arr.push(newAgenda)

     this.setState({
       agendamentos: arr
     })
  }

  //Adiciona participante na reunião
  //Bug: Se o usuário mudar de nome, ele pode entrar novamente na reunião
  addParticipante = (nome) => {

    const arr = this.state.agendamentos
    const agend = this.state.agendamentos.find( i => i.nome === nome)
    const index = this.state.agendamentos.findIndex( i => i.nome === nome)

    agend.participantes.push(this.state.localUser);

    arr[index] = agend;

    this.setState({
      agendamentos: arr
    });

  }

  //Deleta agendamento ou reunião
  delAgendamento = (nome) => {
    this.setState({
      agendamentos: this.state.agendamentos.filter(i => i.nome !== nome)
    })
  }
  

  //Renderiza inputs a depender do parametro tipo
  formContent = (tipo) => {
    let result;
    switch (tipo) {

      case 'workstations':
      case 'reunioes':
          result = (<ReuniaoPartialForm 
                        nome={this.state.nome}
                        desc={this.state.desc} 
                        agendamentos={this.state.agendamentos} 
                        loadReuniao={this.loadReuniao} 
                        onChange={this.onChange} 
                        addAgendamento={this.addAgendamento}
                        tipo={this.props.match.params.tipo}
                        setError={this.setError} 
                    />)
        
      break;

      case 'usuarios':

        result = <UsuarioPartialForm
                    nome={this.state.nome}
                    senha={this.state.senha}
                    aniv={this.state.aniv}
                    cpf={this.state.cpf}
                    ende={this.state.ende}
                    bio={this.state.bio}
                    email={this.state.email}
                    statusAdm={this.state.statusAdm}
                    onChange={this.onChange}
                    onChangeDate={this.onChangeDate}
                    onAdminChange={this.onAdminChange}
                    onCPFchange={this.onCPFchange}  
                  /> 

      break;

      default:
            result = ( <h1>ERROR!</h1> );
      break;

    }

    return result

  }

  //Renderiza alert caso haja algo de errado nos
  //agendamentos ou reuniões
  showError = () => {
    return this.state.errors.map (i => {
        return (<div class="alert alert-danger" role="alert">{i}</div>)
    })
  }

    componentDidMount() {

      //Carrega elemento caso esteja sendo editado.
      if (this.props.match.params.id !== undefined) {
        Axios.get(`http://localhost:4000/${this.props.match.params.tipo}/${this.props.match.params.id}`)
            .then(res => {
                this.setState ({
                  nome: res.data.nome,
                  desc: res.data.desc,
                  aniv: new Date(res.data.aniv),
                  cpf: res.data.cpf,
                  ende: res.data.ende,
                  bio: res.data.bio,
                  email: res.data.email,
                  senha: res.data.senha,
                  statusAdm: res.data.statusAdm,
                  agendamentos: res.data.agendamentos
                });
            })
      }
        
    }

    render() {
        return (
            <div>
              {this.showError()}
              <h3>{this.titleEdit(this.props.match.params.tipo)}</h3>
              <form onSubmit={this.onSubmit}>


                {this.formContent(this.props.match.params.tipo)}

                <h4>(*): Obrigatórios</h4>
        
                <div className="form-group">
                  <input type="submit" value={this.state.isAdmin === 'true' ? this.titleEdit(this.props.match.params.tipo) : "Confirmar"} className="btn btn-primary" />
                </div>
              </form>
          </div>
        );
      }
    }

export default AddEdit;