import React, {Component} from 'react'

class NoRegister extends Component{
    render(){
        return(
            <div>
            <h1>Usuario NO registrado en la base de datos</h1>
            <p>Por favor contatate con un administrador para validar tu acceso</p>
            </div>
        );
    }
}

export default NoRegister;