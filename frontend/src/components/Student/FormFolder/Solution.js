import React ,{Component} from 'react';
import { Form, TextArea,Button,Divider,Dropdown } from 'semantic-ui-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router-dom';
import {Row,Col} from 'react-bootstrap'
import AceEditor from 'react-ace';
import Axios from 'axios'
import 'brace/theme/monokai';
import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/mode/c_cpp';

const background = {
  bigFrame:{
    padding: 30,
    position:'relative'
  },
  mediumFrame:{
    width: "40%",
    height: "60%",
    padding:"2%",
    position:'relative',
    left:"30%",
    border: "1px solid lightblue"
  },

  textAreaStyle:{
    height: 300

  },
  textAreaStyle2:{
    minHeight: 500,
    minWidth:520
  },
  titleStyle:{
    textAlign:"center"
  }
}
class Solution extends Component {
    constructor(props) {
      super(props); 
      this.state = {
        exercise: props.location.state,
        id:null,
        title: null,
        description: null,
        functionName: null,
        isSafeToRender: false,
        sideMenu:false,
        code:"",
        reply: "",
        languageOptions: [
            
              { key: 'python', value: 'python', text: 'Python' },
              { key: 'java', value: 'java', text: 'Java' },
              { key: 'c', value: 'c_cpp', text: 'C' }
           
         ],  
         languageEditor: "",
         languageCode: ""
  
        
      }
      this.handleToggle = this.handleToggle.bind(this)
      this.updateCode = this.updateCode.bind(this)
      this.executeCode = this.executeCode.bind(this)
      this.selectLanguages = this.selectLanguages.bind(this)

    }
  handleToggle(){
    this.setState({sideMenu: !this.state.sideMenu});
  }
  executeCode(){
    console.log(this.state.code)
    if(this.state.languageCode.length !== 0){
        let codeToExecute = {
          language:this.state.languageCode,
          script: this.state.code
        };
        let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "@crossorigin",
          }
        };

        Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/solutions/execute',codeToExecute,axiosConfig)
        .then((response) => {
            console.log("RESPONSE RECEIVED: ", response);
            this.setState({reply: response.data.stdout})
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
    }
    else{
      alert("Debe elegir un lenguaje de programacion para poder ejecutar o enviar su codigo")
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
          id: this.state.exercise.viewAExercise.id,  
          title:this.state.exercise.viewAExercise.title,
          description: this.state.exercise.viewAExercise.description,
          functionName: this.state.exercise.viewAExercise.functionName,
          code: "",
          isSafeToRender: true

        })
    }
  }
  selectLanguages = (e, { value}) => {
    var actualLenguage;
    for(let i = 0; i<this.state.languageOptions.length; i++){
      if(this.state.languageOptions[i].value === value){
       actualLenguage = this.state.languageOptions[i].key; 
      }
    }
    this.setState({ languageEditor: value, languageCode: actualLenguage})

  }

    updateCode(event){
    this.setState({ code: event })

    }


  render() {
    let { title, description,functionName} = this.state
        return (
          <div>
            {this.state.isSafeToRender &&
            
                <MuiThemeProvider muiTheme={ThemeDefault}>  
                    <Paper style={background.bigFrame}>

                        <Form style={{textAlign:"center"}}>
                            <h1>Area de practica</h1>
                            <div style ={{width: '40%', position: 'relative', left:'30%'}}>
                              <Form.Field>
                                <label>Titulo del enunciado</label>
                                    <input  placeholder='Title' 
                                            readOnly={true}
                                            value= {title} 
                                            style={{  textAlign:"center"}}
                                        />
                              </Form.Field>
                              <Form.Field>
                                <label>Nombre de la funcion principal</label>
                                    <input  placeholder='Function' 
                                            readOnly={true}
                                            value= {functionName} 
                                            style={{  textAlign:"center"}}
                                        />
                                </Form.Field>
                              <label>Descripcion</label>
                            
                                <TextArea placeholder='Descripcion'
                                          style={background.textAreaStyle}  
                                          value= {description} 
                                          readOnly={true}

                                        />  
                            </div>
                            <Divider />
                            <Row className="show-grid" style={{position:"relative", left: "6%"}}>
                              <Col  xs={5} sm={5} md={2} style={{position:"relative", left: "10%"}}>
                                 <label>Lenguaje</label>

                                <Dropdown placeholder='Seleccionar...' 
                                          fluid selection options={this.state.languageOptions} 
                                          onChange = {this.selectLanguages}
                                          />
                
                             </Col>
                             <Col  xs={12} sm={12} md={6} style={{position:"relative", left: "4%"}}>
                               <div style={{padding:15}}></div>
                                   <Link to={{ pathname: '/exercises_student' }}>
                                       <Button primary={true} type='Back'>
                                                Volver
                                        </Button>
                                  </Link>

                
                             </Col>
                           </Row>

                            
                        </Form>
                        <Row className="show-grid" style={{position:"relative", left: "6%"}}>
                          <Col  xs={12} sm={12} md={6} lg={5}>
                          <label>Editor</label>
                          <AceEditor
                                //style = {background.textAreaStyle2}
                                mode={this.state.languageEditor}
                                theme={'monokai'}
                                name="blah2"
                                fontSize={17}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                value={this.state.code}
                                onChange={this.updateCode}
                                setOptions={{
                                  enableBasicAutocompletion: false,
                                  enableLiveAutocompletion: false,
                                  enableSnippets: false,
                                  showLineNumbers: true,
                                  tabSize: 2,
                                }}/>
                
                          </Col>
                          <Col  xs={5} sm={5} md={4} lg={1}>
                              <Row className="show-grid">
                              <div style={{padding:30}}></div>
                                    <Button   primary={true} 
                                              type='Back'
                                              onClick= {this.executeCode}>
                                              Ejecutar
                                      </Button>
                              </Row>

                              <Row className="show-grid">

                              <div style={{padding:30}}></div>
                             
                                    <Button primary={true} type='Back'
                                            onClick={this.handleToggle}
                                            >
                                              Enviar
                                      </Button>
                              </Row>

                          </Col>
                          <Col  xs={12} sm={12} md={6} lg={5}>
                          <label>Resultado:</label>
                                  <TextArea   
                                              value= {this.state.reply} 
                                              style={background.textAreaStyle2}  
                                              autoHeight= {true}
                                              />  
                          </Col>
                         
                          </Row>
                     </Paper>
                   

                </MuiThemeProvider>
          
          
            }


          </div>

    );
        
    }
  }
  
  export default Solution;