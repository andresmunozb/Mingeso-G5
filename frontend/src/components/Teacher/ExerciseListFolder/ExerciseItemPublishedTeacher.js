import React, { Component } from 'react';
import {Card} from 'semantic-ui-react'
import styled from 'styled-components';

const Title = styled.h4`
  color:	#4783C5;
  &:hover{
    color:blue;
    cursor:pointer
  }
`;
class ExerciseItemPublishedTeacher extends Component {
    constructor(props) {
      super(props);
      console.log(props);
      this.state.myProps = this.props 
      console.log("soy el ejercicio")
      console.log( this.props)      
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
        
      
                <Card onClick={this.viewItem}  onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}
                >
                  <Card.Content> 
                  <Card.Header>
                       <Title>{this.props.exercise.title} </Title>
                   </Card.Header>
                
                  
                  
                    <Card.Meta>
                    </Card.Meta>
                  </Card.Content>
                </Card>

      );
    }
  }
  
export default ExerciseItemPublishedTeacher;
  