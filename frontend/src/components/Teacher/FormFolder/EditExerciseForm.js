import React ,{Component} from 'react';
import { Form, TextArea,Button,Divider,Dimmer,Loader,Segment,Icon} from 'semantic-ui-react'
import Axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router-dom';
import {Modal,Row,Col,Popover,OverlayTrigger} from 'react-bootstrap'
const background = {
   mediumFrame1:{
      width: "80%",
      height: "80%",
      padding: "5%",
      position:'relative',
      left:"20%",
      border: "1px solid lightblue"
    },
    mediumFrame2:{
        width: "80%",
        height: "80%",
        padding: "5%",
        position:'relative',
        border: "1px solid lightblue"
    },
    textAreaStyle:{
      minHeight: 300,
      maxHeight: 300

    }
}
class EditExerciseForm extends Component{
       constructor(props) {
        super(props);

        this.refInputs = new Map();
        this.refOutputs = new Map();
        console.log("soy los props")
        console.log(props.location.state);
        
        //EDIT OR PUBLISH EXERCISE
        this.editExerciseChecking = this.editExerciseChecking.bind(this);
        this.editExerciseChecked = this.editExerciseChecked.bind(this);

        this.publishExercise = this.publishExercise.bind(this);
        //EDIT OR PUBLISH EXERCISE

        //FIELD UPDATES
        this.updateDescription = this.updateDescription.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateNameFunction= this.updateNameFunction.bind(this);
        //FIELD UPDATES

        //TESTCASE ACTIONS
        this.handleAddTestCase= this.handleAddTestCase.bind(this);
        this.handleRemoveTestCase= this.handleRemoveTestCase.bind(this);
        this.handleTestCaseNameChange= this.handleTestCaseNameChange.bind(this);
        this.handleTestCaseNameChange2= this.handleTestCaseNameChange2.bind(this);
        this.checkTestCases = this.checkTestCases.bind(this);
        //TESTCASE ACTIONS
        
        //INITIATION
        this.formatTestCasesView = this.formatTestCasesView.bind(this);
        this.saveTestCasesIds = this.saveTestCasesIds.bind(this);
        //INITIATION

        //FIELDS ACTIONS
        this.emptyFields = this.emptyFields.bind(this);
        this.checkFields = this.checkFields.bind(this);
        //FIELDS ACTIONS

        //MODALS
        this.handleShowPublish = this.handleShowPublish.bind(this);
        this.handleHidePublish = this.handleHidePublish.bind(this);

        this.handleShowConfirmation = this.handleShowConfirmation.bind(this);
        this.handleHideConfirmation = this.handleHideConfirmation.bind(this);


        this.handleShowErrorMessage = this.handleShowErrorMessage.bind(this);
        this.handleHideErrorMessage = this.handleHideErrorMessage.bind(this);
        //MODALS

        //LOADING SCREEN
        this.handleLoader = this.handleLoader.bind(this)

        //FORMAT FOR CODE
        this.popoverHoverFocus = this.popoverHoverFocus.bind(this)
        //FORMAT FOR CODE

      }
      state = {
        exercise: this.props.location.state,
        id:null,
        title: null,
        description: null,
        published: null,
        functionName:null,
        nameInput: '',
        inputs:null,
        nameOutput: '',
        outputs:null,
        testCasesIds: [],
        modalPublish:false,
        modalConfirmation:false,
        warningErrorMessage:false,
        isSafeToRender: false,
        checkErrors:false,
        errorMessage: "",
        loader:false

      }

      componentWillMount () {
        if(this.state.exercise === undefined){
            console.log(this.props.history);
            this.props.history.goBack();
        }
        else{
            this.setState({  
              id: this.state.exercise.editAExercise.id,
              title:this.state.exercise.editAExercise.title,
              description: this.state.exercise.editAExercise.description,
              published: this.state.exercise.editAExercise.published,
              functionName: this.state.exercise.editAExercise.functionName,
              inputs: this.formatTestCasesView(0),
              outputs: this.formatTestCasesView(1),
              testCasesIds:  this.saveTestCasesIds(),       
              isSafeToRender: true
            })
        }
    }



