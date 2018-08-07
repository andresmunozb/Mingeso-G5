import React ,{Component} from 'react';
import { Form,Button,Divider,Icon,Dimmer,Loader,Segment} from 'semantic-ui-react'
import Axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
import Paper from 'material-ui/Paper';
import {Modal,Row,Col,Popover,OverlayTrigger} from 'react-bootstrap'
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
class AddTestCasesForm extends Component{
    constructor(props) {
        super(props);
        console.log("yep")
        console.log(props)
        //ARREGLO DE INPUTS Y OUTPUTS
        this.refInputs = new Map();
        this.refOutputs = new Map();

        //TESTCASE ACTIONS
        this.handleAddTestCase= this.handleAddTestCase.bind(this);
        this.handleRemoveTestCase= this.handleRemoveTestCase.bind(this);
        this.handleTestCaseNameChange= this.handleTestCaseNameChange.bind(this);
        this.handleTestCaseNameChange2= this.handleTestCaseNameChange2.bind(this);
        this.checkFields = this.checkFields.bind(this);
        //TESTCASE ACTIONS

        //TESTCASE CHECKING
        this.checkTestCases = this.checkTestCases.bind(this);
        this.checkTestCasesGoBack = this.checkTestCasesGoBack.bind(this);
        this.postTestCasesPriorChecking = this.postTestCasesPriorChecking.bind(this);
        //TESTCASE CHECKING

        //MODALS
        this.handleShowNewExercise = this.handleShowNewExercise.bind(this);
        this.handleHideNewExercise = this.handleHideNewExercise.bind(this);

        this.handleShowLinkTestCases = this.handleShowLinkTestCases.bind(this);
        this.handleHideLinkTestCases = this.handleHideLinkTestCases.bind(this);


        this.handleShowWarningCancel = this.handleShowWarningCancel.bind(this);
        this.handleHideWarningCancel = this.handleHideWarningCancel.bind(this);


        this.handleShowErrorMessage = this.handleShowErrorMessage.bind(this);
        this.handleHideErrorMessage = this.handleHideErrorMessage.bind(this);
        //MODALS

        //ADD TEST CASES    
        this.postTestCases = this.postTestCases.bind(this);

        //FORMAT FOR CODE
        this.popoverHoverFocus = this.popoverHoverFocus.bind(this);
        //FORMAT FOR CODE

        //LOADING SCREEN
        this.handleLoader = this.handleLoader.bind(this)
       

      }
    state = {
        exerciseId: this.props.location.state.exerciseId,
        nameInput: '',
        inputs: [{ nameInput: '' }],
        nameOutput: '',
        outputs: [{ nameOutput: '' }],
        anotherNewExercise: false,
        linkTestCases:  false,
        warningCancelTestCases:  false,
        warningErrorMessage: false,
        errorMessage: "",
        checkErrors:false,
        loader: false
        
    }
    handleLoader(){
        this.setState({loader: !this.state.loader});
    }

    
    componentWillMount () {
  
    }
    handleTestCaseNameChange = (idx) => (evt) => {
        const newInputs = this.state.inputs.map((input, sidx) => {
          if (idx !== sidx) return input;
          else {
            if(this.state.checkErrors && evt.target.value.length !== 0){
                this.refInputs.get(sidx).style.border = "";
            }
            return { ...input, nameInput: evt.target.value };
          }    
        });
        this.setState({ 
            inputs: newInputs
         });
    }
    handleTestCaseNameChange2 = (idx) => (evt) => {
        
        const newOutputs = this.state.outputs.map((output, sidx) => {
            if (idx !== sidx) return output;
            else {
                if(this.state.checkErrors && evt.target.value.length !== 0){
                    this.refOutputs.get(sidx).style.border = "";
                }
                return { ...output, nameOutput: evt.target.value };
            }            
        });
        
        this.setState({ 
            outputs: newOutputs
         });
    }
      
    handleAddTestCase = () => {
        this.setState({ 
            inputs: this.state.inputs.concat([{ nameInput: '' }]),
            outputs: this.state.outputs.concat([{ nameOutput: '' }])
        });
    }
      
    handleRemoveTestCase = (idx) => () => {
        this.setState({ 
            inputs: this.state.inputs.filter((s, sidx) => idx !== sidx) ,
            outputs: this.state.outputs.filter((s, sidx) => idx !== sidx) 
        });
    }


    handleShowNewExercise() {
        this.setState({ anotherNewExercise: true });
    }
    handleHideNewExercise() {
        this.setState({ anotherNewExercise: false });
    }




