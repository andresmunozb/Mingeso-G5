import React ,{Component} from 'react';
import { Form, TextArea,Button,Divider } from 'semantic-ui-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router-dom';
import {Row,Col} from 'react-bootstrap'

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
class ViewExerciseFormTeacher extends Component{
    constructor(props) {
        super(props);
        console.log("Aqui en alguna parte deberia estar el enunciado")
        console.log(props)
        this.keys1 = 0;
        this.keys2 = 0;
        this.state = {
            exercise: props.location.state,
            title: null,
            description: null,
            published: null,
            isSafeToRender: false,
            nameInput: '',
            inputs:null,
            nameOutput: '',
            outputs:null,
          
        }
        this.formatTestCasesView = this.formatTestCasesView.bind(this);

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
                functionName: this.state.exercise.viewAExercise.functionName,
                isSafeToRender: true,
                inputs: this.formatTestCasesView(0),
                outputs: this.formatTestCasesView(1),

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
            if(this.state.exercise.getTestCases[0] !== undefined &&
                this.state.exercise.getTestCases[0].output !== null){

                outputs = this.state.exercise.getTestCases;
                for(let i= 0;i<outputs.length;i++){
                    oneOutput = this.state.exercise.getTestCases[i].output
                    outputsArray.push({nameOutput: oneOutput})
                    
                }
            }
            else{
                outputsArray = []        
            }
            return outputsArray;
        }
    
    }
    
  
    render() {
        let { title, description,published,functionName} = this.state
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
                <div className= "Forms">
                    <h1 style={{textAlign:"center"}} >Detalles del Enunciado</h1>
                    <div style={{padding:10}}></div>
                    <Row>
                        <Col  xs={12} sm={12} md={6}>
                            <Paper style={background.mediumFrame1}>
                                <Form style={{textAlign:"center"}}>
                                    <h1 style={{textAlign:"center"}} >Contenido</h1>
                                    <Form.Field>
                                    <label>Estado de publicacion</label>
                                        <input  placeholder='Title' 
                                                value= {publicado} 
                                                readOnly={true}
                                                style={{width: 150, textAlign:"center"}}
                                                onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                />
                                    </Form.Field>
                                    <Form.Field>
                                    <label>Titulo del enunciado</label>
                                        <input  placeholder='Title' 
                                                readOnly={true}
                                                value= {title} 
                                                style={{  textAlign:"center"}}
                                                onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                />
                                    </Form.Field>
                                    <Form.Field>
                                    <label>Nombre de la funcion principal</label>
                                    <input  placeholder='Funcion' 
                                            value= {functionName}
                                            readOnly={true}
                                            onChange={this.updateNameFunction} 
                                            style={{  textAlign:"center"}}
                                            onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                            />
                                    </Form.Field>
                                
                                    <label>Descripcion</label>
                                    <TextArea placeholder='Descripcion'
                                                style={{minHeight: 300,maxHeight: 300}}
                                                readOnly={true}
                                                value= {description} 
                                                onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                            />  
                                    <Divider />
                                    {published &&
                                                <Link to={{
                                                    pathname: '/published_exercises_teacher'
                                                }}>
                                                    <Button primary={true} 
                                                            type='Back'
                                                            onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                            >
                                                            Volver
                                                    </Button>
                                                </Link>
                                    }
                                    {!published &&
                                                <Link to={{
                                                    pathname: '/unpublished_exercises_teacher'
                                                }}>
                                                    <Button primary={true} 
                                                            type='Back'
                                                            onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                            >
                                                            Volver
                                                    </Button>
                                                </Link>
                                    }


                                </Form>
                            </Paper>
                        </Col>
                       <Col  xs={12} sm={12} md={6}>
                            <Paper style={background.mediumFrame2}>
                                <Form style={{textAlign:"center"}}>
                                    <h1 style={{textAlign:"center"}} >Casos de prueba</h1>
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
                                                                        readOnly={true}
                                                                        value={input.nameInput}
                                                                        onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                                        />
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
                                                                            <input style= {{border: "1px solid lightblue", width: "80%"}}
                                                                                    type= "text"
                                                                                    readOnly={true}
                                                                                    value={output.nameOutput}
                                                                                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}

                                                                            />
                                                                    </Row>
            
                                                            </div>
                                                            
                                                                    
                                                        ))}
                                                    
                                                </Col>
                                    </Row>
                                            

                                </Form>
                            </Paper>


                        
                        </Col>
                                     
                     </Row>
                </div>
                </MuiThemeProvider> }
            </div>
  
     );
        
    }


}

export default ViewExerciseFormTeacher;