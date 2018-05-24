import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react'


class ExerciseItemPublishedTeacher extends Component {
    constructor(props) {
      super(props);
      console.log(props);
      this.state.myProps = this.props 
      this.viewItem = this.viewItem.bind(this)
    }
  
    state = {
      user: null
    }
  
    componentWillMount () {
     
    }
  
    viewItem () {
      this.props.viewExercise(this.state.myProps.exercise)
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
                </Card>

      );
    }
  }
  
export default ExerciseItemPublishedTeacher;
  