    formatTestCasesView(type){
        
        var inputs;
        var outputs;
        var inputsArray;
        var outputsArray;
        var oneInput;
        var oneOutput;
        if(type === 0){
            inputsArray= [];
            if( this.state.exercise.getTestCases[0] !== undefined &&
                this.state.exercise.getTestCases[0].input !== null){

                inputs = this.state.exercise.getTestCases;
                console.log(inputs);
               
                
                for(let i= 0;i<inputs.length;i++){
                    oneInput = this.state.exercise.getTestCases[i].input;
                    inputsArray.push({nameInput: oneInput })
                    
                }
            }
            else{
                inputsArray = []                
            }
            return inputsArray;
        }
        else{
            outputsArray= [];
            var boolean;
            if(this.state.exercise.getTestCases[0] !== undefined &&
                this.state.exercise.getTestCases[0].output !== null){

                outputs = this.state.exercise.getTestCases;
                for(let i= 0;i<outputs.length;i++){
                    oneOutput = this.state.exercise.getTestCases[i].output
                    //Ver si es numero
                    boolean = isNaN(oneOutput);
                    if(boolean){
                        //Debe ser un string, hay que agregarle las comillas para identificar que es un string
                        outputsArray.push({nameOutput: '"'+oneOutput+'"'})
                    }
                    else{
                        //Es un numero por lo que no lleva comillas
                        outputsArray.push({nameOutput: oneOutput})
                    }
                    
                    
                }
            }
            else{
                outputsArray =  []           
            }
            return outputsArray;
        }
    
    }
    saveTestCasesIds(){
        var testcases = this.state.exercise.getTestCases;
        console.log("son los testcases")
        console.log(testcases)
        console.log("este es su largo")
        console.log(testcases.length)
        var oneId;
        var testCaseIdArray = [];
        if(testcases.length !== 0){
            for(let i = 0; i< testcases.length;i++){
                oneId = testcases[i].id;
                testCaseIdArray.push(oneId)
            }
            console.log(testCaseIdArray)
            return testCaseIdArray;
        }
        else{
            return -1;
        }
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
      
    handleLoader(){
        this.setState({loader: !this.state.loader});
    }

    handleShowPublish() {
        this.setState({ modalPublish: true });
    }

    handleHidePublish() {
        this.setState({ modalPublish: false });
    }



    handleShowConfirmation() {
        this.setState({ modalConfirmation: true });
    }
  
    handleHideConfirmation() {
        this.setState({ modalConfirmation: false });
    }


    handleShowErrorMessage() {
        this.setState({ warningErrorMessage: true });
    }
    handleHideErrorMessage() {
        this.setState({ warningErrorMessage: false });
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


    editExerciseChecked(){
        console.log("este es el estado del loader ahora")
        console.log(this.state.loader)
        let jsonEditar = {
            title:this.state.title,
            description: this.state.description,
            functionName: this.state.functionName
        }
        
        var jsonEditarTestcases;
        var validOutput;
        var boolean;
        Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.id+'/edit', jsonEditar)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);                             
                //Si no habian casos de prueba al inicio, entonces hay que crearlos
                console.log("los testcases son:")
                console.log(this.state.testCasesIds)
                if(this.state.testCasesIds === -1){
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
                        Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/create/'.concat(this.state.id.toString()),newTestCase)
                            .then((res) => {
                                console.log("RESPONSE RECEIVED: ", res);
                                if(i === this.state.inputs.length -1){

                                    Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.id+'/testcases')
                                    .then(response => {
                                        console.log(response.data)
                                        console.log("estos son los id news")
                                        var testCasesArray = [];
                                        for(let i = 0; i< response.data.length; i++){
                                            testCasesArray.push(response.data[i].id)
                                        }
                                        this.setState({
                                            testCasesIds: testCasesArray
                                        });
                                        this.handleLoader();
                                        setTimeout(() => {
                                            this.handleShowConfirmation();      

                                        }, 5);

                                        
                                    })
                                    .catch((err) => {
                                        this.handleLoader();
                                        this.setState({errorMessage:"No se pudieron crear correctamente los casos de prueba, intente mas tarde"});
                                        setTimeout(() => {
                                            this.handleShowErrorMessage();
                                            return;
                                        }, 5);
                                    });
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
                // Se modifican los existentes casos de prueba
                else if(this.state.inputs.length === this.state.testCasesIds.length){

                    for(let i= 0; i<this.state.inputs.length;i++){
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

                        jsonEditarTestcases ={
                            input: this.state.inputs[i].nameInput,
                            output: validOutput  
                        }
                            
                        Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/'+this.state.testCasesIds[i]+'/edit',jsonEditarTestcases)
                        .then((res) => {
                            console.log("RESPONSE RECEIVED: ", res);
                            if(i === this.state.inputs.length -1){

                                Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.id+'/testcases')
                                    .then(response => {
                                        console.log(response.data)
                                        console.log("estos son los id news")
                                        var testCasesArray = [];
                                        for(let i = 0; i< response.data.length; i++){
                                            testCasesArray.push(response.data[i].id)
                                        }
                                        this.setState({
                                            testCasesIds: testCasesArray
                                        });
                                        this.handleLoader();
                                        setTimeout(() => {
                                            this.handleShowConfirmation();      

                                        }, 5);
                                                                                    
                                        
                                        
                                    })
                                    .catch((err) => {
                                        this.handleLoader();
                                        this.setState({errorMessage:"No se pudieron editar correctamente los casos de prueba, intente mas tarde"});
                                        setTimeout(() => {
                                            this.handleShowErrorMessage();
                                            return;
                                        }, 5);
                                    });
                            }
                                                            

                        })
                        .catch((err) => {
                            this.handleLoader();
                            this.setState({errorMessage:"No se pudieron editar correctamente los casos de prueba, intente mas tarde"});
                            setTimeout(() => {
                                this.handleShowErrorMessage();
                                return;
                            }, 5);
                        });

                    }


                }

                //Se agregaron mas casos de pruebas que los que habian 
                else if(this.state.inputs.length > this.state.testCasesIds.length){
                    for(let i= 0; i<this.state.inputs.length;i++){
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
                            if(i<this.state.testCasesIds.length){
                                jsonEditarTestcases ={
                                    input: this.state.inputs[i].nameInput,
                                    output: validOutput   
                                }
                                console.log("va a ingresarsss");
                                console.log(jsonEditarTestcases)
                                    
                                Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/'+this.state.testCasesIds[i]+'/edit',jsonEditarTestcases)
                                    .then((res) => {
                                        console.log("RESPONSE RECEIVED: ", res);
                                        
                                                                        

                                    })
                                    .catch((err) => {
                                        this.handleLoader();
                                        this.setState({errorMessage:"No se pudieron editar correctamente los casos de prueba, intente mas tarde"});
                                        setTimeout(() => {
                                            this.handleShowErrorMessage();
                                            return;
                                        }, 5);
                                    });

                                }
                            else{
                                    jsonEditarTestcases ={
                                        input: this.state.inputs[i].nameInput,
                                        output: validOutput    
                                    }
                                    Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/create/'.concat(this.state.id.toString()),jsonEditarTestcases)
                                    .then((res) => {
                                            console.log("RESPONSE RECEIVED: ", res);
                                            if(i === this.state.inputs.length -1){

                                                Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.id+'/testcases')
                                                .then(response => {
                                                    console.log(response.data)
                                                    console.log("estos son los id news")
                                                    var testCasesArray = [];
                                                    for(let i = 0; i< response.data.length; i++){
                                                        testCasesArray.push(response.data[i].id)
                                                    }
                                                    this.setState({
                                                        testCasesIds: testCasesArray
                                                    });
                                                    this.handleLoader();
                                                    setTimeout(() => {
                                                        this.handleShowConfirmation();      
            
                                                    }, 5);
                                                                                                
                                                    
                                                    
                                                })
                                                .catch((err) => {
                                                    this.handleLoader();
                                                    this.setState({errorMessage:"No se pudieron editar correctamente los casos de prueba, intente mas tarde"});
                                                    setTimeout(() => {
                                                        this.handleShowErrorMessage();
                                                        return;
                                                    }, 5);
                                                });
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
                //Se borraron casos de prueba pero se dejo por lo menos 1
                else if(this.state.inputs.length !== 0 &&  
                        this.state.inputs.length < this.state.testCasesIds.length){
                                console.log("estos son los inputs ahora:")
                                console.log(this.state.inputs);
                                console.log("estos son los testcasesids antiguos")
                                console.log(this.state.testCasesIds)

                                
                                for(let i= 0; i<this.state.testCasesIds.length;i++){
                                    
                                        //Se ha eliminado uno o mas casos de prueba en comparacion al original
                                        //Ver si es numero
                                        
                                    
                                        if(i<this.state.inputs.length){
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
                                            jsonEditarTestcases ={
                                                input: this.state.inputs[i].nameInput,
                                                output: validOutput 
                                            }
                                            console.log("va a ingresar");
                                            console.log(jsonEditarTestcases)
                                                
                                            Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/'+this.state.testCasesIds[i]+'/edit',jsonEditarTestcases)
                                                .then((res) => {
                                                    console.log("RESPONSE RECEIVED: ", res);
                                        
                                                })
                                                .catch((err) => {
                                                    this.handleLoader();
                                                    this.setState({errorMessage:"No se pudieron editar correctamente los casos de prueba, intente mas tarde"});
                                                    setTimeout(() => {
                                                        this.handleShowErrorMessage();
                                                        return;
                                                    }, 5);
                                                });
                                        }
                                        else{
                                                
                                            Axios.delete('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/'+this.state.testCasesIds[i]+'/delete')
                                                .then((res) => {
                                                    console.log("RESPONSE RECEIVED: ", res);
                                                    if(i === this.state.testCasesIds.length -1){

                                                        Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.id+'/testcases')
                                                        .then(response => {
                                                            console.log(response.data)
                                                            console.log("estos son los id news")
                                                            var testCasesArray = [];
                                                            for(let i = 0; i< response.data.length; i++){
                                                                testCasesArray.push(response.data[i].id)
                                                            }
                                                            this.setState({
                                                                testCasesIds: testCasesArray
                                                            });
                                                            this.handleLoader();
                                                            setTimeout(() => {
                                                                this.handleShowConfirmation();      

                                                            }, 5);    
                                                                                                                
                                                            
                                                            
                                                        })
                                                        .catch((err) => {
                                                            this.handleLoader();
                                                            this.setState({errorMessage:"No se pudieron eliminar correctamente los casos de prueba, intente mas tarde"});
                                                            setTimeout(() => {
                                                                this.handleShowErrorMessage();
                                                                return;
                                                            }, 5);
                                                        });
                                                    }
                                        
                                                })
                                                .catch((err) => {
                                                    this.handleLoader();
                                                    this.setState({errorMessage:"No se pudieron eliminar correctamente los casos de prueba, intente mas tarde"});
                                                    setTimeout(() => {
                                                        this.handleShowErrorMessage();
                                                        return;
                                                    }, 5);
                                                });
                                                
                                        }
                                                
                                        
    
                                }

                
                }
                //Habian casos de prueba pero se borraron todos
                else if(this.state.inputs.length === 0){
                    for(let i= 0; i<this.state.testCasesIds.length;i++){
                        
                            Axios.delete('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/'+this.state.testCasesIds[i]+'/delete')
                                .then((res) => {
                                    console.log("RESPONSE RECEIVED: ", res);
                                    if(i === this.state.testCasesIds.length -1){

                                            this.setState({
                                                testCasesIds: []
                                            });
                                            this.handleLoader();
                                            setTimeout(() => {
                                                this.handleShowConfirmation();      

                                            }, 5);   

                                            
                                    
                                    }
                            
                                })
                                .catch((err) => {
                                    this.handleLoader();
                                    this.setState({errorMessage:"No se pudieron eliminar correctamente los casos de prueba, intente mas tarde"});
                                    setTimeout(() => {
                                        this.handleShowErrorMessage();
                                        return;
                                    }, 5);
                                });
                                
                    }

                

                }
                //Si existe algun caso de prueba, se editan

            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                this.handleLoader();
                this.setState({errorMessage:"No se pudo editar correctamente el contenido del enunciado, intente mas tarde"});
                setTimeout(() => {
                    this.handleShowErrorMessage();
                }, 5);

            })
                
    }

    editExerciseChecking(){
        if(this.state.title.length !== 0 &&
            this.state.description.length !== 0 &&
                this.state.functionName.length !== 0){
                        var checking = this.checkTestCases();
                        
                        if(checking === 1){
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
                        else if(checking === 0 || checking === 7){
                            this.handleLoader()
                            setTimeout(() => {
                                this.editExerciseChecked();
                            }, 5);
                                    
                                    
                        }

                        else if(checking === 8){
                            this.setState({errorMessage:'Existe o existen casos de pruebas con entradas que no cumplen el formato, por favor ajustar o eliminar el/las entradas correspondientes'});

                        }
                        else if(checking === 9){
                            this.setState({errorMessage:'Existe o existen casos de pruebas con salidas que no cumplen el formato, por favor ajustar o eliminar el/las salidas correspondientes'});
    
                        }
                        if(checking !== 7 && checking !== 0){
                            this.handleShowErrorMessage();
                           
                        }
                  
              
            }
            else{
                this.setState({checkErrors:true, errorMessage:'Existen campos obligatorios sin completar, porfavor completelos'});
                setTimeout(() => {
                    this.handleShowErrorMessage();
                }, 5);
                        
            
            }
          
    }
    


    publishExercise =  () => {
        let jsonAgregarPublish = {
          published:true
        }
        let jsonAgregarEdit = {
          title:this.state.title,
          description: this.state.description,
          functionName: this.state.functionName
        }
        
        if(this.state.title.length !== 0 &&
              this.state.description.length !== 0 && 
                 this.state.functionName.length !== 0){
                    var checking = this.checkTestCases();
                    if(checking === 0){  
                        this.handleHidePublish();      
                        this.setState({checkErrors:true, errorMessage:'Debe agregar por lo menos un caso de prueba al enunciado para poder publicarlo'});
                
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

                    else if(checking === 8){
                        this.setState({errorMessage:'Existe o existen casos de pruebas con entradas que no cumplen el formato, por favor ajustar o eliminar el/las entradas correspondientes'});

                    }

                    else if(checking === 9){
                        this.setState({errorMessage:'Existe o existen casos de pruebas con salidas que no cumplen el formato, por favor ajustar o eliminar el/las salidas correspondientes'});

                    }
                    else if(checking === 7){
                        var boolean;
                        var validOutput
                        Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.id+'/edit', jsonAgregarEdit)
                        .then((res) => {

                            Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.id+'/publish',jsonAgregarPublish)
                            .then((res) => {
                                console.log("RESPONSE RECEIVED: ", res); 
                 
                                var jsonEditarTestcases;
                                //Si no habian casos de prueba al inicio, entonces hay que crearlos
                                if(this.state.testCasesIds === -1){
                                    for(let i = 0; i<this.state.inputs.length;i++){
                                        //Ver si es numeropublish
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
                                        Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/create/'.concat(this.state.id.toString()),newTestCase)
                                            .then((res) => {
                                                console.log("RESPONSE RECEIVED: ", res);
                                                if(i === this.state.inputs.length -1){                          
                                                    this.props.history.push('/published_exercises_teacher');
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
                                //Se agregaron mas casos de pruebas que los que habian || Se modifica el que estaba
                                else if(this.state.inputs.length >= this.state.testCasesIds.length){
                                    for(let i= 0; i<this.state.inputs.length;i++){
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
                                            if(i<this.state.testCasesIds.length){
                                                    jsonEditarTestcases ={
                                                        input: this.state.inputs[i].nameInput,
                                                        output: validOutput   
                                                    }
                                                    console.log("va a ingresar");
                                                    console.log(jsonEditarTestcases)
                                                        
                                                    Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/'+this.state.testCasesIds[i]+'/edit',jsonEditarTestcases)
                                                        .then((res) => {
                                                                console.log("RESPONSE RECEIVED: ", res);
                                                                if(this.state.inputs.length === this.state.testCasesIds.length){
                                                                                           
                                                                    this.props.history.push('/published_exercises_teacher');
                                                                }
                                                        })
                                                        .catch((err) => {
                                                            this.handleLoader();
                                                            this.setState({errorMessage:"No se pudieron editar correctamente los casos de prueba, intente mas tarde"});
                                                            setTimeout(() => {
                                                                this.handleShowErrorMessage();
                                                                return;
                                                            }, 5);
                                                        });
                
                                            }
                                            else{
                                                    jsonEditarTestcases ={
                                                        input: this.state.inputs[i].nameInput,
                                                        output: validOutput   
                                                    }
                                                    Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/create/'.concat(this.state.id.toString()),jsonEditarTestcases)
                                                        .then((res) => {
                                                            console.log("RESPONSE RECEIVED: ", res);
                                                            if(i === this.state.inputs.length -1){
                          
                                                                this.props.history.push('/published_exercises_teacher');
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
                                //Se borraron casos de prueba pero se dejo por lo menos 1
                                else if(this.state.inputs.length !== 0 &&  
                                        this.state.inputs.length < this.state.testCasesIds.length){
                                    
                                    for(let i= 0; i<this.state.testCasesIds.length;i++){
                                            //Se ha eliminado uno o mas casos de prueba en comparacion al original
                                             
                                            if(i<this.state.inputs.length){
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
                                                    jsonEditarTestcases ={
                                                    input: this.state.inputs[i].nameInput,
                                                    output:validOutput  
                                                }
                                                    
                                                Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/'+this.state.testCasesIds[i]+'/edit',jsonEditarTestcases)
                                                    .then((res) => {
                                                            console.log("RESPONSE RECEIVED: ", res);
                                            
                                                    })
                                                    .catch((err) => {
                                                            this.handleLoader();
                                                            this.setState({errorMessage:"No se pudieron editar correctamente los casos de prueba, intente mas tarde"});
                                                            setTimeout(() => {
                                                                this.handleShowErrorMessage();
                                                                return;
                                                            }, 5);
                                                    });
                                            }
                                            else{
                                                    
                                                Axios.delete('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/'+this.state.testCasesIds[i]+'/delete')
                                                    .then((res) => {
                                                            console.log("RESPONSE RECEIVED: ", res);

                                                            if(i === this.state.testCasesIds.length -1){               
                                                                this.props.history.push('/published_exercises_teacher');
                                                             }
                                            
                                                    })
                                                    .catch((err) => {
                                                            this.handleLoader();
                                                            this.setState({errorMessage:"No se pudieron eliminar correctamente los casos de prueba, intente mas tarde"});
                                                            setTimeout(() => {
                                                                this.handleShowErrorMessage();
                                                                return;
                                                            }, 5);
                                                    });
                                                    
                                            }
                                                        
                                            
            
                                    }
                                }
  
                             
                        
                            })
                            .catch((err) => {
                                this.handleLoader();
                                this.setState({errorMessage:"No se pudo publicar el enunciado correctamente, intente mas tarde"});
                                setTimeout(() => {
                                    this.handleShowErrorMessage();
                                }, 5);

                            });
                            
        
                        })
                        .catch((err) => {
                            this.handleLoader();
                            this.setState({errorMessage:"No se pudo editar correctamente el contenido del enunciado, intente mas tarde"});
                            setTimeout(() => {
                                this.handleShowErrorMessage();
                            }, 5);

                        })
                       
                    }
                    if(checking !== 7){

                        this.handleHidePublish();
                        setTimeout(() => {
                            this.handleShowErrorMessage();
                       }, 1);
                    }
            
           
        }
        else{
            this.setState({checkErrors:true, errorMessage:'Existen campos obligatorios sin completar, porfavor completelos'});
            setTimeout(() => {
                this.handleShowErrorMessage();
            }, 5);
        }
       
       
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
      emptyFields () {
        this.setState({ 
          title: "",
          description: "",
          functionName: ""
        })
      }
      checkFields(field,fieldName,refNumber){
       
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
                     
                 case "input":
                     setTimeout(() => {
                         this.refInputs.get(refNumber).style.border = "1px solid red";
                     }, 1);
                  //   if(exists) 
                     break;
                 case "output":
                     setTimeout(() => {
                         this.refOutputs.get(refNumber).style.border = "1px solid red"; 
                     }, 1);
                 //    if(exists)                   
                     break;
                 default:
                     break;
             }
             
         }
     }
    
    
      render() {
        let { title, description,functionName} = this.state
        return (
          <div className= 'WholeComponent'>

          {this.state.isSafeToRender &&
              <div className = 'SafeComponent'>
                    <Segment>

                        <Dimmer active={this.state.loader} inverted>
                            <Loader inverted content='Editando enunciado...' />
                        </Dimmer>

                        <MuiThemeProvider muiTheme={ThemeDefault}>  
                        <div className= "Forms">
                            <h1 style={{textAlign:"center"}} >Edicion Enunciado</h1>
                            <div style={{padding:10}}></div>
                            <Row>
                                <Col  xs={12} sm={12} md={6}>
                                    <Paper style={background.mediumFrame1}>
                                        <Form style={{textAlign:"center"}}>
                                        <h1 style={{textAlign:"center"}} >Contenido</h1>
                                            <Form.Field>
                                              <label>Titulo del enunciado</label>
                                              <input  placeholder='Title' 
                                                      value= {title} 
                                                      ref = "title"
                                                      onChange={this.updateTitle} 
                                                      style={{  textAlign:"center"}}
                                                      onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                      />
                                            {this.state.checkErrors && this.checkFields(title, "title",null)}
                                            </Form.Field>
                                           
                                            <Form.Field>
                                            <label>Nombre de la funcion principal:</label>
                                                <input  placeholder='Funcion' 
                                                        value= {functionName} 
                                                        ref = "functionName"
                                                        onChange={this.updateNameFunction} 
                                                        style={{  textAlign:"center"}}
                                                        onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}
                                                        />
                                            {this.state.checkErrors && this.checkFields(functionName, "functionName",null)}

                                            </Form.Field>

                                            <label>Descripcion</label>
                                            <TextArea   placeholder='Descripcion'
                                                        style={{minHeight: 300,maxHeight: 300}}
                                                        ref = "description"
                                                        value= {description} 
                                                        onChange={this.updateDescription}

                                                        />  
                                            {this.state.checkErrors && this.checkFields(description, "description",null)}

                                            <Divider />

                                            <Button  floated= {'left'} 
                                                    color='red' 
                                                    type='Empty'
                                                    onClick={this.emptyFields}
                                                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                    >

                                                    Vaciar
                                          </Button>
                                          <Link to={{
                                                pathname: '/unpublished_exercises_teacher'
                                            }}>
                                                <Button floated= {'left'}
                                                        primary={true} 
                                                        type='Back'
                                                        onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                        
                                                        >
                                                        Volver
                                                </Button>
                                            </Link>
                                            <Button floated= {'right'} 
                                                    primary={true} 
                                                    type='Editar'
                                                    onClick={() => {                                  
                                                        this.editExerciseChecking();
                                                    }}
                                                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                    >
                                                    Modificar
                                            </Button>
                                            <Button  floated= {'right'} 
                                                      color='yellow' 
                                                      type='Publish'
                                                      onClick= {this.handleShowPublish}
                                                      onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                      >
                                                      Publicar
                                            </Button>
                                            <div style={{padding:6}}></div>
                                        </Form>

                                    </Paper>
                                </Col>
                          

                                <Col  xs={12} sm={12} md={6}>
                                    <Paper style={background.mediumFrame2}>
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
                                                                              >
                                                                      </Button>
                                                                    
                                                                      
          
                                                                  </Row>
          
                                                                    {this.state.checkErrors && this.checkFields(output.nameOutput, "output",idx)} 
                                                              </div>
                                                           
                                                                
                                                      ))}
                                                  
                                                  </Col>
                                              </Row>
                                            

                                          </Form>
                                      </Paper>


                        
                                </Col>
                                     
                             </Row>
                        </div>
                          
                          
                        
                        </MuiThemeProvider>
                    </Segment>
                  
                     
                      
                    
                    <div className= "UsedModals"> 
                         <Modal show={this.state.modalPublish}
                            bsSize="small">  

                                  <Modal.Header >
                                    <Modal.Title>Precaución</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body >
                                        <p >
                                          Esta seguro de publicar este enunciado? 
                                        </p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button  floated= {'left'} 
                                                  color='red' 
                                                  type='Negation'
                                                  onClick= {this.handleHidePublish}
                                                  onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                  >
                                                  No
                                        </Button>
                                          <Button  floated= {'right'} 
                                                  color='blue' 
                                                  type='Positive'
                                                  onClick={() => {                                                        
                                                    this.publishExercise();
                                                  }}
                                                  onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                  >
                                                  Si
                                          </Button>
                                    </Modal.Footer>

                        </Modal>
                        <Modal show={this.state.modalConfirmation}
                            bsSize="small">  

                                  <Modal.Header >
                                    <Modal.Title style= {{textAlign: "center"}}>Exito!</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body >
                                        <p >
                                        Se ha modificado sadisfactoriamente el enunciado 
                                        </p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                          <Button  
                                                  color='blue' 
                                                  type='Positive'
                                                  onClick={this.handleHideConfirmation}
                                                  onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                  >
                                                  OK
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
          
          
          
          }

             
        </div>
          
          
  
        );
        
      }
}

export default EditExerciseForm;

