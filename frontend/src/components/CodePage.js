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

//<textarea rows="10" cols="180" disabled  //value={this.state.enunciado} //bloqquear enunciado 
                ///> 

class Solution extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state = { lenguajeElegido: "", codigoAlumno: "", view:"",
        //titulo: this.props.enuniado.title, 
        //eunciado: this.props.enunciado.description,    
        //id:this.props.enunciado.id,
        };//1

    }

    updateLenguaje(event){
        this.setState(
            {lenguajeElegido:event.target.value}); 
            event.preventDefault();
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
    loadCancelar = () => {
        this.setState({view: "Cancelar"});
    }


    render(){
         console.log(this.props)
            if (this.state.view === "Cancelar") 
                alert('Cancel'); 
               // return  <"/listaEnunciados"/> ;
        return(
        <div class="container">
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
                    <button  onClick={this.runCode.bind(this)} 
                    className="btn btn-primary">Ejecutar</button>
                </div>
                <div className="col-sm-6 "></div>
                <div className="col-sm-1">
                <button onClick={this.sendSolution.bind(this)} 
                className="btn btn-success">Enviar</button>
                </div>   
                <div className="col-sm-1">
                <button onClick = {this.loadCancelar}
                className="btn btn-danger" >Cancelar</button>
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
        if(this.state.lenguajeElegido=== ''){// ==
            
            alert('seleccione un lenguaje');
        }else{
            //ejecutar codigo

        }
    }

    sendSolution(){

        if(this.state.codigoAlumno!= '' && this.state.lenguajeElegido!= ''){
            alert('Tarea eviada ');//ojala agregar fecha
                      
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
    
            Axios.post('http://URL', jsonSendSolution, axiosConfig)
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    alert('Tarea eviada ');//ojala agregar fecha
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
        else{
            alert('Fallo el envio');
        }
    }
}

export default Solution;
