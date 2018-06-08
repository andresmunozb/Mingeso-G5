import React ,{Component} from 'react';
import { Form, TextArea,Button,Divider } from 'semantic-ui-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router-dom';

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
            exercise: props.location.state,
            title: null,
            description: null,
            published: null,
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
                title: this.state.exercise.viewAExercise.title,
                description: this.state.exercise.viewAExercise.description,
                published:  this.state.exercise.viewAExercise.published,
                isSafeToRender: true

            })
        }
    }
    
  
    render() {
        let { title, description,published} = this.state
        let publicado
        if(published){
            publicado = 'Publicado'
        }
        else{
            publicado = 'No publicado'
        }
        return (
            <div> 
            {this.state.isSafeToRender &&
                <MuiThemeProvider muiTheme={ThemeDefault}>  
                   <Paper style={background.mediumFrame}>

                    <Form style={{textAlign:"center"}}>
                        <h1> Detalles del Enunciado</h1>
                        <Form.Field>
                        <label>Titulo del enunciado</label>
                            <input  placeholder='Title' 
                                    readOnly={true}
                                    value= {title} 
                                    style={{  textAlign:"center"}}
                                    />
                        </Form.Field>
                        <Form.Field>
                        <label>Estado de publicacion</label>
                            <input  placeholder='Title' 
                                    value= {publicado} 
                                    readOnly={true}
                                    style={{width: 150, textAlign:"center"}}
                                    />
                        </Form.Field>
                        <label>Descripcion</label>
                        <TextArea placeholder='Descripcion'
                                    style={background.textAreaStyle}  
                                    readOnly={true}
                                    value= {description} 
                                />  
                        <Divider />
                        {published &&
                                    <Link to={{
                                        pathname: '/published_exercises_teacher'
                                    }}>
                                        <Button primary={true} type='Back'>
                                                Volver
                                        </Button>
                                    </Link>
                        }
                        {!published &&
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

                </MuiThemeProvider> }



                
            </div>
  
     );
        
    }


}

export default ViewExerciseFormTeacher;