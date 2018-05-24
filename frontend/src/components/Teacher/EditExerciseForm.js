import React ,{Component} from 'react';
import { Form, TextArea,Grid,Button,Divider } from 'semantic-ui-react'
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
class EditExerciseForm extends Component{
       constructor(props) {
        super(props);
        this.funcion = this.funcion.bind(this)
        this.editExercise = this.editExercise.bind(this);
        this.publishExercise = this.publishExercise.bind(this);

        this.emptyFields = this.emptyFields.bind(this);
      }
      state = {

        id: this.props.location.state.editAExercise.exercise.id,
        title: this.props.location.state.editAExercise.exercise.title,
        description: this.props.location.state.editAExercise.exercise.description,
        published:  this.props.location.state.editAExercise.exercise.published
      }

      editExercise(){
        if(this.state.title !== undefined && this.state.description !== undefined){

              if(this.state.title.length !== 0 &&
                this.state.description.length !== 0){          
                  let jsonAgregar = {
                    title:this.state.title,
                    description: this.state.description
                  }
                  
                /*  Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.id+'/edit', jsonAgregar)
                  .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                  
                    alert('Se ha modificado sadisfactoriamente el enunciado de titulo: '+this.state.title);


                  })
                  .catch((err) => {
                    console.log("AXIOS ERROR: ", err);

                  })*/
              }
              else{
                alert('Debes completar todos los campos');
              }
          }
        else{
            alert('Debes completar todos los campos');
        }
      }


      publishExercise () {
        let jsonAgregar = {
          published:true
        }
     /*   Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.id+'/publish',jsonAgregar)
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
             <Redirect to={{
                pathname: '/ExerciseListPublishedTeacher'
              }}/>
      
         
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
    
        });*/
      }

      updateTitle(event){
          console.log(this.state.title)
          this.setState({ title: event.target.value })
      }
      updateDescription(event){
          console.log(this.state.description)
          this.setState({ description: event.target.value })

      }

      emptyFields () {
        this.setState({ 
          title: "",
          description: ""
        })
      }
    
      componentWillMount () {
       
      }
    
    
      
      render() {
  
        return (
          <MuiThemeProvider muiTheme={ThemeDefault}>  
            <Paper style={background.mediumFrame}>

                <Form>
                    <h1>Edicion Enunciado</h1>
                    <Form.Field>
                      <label>Titulo del enunciado</label>
                      <input  placeholder='Title' 
                              value= {this.state.title} 
                              onChange={this.updateTitle} 
                              />
                    </Form.Field>

                    <label>Descripcion</label>
                    <TextArea   placeholder='Descripcion'
                                style={background.textAreaStyle}
                                value= {this.state.description} 
                                onChange={this.updateDescription}
                                />  

                    <Divider />

                    <Button  floated= {'left'} 
                             color='red' 
                             type='Empty'
                             onClick={this.emptyFields}
                             >

                             Vaciar campos
                  </Button>

                     <Button floated= {'right'} 
                             primary={true} 
                             type='Editar'
                             onClick={this.editExercise}
                             >
                             Modificar
                    </Button>
                     <Button  floated= {'right'} 
                              color='yellow' 
                              type='Publish'
                              onClick={this.publishExercise}
                              >
                              Publicar
                    </Button>


                </Form>




            </Paper>
  
          </MuiThemeProvider>
  
        );
        
      }
}

export default EditExerciseForm;