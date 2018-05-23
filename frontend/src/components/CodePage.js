import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../containers/PageBase';
import Css from '../styles'


import Axios from 'axios';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/c_cpp';

import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/terminal';

import 'brace/snippets/python';
import 'brace/ext/language_tools';

class CodePage extends Component{
    constructor(props){
        super(props)
        console.log("Estos son mis props de codepage")
        console.log(props)
        this.state = { 
            lenguajeElegido: "", 
            codigoAlumno: "",
            titulo: this.props.enunciado.title, 
            descripcion: this.props.enunciado.description,    
            id:this.props.enunciado.id,
        };//1

    }

    updateLenguaje(event){
        this.setState(
            {lenguajeElegido:event.target.value}); 
           
    }
    //updateCodigoA(event){this.setState({codigoAlumno: event.target.value});}//como actualizar lo que escribe el alumno

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.codigoAlumno !== nextState.codigoAlumno) {
          return false
        } else {
          return true;
        }
    }
    onChange=(NewValue)=>{
        console.log('Change',NewValue);
        this.setState({
            codigoAlumno:NewValue
        });
        
    }


    render(){
        return(
        <div className="container">
            <div className="row">
            <br></br>
            <br></br>
                <div className="col-sm-2">
                    <select onClick={this.updateLenguaje.bind(this)} >
                        <option hidden>Lenguaje</option>
                        <option value="python">Python</option>
                        <option value="c_cpp">C</option>
                        <option value="java">Java</option>
                    </select>
                </div>


                <div className="col-sm-1 ">
                    <button  //onClick={this.runCode.bind(this)} 
                    className="btn btn-primary">Ejecutar</button>
                </div>


                <div className="col-sm-6 "></div>
                
                <div className="col-sm-1">
                        <button onClick={this.sendSolution.bind(this)} 
                        className="btn btn-success">Enviar</button>
                </div> 

                 <div className="col-sm-1">
                 <Link to={{
                             pathname: '/listaEnunciadosAlumno',
                                state: { fromEnunciadoProfesor: this.props.enunciado.published }
                            }}>
                    <button className="btn btn-danger" >Volver</button>
                 </Link>

                </div> 
            </div><br></br>
            <div className="row" >
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
                    <AceEditor
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
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
                    <textarea rows="25" cols="81">
                    </textarea>
                </div>
            </div>
        </div>
        );
    } 

      runCode(){
    }

    sendSolution(){

        if(this.state.codigoAlumno.length !== 0 && this.state.lenguajeElegido.length !== 0 ){
          
                      
            let axiosConfig = {
                   headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "@crossorigin",
                }
            };             
            const jsonSendSolution ={
                id:this.props.enunciado.id,
                codigoAlumno: this.state.codigoAlumno,
                lenguajeElegido: this.state.lenguajeElegido,
            };
            alert('Tarea enviada ');//ojala agregar fecha
            /*Axios.post('http://URL', jsonSendSolution, axiosConfig)
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    alert('Tarea eviada ');//ojala agregar fecha
                })
                .catch((err) => {
                   alert('Fallo el envio del codigo');
                })*/
        }
        else{
            alert('Debe escribir codigo o no tiene lenguaje seleccionado');
        }
    }
}

export default CodePage;
