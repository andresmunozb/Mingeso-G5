import React ,{Component} from 'react';
import { Form, TextArea,Button,Divider } from 'semantic-ui-react'
import Axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from './ThemeList';
import Paper from 'material-ui/Paper';
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
class viewExerciseStudent extends Component{
    constructor(props) {
        super(props);
        this.backToList = this.backToList.bind(this);

      }
    state = {

        title: this.props.location.state.editAExercise.exercise.title,
        description: this.props.location.state.editAExercise.exercise.description
        
    }
    
    componentWillMount () {
  
    }
    
    backToList () {
        /* <Redirect to={{
            pathname: '/login',
            search: '?utm=your+face',
            state: { editAExercise: exercise }
          }}/>*/
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

                <Form onSubmit={this.handleSubmit}>
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

                    <Button 
                            primary={true} 
                            type='Create'  
                            onClick={this.backToList}>

                            Volver
                    </Button>


                </Form>




           </Paper>
  
         </MuiThemeProvider>
  
     );
        
    }


}

export default viewExerciseStudent;