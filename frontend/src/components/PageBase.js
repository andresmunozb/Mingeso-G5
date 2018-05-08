import React, { Component } from 'react';
import {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import globalStyles from '../styles';



class PageBase extends Component{
  constructor(props){
    super(props);
    console.log(props)
    this.state ={
      titulo: this.props.title,
      navegacion: this.props.navigation,
      type: this.props.type
     
    }
  }
  renderSwitch = (param) => {
    switch(param) {
      case 'foo':
        return 'bar';
      default:
        return 'foo';
    }
  }
  render(){
      return(
        <div>
          <span style={globalStyles.navigation}>{this.state.navegacion}</span>

          <Paper style={globalStyles.paper}>
              <h3 style={globalStyles.title}>{this.state.titulo}</h3>

              <Divider/>
              {this.props.children}

              <div style={globalStyles.clear}/>

          </Paper>
      </div>


      );

  }
}



export default PageBase;
