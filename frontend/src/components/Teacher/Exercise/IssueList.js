import React,{Component} from 'react'
//AQUI VA EL FORM 
class NewExercise extends Component{
    constructor(props){
        super(props)
        console.log(props)

    }

    render(){

        return(
            <p>
                AQUI VA UNA LISTA DE ENUNCIADOS
            </p>
        );
    }
}

export default NewExercise;