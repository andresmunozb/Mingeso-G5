
import React, { Component } from 'react';
import ExerciseItemStudent from './ExerciseItemStudent'
import Axios from 'axios'
import { Button, Card, Image, Grid } from 'semantic-ui-react'


class ExerciseIterator extends Component {

   constructor( props ) {
        super( props );
        this.keyCount = 0;
        this.getKey = this.getKey.bind(this);
    }
    state = {
    
    }
    getKey(){
       return this.keyCount++;
    }
    
      //fechaVencimiento={product.fechaVencimiento} 
      createListExercises(){
            return this.props.exercises.map((exercise) => {
              return(


                <ExerciseItemStudent
                    key={this.getKey()} 
                    exercise={exercise} 
                    viewExercise = {this.props.viewExercise} 
                    codeExercise = {this.props.codeExercise} 
                />


              )
            })
          }
        
     render() {
        return (

            <Card.Group itemsPerRow={5} stackable= {true}>

            {this.createListExercises()}
            </Card.Group>
        )
     }
  }
  /*
 }*/
  export default ExerciseIterator;
  