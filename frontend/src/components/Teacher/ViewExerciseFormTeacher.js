import React ,{Component} from 'react';
import { Form, TextArea,Button,Divider } from 'semantic-ui-react'
import Axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from './ThemeList';
import Paper from 'material-ui/Paper';
import {Link,Redirect} from 'react-router-dom';

const background = {
    mediumFrame:{
      width: 600,
      padding: 20,
      position:'relative',
      left:'28%'
    },
    textAreaStyle:{
        minHeight: 300,
        maxHeight: 300

    }
}
class ViewExerciseFormTeacher extends Component{
    constructor(props) {
        super(props);
        console.log("Aqui en alguna parte deberia estar el enunciado")
        console.log(props)
        this.state = {
            title: props.location.state.viewAExercise.title,
            description: props.location.state.viewAExercise.description,
            published:  props.location.state.viewAExercise.published

        }
    }
    
    componentWillMount () {
  
    }
    
  
    render() {
        let { title, description,published} = this.state
        if(published){
            published = 'Publicado'
        }
        else{
            published = 'No publicado'
        }
        return (
          <MuiThemeProvider muiTheme={ThemeDefault}>  
            <Paper style={background.mediumFrame}>

                <Form style={{textAlign:"center"}}>
                    <h1> Detalles del Enunciado</h1>
                    <Form.Field>
                    <label>Titulo del enunciado</label>
                        <input  placeholder='Title' 
                                value= {title} 
                               />
                    </Form.Field>
                    <Form.Field>
                    <label>Estado de publicacion</label>
                        <input  placeholder='Title' 
                                value= {published} 
                                style={{width: 150}}
                                />
                    </Form.Field>
                    <label>Descripcion</label>
                    <TextArea placeholder='Descripcion'
                              style={background.textAreaStyle}  
                              value= {description} 
                             />  
                     <Divider />
                     {this.props.location.state.published &&
                                <Link to={{
                                    pathname: '/published_exercises_teacher'
                                }}>
                                    <Button primary={true} type='Back'>
                                            Volver
                                    </Button>
                                </Link>
                    }
                    {!(this.props.location.state.published) &&
                                <Link to={{
                                    pathname: '/unpublished_exercises_teacher'
                                }}>
                                    <Button primary={true} type='Back'>
                                            Volver
                                    </Button>
                                </Link>
                    }


                </Form>




           </Paper>
  
         </MuiThemeProvider>
  
     );
        
    }


}

export default ViewExerciseFormTeacher;