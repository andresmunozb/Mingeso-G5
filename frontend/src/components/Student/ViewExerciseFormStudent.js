import React ,{Component} from 'react';
import { Form, TextArea,Button,Divider } from 'semantic-ui-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from './ThemeList';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router-dom';

const background = {
    mediumFrame:{
      width: 600,
      height: 660,
      padding: 30,
      position:'relative',
      left:'30%'
    },
    textAreaStyle:{
        minHeight: 400,
        maxHeight: 400

    }
}
class ViewExerciseFormStudent extends Component{
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
            <Paper style={background.mediumFrame}>

                <Form style={{textAlign:"center"}}>
                    <h1>Nuevo Enunciado</h1>
                    <Form.Field>
                    <label>Titulo del enunciado</label>
                        <input  placeholder='Title' 
                                value= {title} 
                               />
                    </Form.Field>
                    <label>Descripcion</label>
                    <TextArea placeholder='Descripcion'
                              style={background.textAreaStyle}  
                              value= {description} 
                             />  
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

export default ViewExerciseFormStudent;