    handleShowLinkTestCases() {
        this.setState({ linkTestCases: true });
    }
    handleHideLinkTestCases() {
        this.setState({ linkTestCases: false });
    }




    handleShowErrorMessage() {
        this.setState({ warningErrorMessage: true });
    }
    handleHideErrorMessage() {
        this.setState({ warningErrorMessage: false });
    }



    handleShowWarningCancel() {
        this.setState({ warningCancelTestCases: true });
    }
    handleHideWarningCancel() {
        this.setState({ warningCancelTestCases: false });
    }


 
    
    updateTitle(event){
        console.log(this.state.title)
        if(this.state.checkErrors && event.target.value.length !== 0){
            this.refs.title.style.border = "";
        }
         this.setState({ title: event.target.value })

    }
    updateNameFunction(event){
        console.log(this.state.functionName)
        if(this.state.checkErrors && event.target.value.length !== 0){
            this.refs.functionName.style.border = "";
        }
        this.setState({ functionName: event.target.value })

    }
    updateDescription(event){
        console.log(this.state.description)
        if(this.state.checkErrors && event.target.value.length !== 0){
            this.refs.description.ref.style.border = "";
        }        
        this.setState({ description: event.target.value })

    }
    checkFields(field,fieldName,refNumber){
        if(field.length === 0){
            switch(fieldName) {
                case "input":
                    setTimeout(() => {
                        this.refInputs.get(refNumber).style.border = "1px solid red";
                    }, 1);
                    break;
                case "output":
                    setTimeout(() => {
                        this.refOutputs.get(refNumber).style.border = "1px solid red"; 
                    }, 1);              
                    break;
                default:
                    break;
            }
            
        }
    }

  popoverHoverFocus(){
      return <Popover id="popover-trigger-focus">
                <div>
                    <p>Cada entrada o salida debe estar separado por comas</p>
                    <p>{"\n"}</p>
                    <p>Si es un numero decimal, utilice punto para designar los decimales</p>
                    <p>Ej de entrada: 5,3.9</p>
                    <p>{"\n"}</p>
                    <p>Si alguna de sus entradas o salidas es de tipo string,debe escribirlo entre comillas dobles ("") </p>
                    <p>Ej de entradas: "palindromo","insertar"</p>
                    <p>Ej de salida: "No"</p>

              </div> 
            </Popover>
    
    
  }

  
    render() {
        
        return (
            <Segment>

                    <Dimmer active={this.state.loader} inverted>
                        <Loader inverted content='Creando casos de prueba...' />
                    </Dimmer>
                    <div className= "Form">
           
                        <MuiThemeProvider muiTheme={ThemeDefault}>  
                                <div className= "TestCaseForm"> 
                                    <h1 style={{textAlign:"center"}} >Nuevo Enunciado</h1>
                                    <div style={{padding:10}}></div>
                                
                                        <Paper style={background.mediumFrame}>
                                                <Form style={{textAlign:"center"}}>
                                                    <h1 style={{textAlign:"center"}} >Casos de prueba</h1>
                                                    
                                                    
                                                    <Row className="show-grid" style={{position:"relative", left: "6%"}}>
                                                            <Col  xs={5} sm={5} md={2} style={{position:"relative", left: "5%"}}>
                                                                <Button  
                                                                        color='blue' 
                                                                        type='Void'
                                                                        onClick={this.handleAddTestCase}
                                                                        onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                                        >
                                                                            Agregar
                                                                </Button>
                                                    
                                                            </Col>
                                                            <Col  xs={7} sm={7} md={5} lg={3} style={{position:"relative", left: "40%"}}>

                                                                <Row>
                                                                    <label  style={{textAlign:"center"}}>Formato:</label>                                                       
                                                                    
                                                                    <OverlayTrigger
                                                                                trigger={['hover', 'focus']}
                                                                                placement="right"
                                                                                overlay={this.popoverHoverFocus()}
                                                                            >
                                                                            <Icon name='help circle' 
                                                                                color='blue' 
                                                                                size='big' 
                                                                                style={{position:"relative", left: "10%"}}
                                                                                />
                                                                    </OverlayTrigger>
                                                                </Row>
                                                                        

                                                    
                                                            </Col>

                                                    </Row>
                                                    <Divider />
                                                    <Row>
                                                        <Col  xs={12} sm={12} md={6}>
                                                        <div style ={{position: "relative"}}>
                                                            <h2 style={{textAlign:"center"}} >Entrada</h2>
                                                        
                                                                                                              {this.state.inputs.map((input, idx) => (
                                                                                                    
                                                                    <div className="input" >
                                                                        <div style={{padding:10}}></div>
                                                                        <input style= {{border: "1px solid lightblue", width: "80%"}}
                                                                                type= "text"
                                                                                ref={c => this.refInputs.set(idx, c)} 
                                                                                placeholder={`Input #${idx + 1} name`}
                                                                                value={input.nameInput}
                                                                                onChange={this.handleTestCaseNameChange(idx)}
                                                                                onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                                        />
                                                                        {this.state.checkErrors && this.checkFields(input.nameInput, "input",idx)}
                                                                        
                                                                    </div>
                                                                ))}


                                                            </div>
                                                            

                                                        </Col>

                                                        <Col  xs={12} sm={12} md={6}>
                                                            <h2 style={{position: "relative", right: "10%", textAlign:"center"}} >Salida</h2>
                                                            {this.state.outputs.map((output, idx) => (
                                                                
                                                                    <div >
                                                                    <Row>
                                                                            <div style={{padding:10}}></div>
                                                                                <input style= {{border: "1px solid lightblue", width: "70%"}}
                                                                                        type= "text"
                                                                                        ref={c => this.refOutputs.set(idx, c)} 
                                                                                        placeholder={`Output #${idx + 1} name`}
                                                                                        value={output.nameOutput}
                                                                                        onChange={this.handleTestCaseNameChange2(idx)}
                                                                                        onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}
                
                                                                                />
                                                                            <Button   style= {{position: "relative", left: "5%"}}
                                                                                    circular color='red' icon='delete'
                                                                                    onClick={this.handleRemoveTestCase(idx)}
                                                                                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}
                                                                  >
                                                                            </Button>
                                                                        
                                                                            

                                                                        </Row>

                                                                        {this.state.checkErrors && this.checkFields(output.nameOutput, "output",idx)} 
                                                                    </div>
                                                                
                                                                        

                                                        
                                                                    
                                                            ))}
                                                        
