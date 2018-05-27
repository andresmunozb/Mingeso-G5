import React ,{Component} from 'react';
import { Form, TextArea,Button,Divider } from 'semantic-ui-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from './ThemeList';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router-dom';
const background = {
  bigFrame:{
    padding: 30,
    position:'relative'
  },

  textAreaStyle:{
    height: 300

  },
  titleStyle:{
    width: 600
  }
}
class Solution extends Component {
    constructor(props) {
      super(props); 
      this.state = {
          title: props.location.state.viewAExercise.title,
          description: props.location.state.viewAExercise.description

      }

    }

  componentWillMount () {

  }


  render() {
    let { title, description} = this.state
        return (
          <MuiThemeProvider muiTheme={ThemeDefault}>  
            <Paper style={background.bigFrame}>

                <Form style={{textAlign:"center"}}>
                    <h1>Area de practica</h1>
                    <div style ={{width: '50%', position: 'relative', left:'25%'}}>
                      <Form.Field>
                      <label>Titulo del enunciado</label>
                          <input  placeholder='Title' 
                                  value= {title} 
                                  style={background.titleStyle}  
                                />
                      </Form.Field>
                      <label>Descripcion</label>
                    
                        <TextArea placeholder='Descripcion'
                                  style={background.textAreaStyle}  
                                  value= {description} 
                                />  
                    </div>
                    
                   
                    <Divider />

                      <Link to={{ pathname: '/exercises_student' }}>
                            <Button primary={true} type='Back'>
                                      Volver
                              </Button>
                      </Link>

                </Form>




          </Paper>

        </MuiThemeProvider>

    );
        
    }
  }
  
  export default Solution;
  