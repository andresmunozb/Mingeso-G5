import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import globalStyles from '../styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../theme-default';


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
  function = () => {
   
  }
  render(){
      return(
        <MuiThemeProvider muiTheme={ThemeDefault}>  
        
        <div>
          <span style={globalStyles.navigation}>{this.state.navegacion}</span>

          {this.state.type === "paper" &&
           <Paper style={globalStyles.paper}>
              <h3 style={globalStyles.title}>{this.state.titulo}</h3>

              <Divider/>
              {this.props.children}

              <div style={globalStyles.clear}/>

            </Paper>
          }
          {this.state.type === "paper2" &&
           <Paper style={globalStyles.paper2}>
                <h3 style={globalStyles.title}>{this.state.titulo}</h3>

                <Divider/>
                {this.props.children}

                <div style={globalStyles.clear}/>

          </Paper>
          }
          {this.state.type === "paper3" &&
          <Paper style={globalStyles.paper3}>
               <h3 style={globalStyles.title}>{this.state.titulo}</h3>

               <Divider/>
               {this.props.children}

               <div style={globalStyles.clear}/>

         </Paper>
        
        
        
          }

         
      </div>
        
        
        
             </MuiThemeProvider>



      );

  }
}



export default PageBase;