                                                        </Col>
                                                    </Row>
                                                    <Divider/>
                                                    <Button   floated={'left'}
                                                            color='blue' 
                                                            type='Void'
                                                            onClick={() => {
                                                                this.checkTestCasesGoBack();
                                                            
                                                                }}
                                                                onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                            >

                                                            Volver
                                                            
                                                    </Button>
                                                    
                                                    <Button   floated={'right'}
                                                            color='yellow' 
                                                            type='Void'
                                                            onClick={() => {
                                                                this.postTestCasesPriorChecking();
                                                            
                                                                }}
                                                                onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                            >

                                                            Asociar al enunciado
                                                            
                                                    </Button>
                                                    <div style={{padding:6}}></div>
                                                    
                                                

                                                </Form>
                                            </Paper>

                                        
                                        
                                
                                </div>
                            
                            
                        </MuiThemeProvider>

                    <div className= "Modals">
                            <Modal show={this.state.anotherNewExercise}
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
                                                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                    >
                                                    No
                                        </Button>
                                            <Button  floated= {'right'} 
                                                    color='blue' 
                                                    type='Positive'   
                                                    onClick={() => {
                                                        this.props.history.push('/create_exercise')
                                                    }}
                                                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                    >
                                                    Si
                                            </Button>
                                        </Modal.Footer>

                            </Modal>
                            <Modal show={this.state.linkTestCases}
                                    bsSize="small"
                                    >  
                                    <Modal.Header >
                                    <Modal.Title style= {{textAlign: 'center'}}>Precaucion</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body >
                                        <p >
                                            Esta seguro de asociar estos casos de prueba al enunciado?
                                        </p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button  floated= {'left'} 
                                                    color='red' 
                                                    type='Negation'
                                                    onClick={() => {
                                                    this.handleHideLinkTestCases();
                                                    }}
                                                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                    >
                                                    No
                                        </Button>
                                            <Button  floated= {'right'} 
                                                    color='blue' 
                                                    type='Positive'   
                                                    onClick={() => {
                                                        this.handleHideLinkTestCases();
                                                        this.handleLoader();
                                                        this.postTestCases();
                                                    }}
                                                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                    >
                                                    Si
                                            </Button>
                                        </Modal.Footer>

                            </Modal>
                            <Modal show={this.state.warningCancelTestCases}
                                    bsSize="small"
                                    >  
                                    <Modal.Header >
                                    <Modal.Title style= {{textAlign: 'center'}} >Precaucion</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body >
                                        <p >
                                            Los casos de prueba ya escritos no seran asociados al enunciado.
                                            
