import React from 'react';

/* Caso seja usuário, apenas renderizar nome e descrição, sem 
    necessidade de possibilitar edição */

function UserVision(props) {
    if (window.localStorage.getItem('isAdmin') === 'true') {
    return (
        <>
            <div className="form-group"> 
                <label>Nome: </label>
                <input  
                    type="text"
                    required
                    className="form-control"
                    value={props.nome}
                    name="nome"
                    onChange={props.onChange}
                />
            </div>
            <div className="form-group"> 
                <label>Description: </label>
                <input  
                    type="text"
                    required
                    className="form-control"
                    value={props.desc}
                    name="desc"
                    onChange={props.onChange}
                />
            </div> 
        </>
    );
    }
    else {
        return(<>
            <h1>{props.nome}</h1>
            <h2>{props.desc}</h2>
        </>)
    }
}

export default UserVision;