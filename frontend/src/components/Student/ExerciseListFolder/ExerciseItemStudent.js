import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react'


class ExerciseItemStudent extends Component {
    constructor(props) {
      super(props);
      this.state.myProps = this.props 
      this.codeItem = this.codeItem.bind(this)
      this.viewItem = this.viewItem.bind(this)

    }
    
    state = {
      myProps:[],
      toggle: false
    }
  
    componentWillMount () {
     
    }
  

    codeItem () {
      this.setState({toggle:true}, this.props.codeExercise(this.state.myProps.exercise))

      
    }
    viewItem () {
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
                      <Button  color='blue'
                               onClick={this.codeItem}
                                >
                                Realizar
                      </Button>
                  </Card.Content>
                </Card>

      );
    }
  }
  
export default ExerciseItemStudent;
  