                                        </p>
                                        <p>
                                            Esta seguro que no quiere asociarlos?
                                        </p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button  floated= {'left'} 
                                                    color='red' 
                                                    type='Negation'
                                                    onClick={() => {
                                                    this.handleHideWarningCancel();
                                                    }}
                                                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                    >
                                                    No
                                        </Button>
                                            <Button  floated= {'right'} 
                                                    color='blue' 
                                                    type='Positive'   
                                                    onClick={() => {
                                                        this.handleHideWarningCancel();
                                                        this.props.history.push('/create_exercise')
                                                    }}
                                                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                    >
                                                    Si
                                            </Button>
                                        </Modal.Footer>

                            </Modal>
                            <Modal show={this.state.warningErrorMessage}
                                        bsSize="small">  

                                                <Modal.Header >
                                                <Modal.Title style= {{textAlign: "center"}}>Error casos de prueba</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body >
                                                    <p style= {{textAlign:'center'}} >
                                                        {this.state.errorMessage}
                                                    </p>
                                                </Modal.Body>
                                                <Modal.Footer>                                        
                                                            <Button  style={{position:'relative', right: '35%'}}
                                                                    color='blue' 
                                                                    type='Positive'
                                                                    onClick={this.handleHideErrorMessage}
                                                                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                                    >
                                                                    OK
                                                            </Button>
                                                </Modal.Footer>

                            </Modal>
                        
                        </div>


                </div>

