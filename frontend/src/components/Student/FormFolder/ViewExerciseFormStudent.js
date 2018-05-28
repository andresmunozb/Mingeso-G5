import React ,{Component} from 'react';
import { Form, TextArea,Button,Divider } from 'semantic-ui-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
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
            exercise: props.location.state,
            title: null,
            description: null,
            isSafeToRender: false

        }

      }
    
      componentWillMount () {
        console.log(this.state.exercise)
        if(this.state.exercise === undefined){
            console.log(this.props.history);
            this.props.history.goBack();
        }
        else{
            this.setState({  
              title:this.state.exercise.viewAExercise.title,
              description: this.state.exercise.viewAExercise.description,
              isSafeToRender: true

            })
        }
      }
    
  
    render() {
        let { title, description} = this.state
        return (
            <div>
                {this.state.isSafeToRender &&
                    <MuiThemeProvider muiTheme={ThemeDefault}>  
                        <Paper style={background.mediumFrame}>

                            <Form style={{textAlign:"center"}}>
                                <h1>Detalles del Enunciado</h1>
                                <Form.Field>
                                <label>Titulo del enunciado</label>
                                    <input  placeholder='Title' 
                                            readOnly={true}
                                            value= {title} 
                                        />
                                </Form.Field>
                                <label>Descripcion</label>
                                <TextArea placeholder='Descripcion'
                                        style={background.textAreaStyle}  
                                        value= {description} 
                                        readOnly={true}

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
                }
                
            </div>
     
  
     );
        
    }


}

export default ViewExerciseFormStudent;