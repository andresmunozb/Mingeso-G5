import React, { Component } from 'react';
import {Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom';


class ExerciseItemPublishedTeacher extends Component {
    constructor(props) {
      super(props);
      console.log(props);
      this.state.myProps = this.props 
      console.log("soy el ejercicio")
      console.log( this.state.myProps.exercise)
    }
  
    state = {
      user: null
    }
  
    componentWillMount () {
     
    }
  
  
    
    render() {
      return (               
        
                <Card onClick={this.viewItem}>
                  <Card.Content> 
                    <Link to={{
                      pathname: '/view_exercise_teacher',
                      state: { viewAExercise: this.state.myProps.exercise, 
                            published: true}
                    }}>
                        <Card.Header>
                        {this.props.exercise.title}
                        </Card.Header>
                    </Link>
                    <Card.Meta>
                      Prof 1
                    </Card.Meta>
                  </Card.Content>
                </Card>

      );
    }
  }
  
export default ExerciseItemPublishedTeacher;
  