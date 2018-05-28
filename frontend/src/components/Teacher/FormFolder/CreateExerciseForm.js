import React ,{Component} from 'react';
import { Form, TextArea,Button,Divider } from 'semantic-ui-react'
import Axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
import Paper from 'material-ui/Paper';
import {Modal} from 'react-bootstrap'

const background = {
    mediumFrame:{
      width: 600,
      height: 600,
      padding: 30,
      position:'relative',
      left:'30%'
    },
    textAreaStyle:{
        minHeight: 300,
        maxHeight: 300

    }
}
class CreateExerciseForm extends Component{
    constructor(props) {
        super(props);
        this.emptyFields = this.emptyFields.bind(this)
        this.postExercise = this.postExercise.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

      }
    state = {
        title: "",
        description: ""
        
    }
    
    componentWillMount () {
  
    }

    handleShow() {
        this.setState({ show: true });
      }
      handleHide() {
        this.setState({ show: false });
      }

   emptyFields () {
    
     this.setState({ 
            title: "",
            description: "",
            show:false
        })

    }
    
    updateTitle(event){
        console.log(this.state.title)
        
        this.setState({ title: event.target.value })

    }
    updateDescription(event){
        console.log(this.state.description)
    
        
        this.setState({ description: event.target.value })

    }
  
    render() {
        let { title, description} = this.state

        return (
            <div>

          <MuiThemeProvider muiTheme={ThemeDefault}>  
            <Paper style={background.mediumFrame}>

                <Form style={{textAlign:"center"}}>
                    <h1>Nuevo Enunciado</h1>
                    <Form.Field>
                    <label>Titulo del enunciado</label>
                        <input  placeholder='Title' 
                                value= {title} 
                                onChange={this.updateTitle} />
                    </Form.Field>
                    <label>Descripcion</label>
                    <TextArea placeholder='Descripcion'
                              style={background.textAreaStyle}  
                              value= {description} 
                              onChange={this.updateDescription}/>  
                     <Divider />

                    <Button  floated= {'left'} 
                             color='red' 
                             type='Void'
                             onClick={this.emptyFields}  
                             >

                             Vaciar
                    </Button>

                    <Button floated= {'right'} 
                            primary={true} 
                            type='Create'  
                            onClick={this.postExercise}>

                            Crear
                    </Button>


                </Form>




           </Paper>
  
         </MuiThemeProvider>


            <Modal
            show={this.state.show}
            bsSize="small"
          >  

                     <Modal.Header >
                      <Modal.Title>Sugerencia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                          <p >
                            Desea ingresar otro enunciado?
                          </p>
                     </Modal.Body>
                      <Modal.Footer>
                        <Button  floated= {'left'} 
                                    color='red' 
                                    type='Negation'
                                    onClick={() => {
                                     this.props.history.push('/unpublished_exercises_teacher')
                                      }}
                                    >
                                    No
                          </Button>
                            <Button  floated= {'right'} 
                                    color='blue' 
                                    type='Positive'
                                    onClick={this.emptyFields}
                                    >
                                    Si
                            </Button>
                             
                           
                            
                          
                        </Modal.Footer>

             </Modal>
            </div>
  
     );
        
    }


    postExercise(){
        console.log("Soy ilegal")

        console.log(this.state.title)
        console.log(this.state.description)
        
        if(this.state.title !== undefined &&
           this.state.description !== undefined){
            if(this.state.title.length !== 0 &&
              this.state.description.length !== 0){
              let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "@crossorigin",
                }
              };

              let newExercise = {
                title:this.state.title,
                description: this.state.description,
                //LO DEFAULT ES QUE NO ESTA PUBLICADO
                published: false
              }
              
              // TESTEADO Y emptyFieldsANDO


              //http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/create/{id}, el id es para un usuario
              //en particular.
              //Futuro push se cambiara el id dependiendo del usuario
              Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/create/1',newExercise,axiosConfig)
                    .then((res) => {
                        console.log("RESPONSE RECEIVED: ", res);
                        this.handleShow();
                    })
                    .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                    }) 
            } 
            else{
              alert('Debes completar todos los campos');
            }           
        }
        else{
          alert('Debes completar todos los campos');
        }
    }
}

export default CreateExerciseForm;