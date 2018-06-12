import React ,{Component} from 'react';
import { Form,Button,Divider} from 'semantic-ui-react'
import Axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
import Paper from 'material-ui/Paper';
import {Modal,Row,Col} from 'react-bootstrap'
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

        //TESTCASE FORMAT
        this.formatTestCases = this.formatTestCases.bind(this);

        //MODALS
        this.handleShowNewExercise = this.handleShowNewExercise.bind(this);
        this.handleHideNewExercise = this.handleHideNewExercise.bind(this);
        //MODALS

        //ADD TEST CASES    
        this.postTestCases = this.postTestCases.bind(this);

       

      }
    state = {
        exerciseId: this.props.location.state.exerciseId,
        nameInput: '',
        inputs: [{ nameInput: '' }],
        nameOutput: '',
        outputs: [{ nameOutput: '' }],
        showNewExercise: false,
        toggle:false
        
    }
    
    componentWillMount () {
  
    }
    handleTestCaseNameChange = (idx) => (evt) => {
        const newInputs = this.state.inputs.map((input, sidx) => {
          if (idx !== sidx) return input;
          else {
            if(this.state.toggle && evt.target.value.length !== 0){
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
                if(this.state.toggle && evt.target.value.length !== 0){
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
        this.setState({ showNewExercise: true });
      }
      handleHideNewExercise() {
        this.setState({ showNewExercise: false });
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
  
    render() {
        
        return (
            <div className= "Form">

            <MuiThemeProvider muiTheme={ThemeDefault}>  
                    <div className= "TestCaseForm"> 
                        <h1 style={{textAlign:"center"}} >Nuevo Enunciado</h1>
                        <div style={{padding:10}}></div>
                    
                            <Paper style={background.mediumFrame}>
                                    <Form style={{textAlign:"center"}}>
                                        <h1 style={{textAlign:"center"}} >Casos de prueba</h1>
                                    
                                        <Button  
                                                        color='blue' 
                                                        type='Void'
                                                        onClick={this.handleAddTestCase}
                                                        >
                                                            Agregar
                                        </Button>
                                        <Divider />
                                        <Row>
                                            <Col  xs={12} sm={12} md={6}>
                                            <div style ={{position: "relative"}}>
                                                <h2 style={{textAlign:"center"}} >Entrada</h2>
                                            
                                                    {this.state.inputs.map((input, idx) => (
                                                                                        
                                                        <div className="input">
                                                            <div style={{padding:10}}></div>
                                                            <input style= {{border: "1px solid lightblue", width: "80%"}}
                                                                    type= "text"
                                                                    ref={c => this.refInputs.set(idx, c)} 
                                                                    placeholder={`Input #${idx + 1} name`}
                                                                    value={input.nameInput}
                                                                    onChange={this.handleTestCaseNameChange(idx)}
                                                            />
                                                            {this.state.toggle && this.checkFields(input.nameInput, "input",idx)}
                                                            
                                                        </div>
                                                    ))}


                                                </div>
                                                

                                            </Col>

                                            <Col  xs={12} sm={12} md={6}>
                                                <h2 style={{position: "relative", right: "10%", textAlign:"center"}} >Salida</h2>
                                                {this.state.outputs.map((output, idx) => (
                                                    
                                                        <div>
                                                        <Row>
                                                                <div style={{padding:10}}></div>
                                                                    <input style= {{border: "1px solid lightblue", width: "70%"}}
                                                                            type= "text"
                                                                            ref={c => this.refOutputs.set(idx, c)} 
                                                                            placeholder={`Output #${idx + 1} name`}
                                                                            value={output.nameOutput}
                                                                            onChange={this.handleTestCaseNameChange2(idx)}
                                                                    />
                                                                <Button   style= {{position: "relative", left: "5%"}}
                                                                        circular color='red' icon='delete'
                                                                        onClick={this.handleRemoveTestCase(idx)}
                                                                        >
                                                                </Button>
                                                            
                                                                

                                                            </Row>

                                                            {this.state.toggle && this.checkFields(output.nameOutput, "output",idx)} 
                                                        </div>
                                                    
                                                            

                                            
                                                        
                                                ))}
                                            
                                            </Col>
                                        </Row>
                                        <Divider/>
                                        <Button   color='blue' 
                                                  type='Void'
                                                  onClick={() => {
                                                      this.postTestCases();
                                                   
                                                    }}
                                                  >

                                                 Asociar al enunciado
                                                 
                                        </Button>
                                    

                                    </Form>
                                </Paper>

                            
                            
                    
                    </div>
                
                
            </MuiThemeProvider>

           <div className= "Modals">
                 <Modal show={this.state.showNewExercise}
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
                                        onClick={() => {
                                            this.props.history.push('/create_exercise')
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
        var input;
        var output;
        var opt1 = 0;
        var opt2 = 0;
        for(let i= 0;i<this.state.inputs.length;i++){

            input = this.state.inputs[i].nameInput.split(",");

            if(input[0] === "" || input[input.length - 1 ] === ""){
                opt1 = 4;
                break;
            }
            else if(lengthInput !== this.state.inputs[i].nameInput.split(",").length ){
                return 2;
            }
        }
        for(let i= 0;i<this.state.outputs.length;i++){
            output = this.state.outputs[i].nameOutput.split(",");

            if(output[0] === "" || output[output.length - 1 ] === ""){
                opt2 = 5;
                break;
            }
            else if(lengthOutput !== this.state.outputs[i].nameOutput.split(",").length ){
                return 3;
            }
        }
        if(opt1 !== 0 && opt1 !== 0){
            return 6;
        }
        else if(opt1 !== 0){
            return opt1;
        }
        else if(opt2 !== 0){
            return opt2;
        }
        return 7;
    }

    formatTestCases(type){
        var testcase = '';
        if(type === 0){
            for(let i = 0; i<this.state.inputs.length;i++){
                testcase = testcase.concat(this.state.inputs[i].nameInput).concat(',')
            }
        }
        else{

            for(let i = 0; i<this.state.outputs.length;i++){
                testcase = testcase.concat(this.state.outputs[i].nameOutput).concat(',')
            }
        }
        testcase = testcase.slice(0, testcase.length-1);
        console.log(testcase);
        return testcase;
    
    }


    postTestCases(){
        var checking = this.checkTestCases();
        if(checking === 0){
            alert('Debe agregar por lo menos un caso de prueba al enunciado')
            this.setState({toggle:true});
        }
        else if(checking === 1){
            alert('Existe o existen casos de pruebas con entradas o salidas vacias, por favor completar o eliminar el/los casos de prueba correspondientes')
            this.setState({toggle:true});
        }
        else if(checking === 2){
            alert('Existe o existen casos de pruebas con diferente numero de entradas, por favor completar o eliminar el/los casos de prueba correspondientes')
            
        }
        else if(checking === 3){
            alert('Existe o existen casos de pruebas con diferente numero de salidas, por favor completar o eliminar el/los casos de prueba correspondientes')
            
        }
        else if(checking === 4){
            alert('Existe o existen casos de pruebas con entradas que no cumplen el formato, por favor completar o eliminar el/los casos de prueba correspondientes')
            
        }
        else if(checking === 5){
            alert('Existe o existen casos de pruebas con salidas que no cumplen el formato, por favor completar o eliminar el/los casos de prueba correspondientes')
            
        }
        else if(checking === 6){
            alert('Existe o existen casos de pruebas con entradas y salidas que no cumplen el formato, por favor completar o eliminar el/los casos de prueba correspondientes')
            
        }
        else if(checking === 7){
            let axiosConfig = {
                 headers: {
                   'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "@crossorigin"
                }
            };
           
            for(let i = 0; i<this.state.inputs.length;i++){
                let newTestCase = {
                    input: this.state.inputs[i].nameInput,
                    output:this.state.outputs[i].nameOutput,
                }
                Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/create/'.concat(this.state.exerciseId.toString()),newTestCase,axiosConfig)
                .then((res) => {
                        console.log("RESPONSE RECEIVED: ", res);
                })
                    .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                }) 

            }
            this.handleShowNewExercise();

                
        }
    }
}

export default AddTestCasesForm;