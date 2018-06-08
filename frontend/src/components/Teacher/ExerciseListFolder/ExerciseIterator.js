
import React, { Component } from 'react';
import ExerciseItemPublishedTeacher from './ExerciseItemPublishedTeacher'
import ExerciseItemUnpublishedTeacher from './ExerciseItemUnpublishedTeacher'

import {Card} from 'semantic-ui-react'


class ExerciseIterator extends Component {

   constructor( props ) {
        super( props );
        console.log("Los props")
        console.log(this.props.exercises)
        this.state={
          currentExercises: props.exercises
        }
        this.keyCount = 0;
        this.getKey = this.getKey.bind(this);
    }
    componentWillMount(){
        // CASO EXTREMO:
        //Se realiza esto si es que se borra todos los enunciados y se tiene un objeto vacio
        //Este no se puede mappear (iterar), por lo tanto se le asigna a la data actual como un arreglo vacio

        if(Object.keys(this.state.currentExercises).length === 0 
            && this.state.currentExercises.constructor === Object){
            this.setState({
              currentExercises: []
            })
        }
    }

    componentWillReceiveProps(nextProps) {
      // CASO "EXTREMO" (muy comun que le pase a un usuario pero es especial en como tratarlo):
        //Se realiza esta sentencia si es que se busca en la barra de buscar y no se encuentra ningun enunciado 
        //que tenga esa o esas letras en comun con algun enunciado

        if(Object.keys(nextProps.exercises).length === 0 
            && nextProps.exercises.constructor === Object){
            this.setState({
              currentExercises: []
            })
        }
        //Ejecucion normal caso feliz
        //Se encuentra el enunciado al tener letras en comun con el buscador o se cambia de pagina simplemente
      else{
          this.setState({
            currentExercises: nextProps.exercises
          })
        }
    

    }
    getKey(){
       return this.keyCount++;
    }
    
      //fechaVencimiento={product.fechaVencimiento} 
      createListExercises(){
             if(this.props.published){
              return this.state.currentExercises.map((exercise) => {
                return(
  
                  
                  <ExerciseItemPublishedTeacher
                      key={this.getKey()} 
                      exercise={exercise}
                  />
  
  
                )
              })
             }
             else{
              return this.state.currentExercises.map((exercise) => {
                return(
  
                  
                  <ExerciseItemUnpublishedTeacher
                      deleteExercise = {this.props.deleteExercise}
                      key={this.getKey()} 
                      exercise={exercise}

                  />
  
  
                )
              })
             }
              
            
          }
        
     render() {
        return (

            <Card.Group /*itemsPerRow={4}*/ stackable= {true}>

                 {this.createListExercises()}
            </Card.Group>
        )
     }
  }
  /*
 }*/
  export default ExerciseIterator;
  