            </Segment>
            
            
  
     );
        
    }
    checkTestCasesGoBack(){
        //Volver sin problemas
        console.log("estoy aqui!!! y ", this.state.inputs.length)
       
        for(let i= 0;i<this.state.inputs.length;i++){
            if(this.state.inputs[i].nameInput.length !== 0 || this.state.outputs[i].nameOutput.length !== 0){
                    this.handleShowWarningCancel();
                    return;
            }
        }
        this.props.history.push('/create_exercise');

        

    }
    checkTestCases(){
        console.log("aquivan")
        console.log(this.state.inputs)
        console.log(this.state.outputs)
        var lengthInput;
        var lengthOutput
        if(this.state.inputs.length === 0) return 0;
        for(let i= 0;i<this.state.inputs.length;i++){
            if(this.state.inputs[i].nameInput.length === 0 || this.state.outputs[i].nameOutput.length === 0){
                return 1;
            }
        }

        lengthInput = this.state.inputs[0].nameInput.split(",").length;
        lengthOutput =  this.state.outputs[0].nameOutput.split(",").length;
        console.log("este es el largo del output")
        console.log(lengthOutput)
        var input;
        var output;
        var numOutput;
        var opt1 = 0;
        var opt2 = 0;
        var boolean;
        for(let i= 0;i<this.state.inputs.length;i++){

            input = this.state.inputs[i].nameInput.split(",");
            console.log("este es el input")
            console.log(input[0])
            console.log("este es su largo")
            console.log(input.length)
            //VER SI NO CUMPLE FORMATO: EJ: ,23, ,23  345, 
            if(input[0] === "" || input[input.length - 1 ] === "" ){
                opt1 = 4;
                break;
            }
            //QUE TODAS LAS ENTRADAS SEAN DEL MISMO TAMAÑO
            else if(lengthInput !== this.state.inputs[i].nameInput.split(",").length ){
                return 2;
            }
            //VER SI ES UN STRING, ENTONCES TIENE QUE ESTAR ENTRE COMILLAS ""
            for(let j= 0; j< input.length;j++){
                //Si no es un numero
                console.log("Soy un numero?:", input[j])
                boolean = isNaN(input[j]);
                if(boolean){
                    //Debe ser un string
                    //Ver si tiene comillas al principio y al final
                    console.log(input[j][0])
                    if((input[j].length === 1 && input[j] === '"')){
                        return 4   
                    }
                    else  if (input[j][0] !== '"' || input[j][input[j].length - 1] !== '"'){
                        return 8;
                    }
                    
                }

            }

        }
        for(let i= 0;i<this.state.outputs.length;i++){

            
            output = this.state.outputs[i].nameOutput;
            numOutput = this.state.outputs[i].nameOutput.split(",");
            console.log("ESTE ES EL OUTPUT")
            console.log(output)
            lengthOutput =  output.length;
            
            // NO PUEDEN HABER MAS DE 1 OUTPUT
            
            // MAL FORMATO: Ej:  ",3.54" , "3.54," y ",3.54," 
            if(output[0] === "," || output[ lengthOutput-1 ] === ","){
                opt2 = 5;
                break;
            }
            else if(numOutput.length !== 1 ){
                return 3;
            }
            else{
                console.log("Soy un numero?:", output)
                boolean = isNaN(output);
                if(boolean){
                    //Debe ser un string
                    //Ver si tiene comillas al principio y al final
                    console.log(output[0] )
                    console.log(output[ lengthOutput-1 ])
                    if((output.length === 1 && output === '"')){
                        return 5  
                    }
                    else if(output[0] !== '"' || output[ lengthOutput-1 ]!== '"'){
                        return 9;
                    }
                    
                }
            }
        }
        if(opt1 !== 0 && opt2 !== 0){
            console.log(opt1)
            console.log(opt2)
            return 6;
        }
        else if(opt1 !== 0){
            return 4;
        }
        else if(opt2 !== 0){
            return 5;
        }
        return 7;
    }


    postTestCasesPriorChecking(){
        var checking = this.checkTestCases();
        if(checking === 0){
            this.setState({checkErrors:true, errorMessage:'Debe agregar por lo menos un caso de prueba al enunciado' });
           
        }
        else if(checking === 1){
            this.setState({checkErrors:true, errorMessage:'Existe o existen casos de pruebas con entradas o salidas vacias, por favor completar o eliminar el/los casos de prueba correspondientes'});
           
        }
        else if(checking === 2){
            this.setState({errorMessage:'Existe o existen casos de pruebas con diferente numero de entradas, por favor completar o eliminar el/los casos de prueba correspondientes'});
         
        }
        else if(checking === 3){
            this.setState({errorMessage:'Existe o existen casos de pruebas con mas de una salida, no esta permitido por formato, porfavor eliminar o modificar las salidas correspondientes'});
          
        }
        else if(checking === 4){
            this.setState({errorMessage:'Existe o existen casos de pruebas con entradas que no cumplen el formato, por favor completar o eliminar el/los casos de prueba correspondientes'});
           
        }
        else if(checking === 5){
            this.setState({errorMessage:'Existe o existen casos de pruebas con salidas que no cumplen el formato, por favor completar o eliminar el/los casos de prueba correspondientes'});
            
        }
        else if(checking === 6){
            this.setState({errorMessage:'Existe o existen casos de pruebas con entradas y salidas que no cumplen el formato, por favor completar o eliminar el/los casos de prueba correspondientes'});
           
        }
        else if(checking === 7){
            this.handleShowLinkTestCases();

                
        }
        else if(checking === 8){
            this.setState({errorMessage:'Existe o existen casos de pruebas con entradas que no cumplen el formato, por favor ajustar o eliminar el/las entradas correspondientes'});

        }
        else if(checking === 9){
            this.setState({errorMessage:'Existe o existen casos de pruebas con salidas que no cumplen el formato, por favor ajustar o eliminar el/las salidas correspondientes'});

        }

        if(checking !== 7){
            setTimeout(() => {
                this.handleShowErrorMessage();
           }, 1);
        }
    }
    postTestCases(){
            let axiosConfig = {
                 headers: {
                   'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "@crossorigin"
                }
            };
            var validOutput;
            var boolean;
            for(let i = 0; i<this.state.inputs.length;i++){
                //Ver si es numero
                boolean = isNaN(this.state.outputs[i].nameOutput);
                if(boolean){
                    //Debe ser un string, hay que quitarle las comillas para que sea valido
                    //al compararlo
                    validOutput = this.state.outputs[i].nameOutput.slice(1, -1);
                }
                else{
                    validOutput = this.state.outputs[i].nameOutput;
                }
                console.log("este es el outputvalido")
                console.log(validOutput)
                let newTestCase = {
                    input: this.state.inputs[i].nameInput,
                    output:validOutput,
                }

                Axios.post('http://206.189.220.236:8080/backend-0.0.1-SNAPSHOT/testcases/create/'.concat(this.state.exerciseId.toString()),newTestCase,axiosConfig)
                    .then((res) => {
                        console.log("RESPONSE RECEIVED: ", res);
                        //Ultima iteracion
                        if(i  === this.state.inputs.length - 1){
                            this.handleLoader();
                            this.handleShowNewExercise();
                        }
                    })
                    .catch((err) => {
                        this.handleLoader();
                        this.setState({errorMessage:"No se pudieron crear correctamente los casos de prueba, intente mas tarde"});
                        setTimeout(() => {
                            this.handleShowErrorMessage();
                            return;
                        }, 5);
                    }) 

            }

                
        
    }
}

export default AddTestCasesForm;