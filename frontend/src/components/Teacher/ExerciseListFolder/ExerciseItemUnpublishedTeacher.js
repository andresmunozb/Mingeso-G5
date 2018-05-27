import React, { Component } from 'react';
import { Button, Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom';


class ExerciseItemUnpublishedTeacher extends Component {
    constructor (props) {
      super(props)
      this.state.myProps = this.props 
      this.deleteItem = this.deleteItem.bind(this)

    }
  
    state = {
      myProps:[]
    }
  
    componentWillMount () {
     
    }
  
    deleteItem () {
      this.props.deleteExercise(this.state.myProps.exercise)
     
    }
   
  
    
    render() {
      return (               
        
                <Card>
                  <Card.Content>
                  <Link to={{
                      pathname: '/view_exercise_teacher',
                      state: { viewAExercise: this.state.myProps.exercise,
                              published:false }
                    }}>
                        <Card.Header>
                        {this.props.exercise.title}
                        </Card.Header>
                    </Link>

                    <Card.Meta>
                      Prof 1
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                      <Link to={{
                          pathname: '/edit_exercise',
                          state: { editAExercise: this.state.myProps.exercise }
                        }}>

                          <Button color='yellow'>
                                  Editar
                          </Button>
                    </Link>


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
  