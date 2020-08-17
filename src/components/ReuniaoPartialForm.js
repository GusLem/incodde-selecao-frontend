import React from 'react';
import AddAgendamento from './AddAgendamento';
import UserVision from './UserVision';

function ReuniaoPartialForm(props) {
    return (
        <>
          {/* Caso seja usuário, apenas renderizar nome e descrição, sem 
              necessidade de possibilitar edição */}
          <UserVision onChange={props.onChange} nome={props.nome} desc={props.desc}/>
          <h2>{props.tipo === 'reunioes' ? 'Reuniões:' : 'Agendamentos:'}</h2>
          <hr/>
          {props.loadReuniao(props.agendamentos)}
          {/* Inputs para adicionar um agendamento ou reunião */}
          <AddAgendamento setError={props.setError} tipo={props.tipo} addAgendamento={props.addAgendamento}/>
        </>
      );
}

export default ReuniaoPartialForm;