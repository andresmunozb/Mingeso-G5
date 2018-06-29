import React, { Component } from 'react';
import { Button, Card} from 'semantic-ui-react'

import {Link} from 'react-router-dom';

class ExerciseItemStudent extends Component {
    constructor(props) {
      super(props);
      this.state.myProps = this.props 

    }
    
    state = {
      myProps:[],
      toggle: false
    }
  
    componentWillMount () {
     
    }
  

    
    
  
    
    render() {
      return (               
        
                <Card onClick={this.viewItem}>
                  <Card.Content>
                  <Link to={{
                      pathname: '/view_exercise_student',
                      state: { viewAExercise: this.state.myProps.exercise}
                    }}>
                        <Card.Header  onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}>
                        {this.props.exercise.title}
                        </Card.Header>
                    </Link>
                    <Card.Meta>
                      Prof 1
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                  <Link to={{
                      pathname: '/solution',
                      state: { viewAExercise: this.state.myProps.exercise}
                    }}>
                      <Button  color='blue'
                               onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                >
                                Realizar
                      </Button>

                    </Link>
                      
                  </Card.Content>
                </Card>

      );
    }
  }
  
export default ExerciseItemStudent;
  