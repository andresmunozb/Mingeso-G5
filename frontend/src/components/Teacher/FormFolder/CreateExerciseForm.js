import React ,{Component} from 'react';
import { Form, TextArea,Button,Divider} from 'semantic-ui-react'
import Axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
import Paper from 'material-ui/Paper';
import {Modal} from 'react-bootstrap'
const background = {
    mediumFrame:{
      width: "40%",
      height: "60%",
      padding:"2%",
      position:'relative',
      left:"30%",
      border: "1px solid lightblue"
    },
    textAreaStyle:{
        minHeight: 300,
        maxHeight: 300

    }
}
class CreateExerciseForm extends Component{
    constructor(props) {
        super(props);
        console.log("yep")
        console.log(props)

        //FIELD ACTIONS
        this.checkFields = this.checkFields.bind(this);
        this.emptyFields = this.emptyFields.bind(this);
        //FIELD ACTIONS

        //FIELD UPDATES
        this.updateDescription = this.updateDescription.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateNameFunction= this.updateNameFunction.bind(this);
        //FIELD UPDATES

        //MODALS
        this.handleShowTestCase = this.handleShowTestCase.bind(this);
        this.handleHideTestCase = this.handleHideTestCase.bind(this);

        this.handleShowNewExercise = this.handleShowNewExercise.bind(this);
        this.handleHideNewExercise = this.handleHideNewExercise.bind(this);
        //MODALS

        //CREATE EXERCISE
        this.postExercise = this.postExercise.bind(this);

        //DISABLE BUTTONS
        this.handleDisableButton = this.handleDisableButton.bind(this)
       

      }
    state = {
        title: "",
        description: "",
        functionName: "",
        exerciseId: -1,
        showTestCaseOption:false,
        showNewExercise:false,
        toggle:false,
        disableButton: false
        
    }
    
    componentWillMount () {
  
    }

    handleDisableButton() {
        this.setState({ disableButton: !this.state.disableButton });
    }

    handleShowTestCase() {
        this.setState({ showTestCaseOption: true });
    }
    handleHideTestCase() {
        this.setState({ showTestCaseOption: false });
    } 

    handleShowNewExercise() {
        this.setState({ showNewExercise: true });
    }
    handleHideNewExercise() {
        this.setState({ showNewExercise: false });
    }
   emptyFields () {
     if(this.state.showNewExercise){
            this.setState({ 
                title: "",
                description: "",
                functionName: "",
                showNewExercise:false,
                toggle:false
            })
     }
     else{
        this.setState({ 
            title: "",
            description: "",
            functionName: ""
        })
     }
    }
    
    updateTitle(event){
        console.log(this.state.title)
        if(this.state.toggle && event.target.value.length !== 0){
            this.refs.title.style.border = "";
        }
         this.setState({ title: event.target.value })

    }
    updateNameFunction(event){
        console.log(this.state.functionName)
        if(this.state.toggle && event.target.value.length !== 0){
            this.refs.functionName.style.border = "";
        }
        this.setState({ functionName: event.target.value })

    }
    updateDescription(event){
        console.log(this.state.description)
        if(this.state.toggle && event.target.value.length !== 0){
            this.refs.description.ref.style.border = "";
        }        
        this.setState({ description: event.target.value })

    }
    checkFields(field,fieldName){
        if(field.length === 0){
            switch(fieldName) {
                case "title":
                    this.refs.title.style.border = "1px solid red";
                    return  <label style={{color:'red'}}> Este campo es obligatorio</label> 
                    
                case "functionName":
                    this.refs.functionName.style.border = "1px solid red";
                    return  <label style={{color:'red'}}> Este campo es obligatorio</label> 
                    
                case "description":
                    this.refs.description.ref.style.border = "1px solid red";
                    return  <label style={{color:'red'}}> Este campo es obligatorio</label> 
                default:
                    break;
            }
            
        }
    }
  
