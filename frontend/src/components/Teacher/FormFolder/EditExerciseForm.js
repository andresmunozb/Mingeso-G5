import React ,{Component} from 'react';
import { Form, TextArea,Button,Divider} from 'semantic-ui-react'
import Axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router-dom';
import {Modal,Row,Col} from 'react-bootstrap'
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
        this.keys1 = 0;
        this.keys2 = 0;
        console.log("soy los props")
        console.log(props.location.state);
        
        //EDIT OR PUBLISH EXERCISE
        this.editExercise = this.editExercise.bind(this);
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
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        this.handleShowConfirmation = this.handleShowConfirmation.bind(this);
        this.handleHideConfirmation = this.handleHideConfirmation.bind(this);
        //MODALS

        //DISABLE BUTTONS
        this.handleDisableButton = this.handleDisableButton.bind(this);
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
        isSafeToRender: false,
        toggle:false,
        disableButton: false

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
              isSafeToRender: true,
              disableButton:false

            })
        }
    }

    handleDisableButton() {
        console.log("el botons: ",this.state.disableButton)
        this.setState({ disableButton: !this.state.disableButton });
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
            if(this.state.exercise.getTestCases[0] !== undefined &&
                this.state.exercise.getTestCases[0].output !== null){

                outputs = this.state.exercise.getTestCases;
                for(let i= 0;i<outputs.length;i++){
                    oneOutput = this.state.exercise.getTestCases[i].output
                    outputsArray.push({nameOutput: oneOutput})
                    
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
      

        handleShow() {
          this.setState({ modalPublish: true });
        }

        handleHide() {
          this.setState({ modalPublish: false });
        }

        handleShowConfirmation() {
            this.setState({ modalConfirmation: true });
          }
  
          handleHideConfirmation() {
            this.setState({ modalConfirmation: false });
          }


      editExercise(){
        console.log("este es el boton: ",this.state.disableButton)
        if(this.state.title.length !== 0 &&
            this.state.description.length !== 0 &&
                this.state.functionName.length !== 0){
                        var checking = this.checkTestCases();
                        
                        if(checking === 1){
                            alert('Existe o existen casos de pruebas con entradas o salidas vacias, por favor completar o eliminar el/los casos de prueba correspondientes')
                            this.setState({toggle:true, disableButton: false});
                        }
                        else if(checking === 2){
                            alert('Existe o existen casos de pruebas con diferente numero de entradas, por favor completar o eliminar el/los casos de prueba correspondientes')
                            
                            this.setState({ disableButton: false});
                        }
                        else if(checking === 3){
                            alert('Existe o existen casos de pruebas con diferente numero de salidas, por favor completar o eliminar el/los casos de prueba correspondientes')
                            
                            this.setState({ disableButton: false});
                        }
                        else if(checking === 4){
                            alert('Existe o existen casos de pruebas con entradas que no cumplen el formato, por favor completar o eliminar el/los casos de prueba correspondientes')
                            
                            this.setState({ disableButton: false});
                        }
                        else if(checking === 5){
                            alert('Existe o existen casos de pruebas con salidas que no cumplen el formato, por favor completar o eliminar el/los casos de prueba correspondientes')
                            
                            this.setState({ disableButton: false});
                        }
                        else if(checking === 6){
                            alert('Existe o existen casos de pruebas con entradas y salidas que no cumplen el formato, por favor completar o eliminar el/los casos de prueba correspondientes')
                            
                            this.setState({ disableButton: false});
                        }
                        else if(checking === 0 || checking === 7){
                              let jsonAgregar = {
                                title:this.state.title,
                                description: this.state.description,
                                functionName: this.state.functionName
            
                              }
                            
                              var jsonEditarTestcases;
                              
                              Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.id+'/edit', jsonAgregar)
                              .then((res) => {
                                    console.log("RESPONSE RECEIVED: ", res);                             
                                    //Si no habian casos de prueba al inicio, entonces hay que crearlos
                                    console.log("los testcases son:")
                                    console.log(this.state.testCasesIds)
                                    if(this.state.testCasesIds === -1){
                                        for(let i = 0; i<this.state.inputs.length;i++){
                                            let newTestCase = {
                                                input: this.state.inputs[i].nameInput,
                                                output:this.state.outputs[i].nameOutput,
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
                                                            this.handleShowConfirmation();      
                                                            this.setState({ disableButton: false});      

                                                            
                                                        })
                                                        .catch((err) => {
                                                            console.log("AXIOS ERROR: ", err);
                                                        });
                                                    }
                                            })
                                                .catch((err) => {
                                                    console.log("AXIOS ERROR: ", err);
                                            }) 
                            
                                        }
                                        
                                    }
                                    //Se agregaron mas casos de pruebas que los que habian || se modifica solo uno
                                    else if(this.state.inputs.length >= this.state.testCasesIds.length){
                                        for(let i= 0; i<this.state.inputs.length;i++){

                                            
                                                if(i<this.state.testCasesIds.length){
                                                    jsonEditarTestcases ={
                                                        input: this.state.inputs[i].nameInput,
                                                        output: this.state.outputs[i].nameOutput    
                                                    }
                                                    console.log("va a ingresarsss");
                                                    console.log(jsonEditarTestcases)
                                                        
                                                    Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/'+this.state.testCasesIds[i]+'/edit',jsonEditarTestcases)
                                                        .then((res) => {
                                                            console.log("RESPONSE RECEIVED: ", res);
                                                            this.handleShowConfirmation();
                                                                                            
                                                            this.setState({ disableButton: false});      

                                                        })
                                                        .catch((err) => {
                                                            console.log("AXIOS ERROR: ", err);
                                                        });
                
                                                    }
                                                else{
                                                        jsonEditarTestcases ={
                                                            input: this.state.inputs[i].nameInput,
                                                            output: this.state.outputs[i].nameOutput    
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
                                                                        this.handleShowConfirmation();    
                                                                                                                    
                                                                        this.setState({ disableButton: false}); 
                                                                        
                                                                        
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log("AXIOS ERROR: ", err);
                                                                    });
                                                                }
                                                        })
                                                            .catch((err) => {
                                                                console.log("AXIOS ERROR: ", err);
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
                                                        
                                                            if(i<this.state.inputs.length){
                                                                jsonEditarTestcases ={
                                                                    input: this.state.inputs[i].nameInput,
                                                                    output: this.state.outputs[i].nameOutput    
                                                                }
                                                                console.log("va a ingresar");
                                                                console.log(jsonEditarTestcases)
                                                                    
                                                                Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/'+this.state.testCasesIds[i]+'/edit',jsonEditarTestcases)
                                                                    .then((res) => {
                                                                        console.log("RESPONSE RECEIVED: ", res);
                                                            
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log("AXIOS ERROR: ", err);
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
                                                                                this.handleShowConfirmation();     
                                                                                                                                    
                                                                                this.setState({ disableButton: false}); 
                                                                                
                                                                                
                                                                            })
                                                                            .catch((err) => {
                                                                                console.log("AXIOS ERROR: ", err);
                                                                            });
                                                                        }
                                                            
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log("AXIOS ERROR: ", err);
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
                                                                this.handleShowConfirmation();      

                                                                this.setState({ disableButton: false});
                                                                
                                                        
                                                        }
                                                
                                                    })
                                                    .catch((err) => {
                                                        console.log("AXIOS ERROR: ", err);
                                                    });
                                                    
                                        }

                                    

                                    }
                                    //Si existe algun caso de prueba, se editan
                    
                                    })
                                .catch((err) => {
                                    console.log("AXIOS ERROR: ", err);
                                    alert("No se pudo editar correctamente el enunciado, intente mas tarde")
                    
                                })
                                    
                                    
                            }
                  
              
                        }
              else{
                alert('Existen campos obligatorios sin completar, porfavor completelos');
                this.setState({toggle:true, disableButton: false});
            
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
                        alert('Debe agregar por lo menos un caso de prueba al enunciado para poder publicarlo')
                        this.handleHide();
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

                        Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.id+'/edit', jsonAgregarEdit)
                        .then((res) => {

                            Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.id+'/publish',jsonAgregarPublish)
                            .then((res) => {
                                console.log("RESPONSE RECEIVED: ", res); 
                 
                                var jsonEditarTestcases;
                                //Si no habian casos de prueba al inicio, entonces hay que crearlos
                                if(this.state.testCasesIds === -1){
                                    for(let i = 0; i<this.state.inputs.length;i++){
                                        let newTestCase = {
                                            input: this.state.inputs[i].nameInput,
                                            output:this.state.outputs[i].nameOutput,
                                        }
                                        Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/create/'.concat(this.state.id.toString()),newTestCase)
                                        .then((res) => {
                                                console.log("RESPONSE RECEIVED: ", res);
                                                if(i === this.state.inputs.length -1){
                                                    this.handleHide();
                                                    this.handleShowConfirmation();                            
                                                    this.props.history.push('/published_exercises_teacher');
                                                }
                                        })
                                            .catch((err) => {
                                                console.log("AXIOS ERROR: ", err);
                                        }) 
                        
                                    }
    
                                
    
                                }
                                //Se agregaron mas casos de pruebas que los que habian || Se modifica el que estaba
                                else if(this.state.inputs.length >= this.state.testCasesIds.length){
                                    for(let i= 0; i<this.state.inputs.length;i++){
        
                                        
                                            if(i<this.state.testCasesIds.length){
                                                    jsonEditarTestcases ={
                                                        input: this.state.inputs[i].nameInput,
                                                        output: this.state.outputs[i].nameOutput    
                                                    }
                                                    console.log("va a ingresar");
                                                    console.log(jsonEditarTestcases)
                                                        
                                                    Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/'+this.state.testCasesIds[i]+'/edit',jsonEditarTestcases)
                                                        .then((res) => {
                                                                console.log("RESPONSE RECEIVED: ", res);
                                                                if(this.state.inputs.length === this.state.testCasesIds){
                                                                    this.handleHide();
                                                                    this.handleShowConfirmation();                            
                                                                    this.props.history.push('/published_exercises_teacher');
                                                                }
                                                            })
                                                        .catch((err) => {
                                                                console.log("AXIOS ERROR: ", err);
                                                            });
                
                                            }
                                            else{
                                                    jsonEditarTestcases ={
                                                        input: this.state.inputs[i].nameInput,
                                                        output: this.state.outputs[i].nameOutput    
                                                    }
                                                    Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/create/'.concat(this.state.id.toString()),jsonEditarTestcases)
                                                    .then((res) => {
                                                            console.log("RESPONSE RECEIVED: ", res);
                                                            if(i === this.state.inputs.length -1){

                                                                this.handleHide();
                                                                this.handleShowConfirmation();                            
                                                                this.props.history.push('/published_exercises_teacher');
                                                            }
                                                    })
                                                        .catch((err) => {
                                                            console.log("AXIOS ERROR: ", err);
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
                                                jsonEditarTestcases ={
                                                    input: this.state.inputs[i].nameInput,
                                                    output: this.state.outputs[i].nameOutput    
                                                }
                                                    
                                                Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/'+this.state.testCasesIds[i]+'/edit',jsonEditarTestcases)
                                                    .then((res) => {
                                                            console.log("RESPONSE RECEIVED: ", res);
                                            
                                                        })
                                                    .catch((err) => {
                                                            console.log("AXIOS ERROR: ", err);
                                                        });
                                            }
                                            else{
                                                    
                                                Axios.delete('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/testcases/'+this.state.testCasesIds[i]+'/delete')
                                                    .then((res) => {
                                                            console.log("RESPONSE RECEIVED: ", res);

                                                            if(i === this.state.testCasesIds.length -1){
    
                                                          
                                                                this.handleHide();
                                                                this.handleShowConfirmation();                            
                                                                this.props.history.push('/published_exercises_teacher');
                                                             }
                                            
                                                        })
                                                    .catch((err) => {
                                                            console.log("AXIOS ERROR: ", err);
                                                        });
                                                    
                                            }
                                                        
                                            
            
                                    }
                                }
  
                             
                        
                            })
                            .catch((err) => {
                                console.log("AXIOS ERROR: ", err);
                                alert("No se pudo publicar correctamente el enunciado, intente mas tarde")

                            });
                            
        
                        })
                        .catch((err) => {
                            console.log("AXIOS ERROR: ", err);
                            alert("No se pudo editar correctamente el enunciado, intente mas tarde")

                        })
                       
                    }
                    this.handleHide();
            
           
        }
        else{
          this.handleHide();
          alert('Existen campos obligatorios sin completar, porfavor completelos');
          this.setState({toggle:true});
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
      emptyFields () {
        this.setState({ 
          title: "",
          description: "",
          functionName: ""
        })
      }
      checkFields(field,fieldName,refNumber){
        /* var exists = false;
         if(this.refInputs.get(refNumber) !== undefined &&
                 this.refInputs.get(refNumber) !== null) exists = true;*/
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
                                                      />
                                            {this.state.toggle && this.checkFields(title, "title",null)}
                                            </Form.Field>
                                            <Form.Field>
                                            <label>Nombre de la funcion principal:</label>
                                                <input  placeholder='Funcion' 
                                                        value= {functionName} 
                                                        ref = "functionName"
                                                        onChange={this.updateNameFunction} 
                                                        style={{  textAlign:"center"}}/>
                                            {this.state.toggle && this.checkFields(functionName, "functionName",null)}

                                            </Form.Field>

                                            <label>Descripcion</label>
                                            <TextArea   placeholder='Descripcion'
                                                        style={{minHeight: 300,maxHeight: 300}}
                                                        ref = "description"
                                                        value= {description} 
                                                        onChange={this.updateDescription}
                                                        />  
                                            {this.state.toggle && this.checkFields(description, "description",null)}

                                            <Divider />

                                            <Button  floated= {'left'} 
                                                    color='red' 
                                                    type='Empty'
                                                    disabled= {this.state.disableButton}
                                                    onClick={this.emptyFields}
                                                    >

                                                    Vaciar
                                          </Button>
                                          <Link to={{
                                                pathname: '/unpublished_exercises_teacher'
                                            }}>
                                                <Button floated= {'left'}
                                                        primary={true} 
                                                        disabled= {this.state.disableButton}
                                                        type='Back'>
                                                        Volver
                                                </Button>
                                            </Link>
                                            <Button floated= {'right'} 
                                                    primary={true} 
                                                    type='Editar'
                                                    onClick={() => {
                                                        this.handleDisableButton();
                                                        setTimeout(() => {                                                            
                                                          this.editExercise();
                                                        }, 1);
                                                    }}
                                                    disabled= {this.state.disableButton}
                                                    >
                                                    Modificar
                                            </Button>
                                            <Button  floated= {'right'} 
                                                      color='yellow' 
                                                      type='Publish'
                                                      onClick= {this.handleShow}

                                                    disabled= {this.state.disableButton}
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
                                                                                              
                                                              <div className="input" key = {this.keys1++}>
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
                                                                 <div key = {this.keys2++}>
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
                                            

                                          </Form>
                                      </Paper>


                        
                                </Col>
                                     
                             </Row>
                        </div>
                          
                          
                        
                        </MuiThemeProvider>
                      
                    
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
                                                  onClick= {this.handleHide}
                                                  >
                                                  No
                                        </Button>
                                          <Button  floated= {'right'} 
                                                  color='blue' 
                                                  type='Positive'
                                                  onClick={this.publishExercise}
                                                  >
                                                  Si
                                          </Button>
                                    </Modal.Footer>

                        </Modal>
                        <Modal show={this.state.modalConfirmation}
                            onHide={this.handleHideConfirmation}
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

