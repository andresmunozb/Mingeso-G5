import React ,{Component} from 'react';
import { Form, TextArea,Button,Divider } from 'semantic-ui-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../ThemeList';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router-dom';
import {Grid,Row,Col} from 'react-bootstrap'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import { white } from 'material-ui/styles/colors';
import AceEditor from 'react-ace';
import Axios from 'axios'
import 'brace/theme/monokai';
import 'brace/mode/python';
import 'brace/mode/java';

const background = {
  bigFrame:{
    padding: 30,
    position:'relative'
  },

  textAreaStyle:{
    height: 300

  },
  textAreaStyle2:{
    height: 400,
      width:450
  },
  titleStyle:{
    width: 600,
    textAlign:"center"
  }
}
class Solution extends Component {
    constructor(props) {
      super(props); 
      this.state = {
        exercise: props.location.state,
        title: null,
        description: null,
        isSafeToRender: false,
        sideMenu:false,
        code:"",
        reply: ""
      }
      this.handleToggle = this.handleToggle.bind(this)
      this.function = this.function.bind(this)
      this.updateCode = this.updateCode.bind(this)
      this.executeCode = this.executeCode.bind(this)

    }
  handleToggle(){
    this.setState({sideMenu: !this.state.sideMenu});
  }
  function(){
    return <p style={{color: white}}>AQUI VA ALGO DINAMICO</p>
  }
  executeCode(){
    console.log(this.state.code)
    let codeToExecute = {
      language:"python",
      script: this.state.code
    }
    Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/solutions/execute',codeToExecute)
    .then((response) => {
        console.log("RESPONSE RECEIVED: ", response);
        this.setState({reply: response.data.stdout})
    })
    .catch((err) => {
        console.log("AXIOS ERROR: ", err);
    })

  }


  componentWillMount () {
    console.log(this.state.exercise)
    if(this.state.exercise === undefined){
        console.log(this.props.history);
        this.props.history.goBack();
    }
    else{
        this.setState({  
          title:this.state.exercise.viewAExercise.title,
          description: this.state.exercise.viewAExercise.description,
          code: "",
          isSafeToRender: true

        })
    }
  }

    updateCode(event){
    this.setState({ code: event })

    }


  render() {
    let { title, description} = this.state
        return (
          <div>
            {this.state.isSafeToRender &&
            
                <MuiThemeProvider muiTheme={ThemeDefault}>  
                    <Paper style={background.bigFrame}>

                        <Form style={{textAlign:"center"}}>
                            <h1>Area de practica</h1>
                            <div style ={{width: '50%', position: 'relative', left:'25%'}}>
                              <Form.Field>
                              <label>Titulo del enunciado</label>
                                  <input  placeholder='Title' 
                                          value= {title} 
                                          style={background.titleStyle}  
                                          readOnly={true}

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

                              <Link to={{ pathname: '/exercises_student' }}>
                                    <Button primary={true} type='Back'>
                                              Volver
                                      </Button>
                              </Link>

                        </Form>
                        <Grid>
                        <Row className="show-grid" style={{position:"relative", left: "5%"}}>
                          <Col lg={5}>
                          <label>Descripcion</label>
                          <AceEditor
                                style = {background.textAreaStyle2}
                                mode={'python'}
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
                          <Col lg={1}>
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
                          <Col lg={5}>
                          <label>Resultado</label>
                                  <TextArea   
                                              value= {this.state.reply} 
                                              style={background.textAreaStyle2}  
                                              />  
                          </Col>
                         
                          </Row>
                        </Grid>
                            <Drawer width={400} style = {{backgroundColor: white}}
                                  openSecondary={true} open={this.state.sideMenu} >
                            <AppBar title="AppBar"    
                                  />
                                  {this.function()}
                          </Drawer>
                     </Paper>
                   

                </MuiThemeProvider>
          
          
            }


          </div>

    );
        
    }
  }
  
  export default Solution;
  /* <AceEditor
                    mode= {this.state.lenguajeElegido} //escoger lenguaje
                    theme="terminal"
                    name="blah2"
                    //onChange={this.updateCodigoA.bind(this)}
                    onChange={this.onChange}
                    fontSize={18}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value = ""
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}/>
                </div>
                
                  <TextArea   placeholder='Descripcion'
                                              value= {"Aca va el react-ace"} 
                                              style={background.textAreaStyle2}  
                                              />  
                
                
                
                */