    render() {
        let { title, description,functionName} = this.state
        
        return (
            <div className= "WholeComponent">
                    <MuiThemeProvider muiTheme={ThemeDefault}>  
                        <div className= "Form">
                            <h1 style={{textAlign:"center"}} >Nuevo Enunciado</h1>
                            <div style={{padding:10}}></div>
                                        <Paper style={background.mediumFrame}>
                                            <Form error style={{textAlign:"center"}}>
                                            <h1 style={{textAlign:"center"}} >Contenido</h1>
                                                <Form.Field>
                                                <label>Titulo del enunciado</label>
                                                    <input  placeholder='Titulo' 
                                                            value= {title} 
                                                            ref = "title"
                                                            onChange={this.updateTitle} 
                                                            style={{  textAlign:"center"}}/>
                                                {this.state.toggle && this.checkFields(title, "title")}
                                                        
                                                </Form.Field>
                                                <Form.Field>
                                                <label>Nombre de la funcion principal:</label>
                                                    <input  placeholder='Funcion' 
                                                            value= {functionName} 
                                                            ref = "functionName"
                                                            onChange={this.updateNameFunction} 
                                                            style={{  textAlign:"center"}}/>
                                                {this.state.toggle && this.checkFields(functionName, "functionName")}
                                                </Form.Field>
                                                <label>Descripcion</label>
                                                <TextArea placeholder='Descripcion'
                                                            ref = "description"
                                                            style={{minHeight: 300,maxHeight: 300}} 
                                                            value= {description} 
                                                            
                                                            onChange={this.updateDescription}/>  
                                                {this.state.toggle && this.checkFields(description, "description")}
                                                <Divider />

                                                <Button  floated= {'left'} 
                                                            color='red' 
                                                            type='Void'
                                                            onClick={this.emptyFields}  

                                                            disabled={this.state.disableButton}
                                                            >

                                                            Vaciar campos
                                                </Button>

                                                <Button floated= {'right'} 
                                                        primary={true} 
                                                        type='Create'  
                                                        onClick={() => {
                                                            this.handleDisableButton();
                                                            this.postExercise();
                                                        }}
                                                        disabled={this.state.disableButton}
                                                        >

                                                        Crear Enunciado
                                                </Button>
                                                <div style={{padding:6}}></div>


                                            </Form>
                                        </Paper>
                        
                        
                        </div>
                                
                                
                        </MuiThemeProvider>
                    
                    <div className= "Modals"> 

                        <Modal show={this.state.showTestCaseOption}
                                bsSize="small"
                                    >  

                                    <Modal.Header >
                                    <Modal.Title>Sugerencia</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body >
                                        <p >
                                            Desea agregar casos de prueba?
                                        </p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button  floated= {'left'} 
                                                    color='red' 
                                                    type='Negation'                                                    
                                                    onClick={() => {
                                                        this.handleShowNewExercise();
                                                        this.handleHideTestCase();
                                                    }}
                                                    >
                                                    No
                                        </Button>
                                            <Button  floated= {'right'} 
                                                    color='blue' 
                                                    type='Positive'
                                                    onClick={() => {
                                                        this.props.history.push('/create_exercise_testcases', {exerciseId: this.state.exerciseId})
                                                    }}
                                                    >
                                                    Si
                                            </Button>
                                            
                                        
                                            
                                        
                                        </Modal.Footer>

                            </Modal>
                        <Modal show={this.state.showNewExercise}
                                bsSize="small"
                                    >  

                                    <Modal.Header >
                                    <Modal.Title style= {{textAlign: 'center'}}>Sugerencia</Modal.Title>
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
                                                    onClick={() => {
                                                        this.handleDisableButton();
                                                        this.emptyFields()
                                                        }}
                                                    >
                                                    Si
                                            </Button>
                                            
                                        
                                            
                                        
                                        </Modal.Footer>

                            </Modal>
                        
                    </div>
                      
        </div>
  
     );
        
    }

    postExercise(){
        console.log("Son los fields:")

        console.log(this.state.title)
        console.log(this.state.description)
        console.log(this.state.functionName)
        
        if(this.state.title !== undefined &&
           this.state.description !== undefined &&  this.state.functionName !== undefined ){

            if(this.state.title.length !== 0 &&
              this.state.description.length !== 0 && this.state.functionName.length !== 0){

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
                        published: false,
                        functionName:this.state.functionName
                      }
                      //http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/create/{id}, el id es para un usuario
                      //en particular.
                      //Futuro push se cambiara el id dependiendo del usuario
                      Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.title)
                            .then(response => {

                                console.log("RESPONSE RECEIVED: ", response);
                                //No existe enunciado con ese titulo, es seguro crearlo
                                if(response.data === ""){
                                    Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/create/1',newExercise,axiosConfig)
                                    .then((res) => {
                                        console.log("paso por aqui")
                                        console.log(this.state.title)
                                        console.log("RESPONSE RECEIVED: ", res);
                                        Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.title)
                                            .then(response => {
                                                console.log(response.data)
                                                this.setState({
                                                    exerciseId: response.data.id
                                                });
                                                setTimeout(() => {
                                                    this.handleShowTestCase();
                                                }, 1);
                                                
                                                
                                            })
                                            .catch((err) => {
                                                console.log("AXIOS ERROR: ", err);
                                            }) 
                                    })                                
                                    .catch((err) => {
                                        console.log("AXIOS ERROR: ", err);
                                    }) 
    
                                }
                                else{
                                    alert("Ya existe un enunciado con ese titulo, porfavor utilice otro")
                                    this.setState({disableButton: false})
                                }
                                
                                
                            })
                            .catch((err) => {
                                console.log("No se pudo crear el enunciado, porfavor intente de nuevo");

                      }) 
                    
            
              
            } 
            else{                
                 alert('Existen campos obligatorios sin completar, porfavor completelos');
                 this.setState({toggle:true, disableButton:false});
            }           
        }
        else{

            alert('Existen campos obligatorios sin completar, porfavor completelos');
            this.setState({toggle:true});
        }
    }
}

export default CreateExerciseForm;