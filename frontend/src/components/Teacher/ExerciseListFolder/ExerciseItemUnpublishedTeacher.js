import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react'


class ExerciseItemUnpublishedTeacher extends Component {
    constructor (props) {
      super(props)
      this.state.myProps = this.props 
      this.deleteItem = this.deleteItem.bind(this)
      this.editItem = this.editItem.bind(this)
      this.viewItem = this.viewItem.bind(this)

    }
  
    state = {
      myProps:[],
      toggle: false
    }
  
    componentWillMount () {
     
    }
  
    deleteItem () {
      this.setState({toggle:true}, this.props.deleteExercise(this.state.myProps.exercise))
     
    }
    editItem(){
      this.setState({toggle:true}, this.props.editExercise(this.state.myProps.exercise))
      
    }

    viewItem(){
      setTimeout(() => {
        if(!this.state.toggle){
          this.props.viewExercise(this.state.myProps.exercise)
        }
      }, 5);
      
    }
  
    
    render() {
      return (               
        
                <Card onClick={this.viewItem}>
                  <Card.Content>
                    <Card.Header>
                    {this.props.exercise.title}
                    </Card.Header>
                    <Card.Meta>
                      Prof 1
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                      <Button color='yellow'
                              onClick= {this.editItem}>
                              Editar
                      </Button>
                      <Button color='red'
                              onClick={this.deleteItem}>
                               Borrar
                      </Button>

                  </Card.Content>
                </Card>

      );
    }
  }
  
export default ExerciseItemUnpublishedTeacher;
  