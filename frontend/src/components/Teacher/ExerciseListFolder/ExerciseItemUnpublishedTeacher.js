import React, { Component } from 'react';
import { Button, Card} from 'semantic-ui-react'
import styled from 'styled-components';

const Title = styled.h4`
  color:	#4783C5;
  &:hover{
    color:blue;
    cursor:pointer
  }
`;

class ExerciseItemUnpublishedTeacher extends Component {
    constructor (props) {
      super(props)
      this.state.myProps = this.props 
      console.log("deberan estar mis funciones:")
      console.log(props)
      this.deleteItem = this.deleteItem.bind(this)
      this.editItem = this.editItem.bind(this)
      this.viewItem = this.viewItem.bind(this)

    }
  
    state = {
      myProps:[]
    }
  
    componentWillMount () {
   
    }
    editItem () {
      this.props.editExercise(this.state.myProps.exercise)

    }
    viewItem () {
      this.props.viewExercise(this.state.myProps.exercise)

    }
  
  
    deleteItem () {
      this.props.deleteExercise(this.state.myProps.exercise)
     
    }
   
  
    
    render() {
      return (               
        
                <Card>
                  <Card.Content>
                
                        <Card.Header onClick={this.viewItem}>
                        <Title>{this.props.exercise.title}</Title>
                        </Card.Header>
                    

                    <Card.Meta>
                      Prof 1
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                     
                          <Button color='yellow'
                                  onClick = {this.editItem}>
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
  