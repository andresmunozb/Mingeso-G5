import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom';

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
import Axios from 'axios'




class FormPage extends Component{
  constructor(props){
    console.log("estos son mis propus")
    console.log(props)
    super(props);
    this.state ={
      tituloEnunciado:"Titulo del enunciado",
      publicacion:"Estado",
      descripcion:"Enunciado",
      options: ["Publicar", "No publicar"],
      publish: false,
      type: props.type,
      speciality: props.speciality,
      preparations: false,
      enunciadoPreDefinido: null,
      enunciadoPreDefinidoTitle: null,
      enunciadoPreDefinidoPublish: null,
      enunciadoPreDefinidoDescription: null,
      preparations : false  
     
    }
    this.setPreparations = this.setPreparations.bind(this);
    this.test = this.test.bind(this);

  }
  setPreparations(){
    this.setState({preparations : true})
  }
  componentWillMount(){
    console.log("ojala me monte")
    console.log(this.props.enunciado)
    this.setState({
      enunciadoPreDefinido: this.props.enunciado,
      enunciadoPreDefinidoTitle: this.props.title,
      enunciadoPreDefinidoPublish: this.props.published,
      enunciadoPreDefinidoDescription: this.props.description,      
    }, this.setPreparations)

  }

  loadCancelarEdition = () => {
    this.setState({enunciadoPreDefinidoTitle: "", enunciadoPreDefinidoDescription: "", enunciadoPreDefinidoPublish: ""});
  }
  loadCancelar = () => {
    this.setState({tituloEnunciado: "", publicacion: "", descripcion: ""});
  }
  getPublish(modo){
    console.log("el modo")

    console.log(modo)
    if(modo === "lookUp"){

          if(this.props.enunciado.published){
            return "Publicado"
        }
        else{
          return "No Publicado"

        }
    }
    else{
            if(this.state.enunciadoPreDefinidoPublish){
              return "Publicado"
          }
          else{
            return "No Publicado"

          }
    }
  }
  test = () => {
    console.log("Aca deberia estar el enunciado pls")
    console.log(this.state.enunciadoPreDefinido)

  }
  render(){
      
      return(
      <div>
                { this.state.type === "lookUp" && this.state.preparations &&
               <div> 
                        <div>
                              <TextField
                                  hintText="Name"
                                  value = {this.props.enunciado.title}
                                  floatingLabelText="Titulo"
                                  fullWidth={true}
                                />
                                {this.state.speciality === "prof" &&
                                      
                                      <TextField
                                      hintText="Name2"
                                      value = {this.getPublish("lookUp")}
                                      floatingLabelText="Estado de publicacion"
                                      fullWidth={true}
                                    />
                                      
                          
                                 }
                                <TextField
                                  hintText="enunciado"
                                  floatingLabelText="Enunciado"
                                  value = {this.props.enunciado.description}
                                  fullWidth={true}
                                  multiLine={true}
                                  rows={10}
                                  rowsMax={14}
                                /> 
                           <Divider/>
                          </div>

                          <div style={Css.buttons}>
                                {this.state.speciality === "prof" &&

                                //ROUTER V4
                           /*     <Link to={{
                                  pathname: '/courses',
                                  search: '?sort=name',
                                  hash: '#the-hash',
                                  state: { fromDashboard: true }
                                }}/>*/
                                      
                                      <RaisedButton label="Volver"
                                                          style={Css.saveButton}
                                                          primary={true}
                                                          onClick = {this.test}
                                              />
                                      
                                }
                                {this.state.speciality === "coord" &&
                                //ROUTER V4

                                      <RaisedButton label="Volver"
                                                          style={Css.saveButton}
                                                          primary={true}
                                              />
                                          
                                }
                                {this.state.speciality === "alumn" &&
                                //ROUTER V4

                                        <RaisedButton label="Volver"
                                                        style={Css.saveButton}
                                                        primary={true}
                                            />
                                        
                                          
                                }
                           </div>
                </div>
                }
                { this.state.type === "edit" && this.state.preparations &&
                     <div>
                        <TextField
                            hintText="Name"
                            value = {this.state.enunciadoPreDefinidoTitle}
                            floatingLabelText="Titulo"
                            fullWidth={true}
                            onChange={this.updateTitleEdit.bind(this)}
                         />
                         <SelectField
                            floatingLabelText="Estado"
                            value = {this.state.enunciadoPreDefinidoPublish}
                            onChange={(evt, newIndex) => this.updatePublishEdit(newIndex)} value={this.state.enunciadoPreDefinido.published} 
                            fullWidth={true}>
                                {this.state.options.map(function(w, index){
                                return  <MenuItem key={index} label={w} value={w}>{w}</MenuItem>;
                                  })}
                       </SelectField>
                        <TextField
                                hintText="enunciado"
                                floatingLabelText="Enunciado"
                                value = {this.state.enunciadoPreDefinidoDescription}

                                fullWidth={true}
                                multiLine={true}
                                rows={10}
                                rowsMax={14}
                                onChange={this.updateDescriptionEdit.bind(this)}
                        /> 


                        <Divider/>

                         <div style={Css.buttons}>
                         {this.state.speciality === "coord" &&
                                                         //ROUTER V4

                                <div style={Css.buttons}>

                               <Link className= "button"to="/listaEnunciadosCoordinador" params={{ testvalue: "hello" }}> 
                                    <RaisedButton label="Volver"
                                                          style={Css.saveButton}
                                                          primary={true}
                                              />
                               </Link>
                                      
                              </div>
                          }
                          {this.state.speciality === "prof" &&
                                                          //ROUTER V4

                              <div style={Css.buttons}>

                                 <Link className= "button" to="/listaEnunciadosProfesor" params={{ testvalue: "hello" }}>
                                      <RaisedButton label="Volver"
                                                        style={Css.saveButton}
                                                        primary={true}
                                            />
                                  </Link>
                                 
                            </div>
                          }

                              <RaisedButton label="Modificar"
                                            style={Css.saveButton}
                                            primary={true}
                                            onClick={this.editarEnunciado.bind(this)}
                                            />
                          </div>
                  </div>
                }

                { this.state.type === "new" && this.state.preparations &&

                <div> 
                                                              
                       <TextField
                                    hintText="Name"
                                    value = {this.state.tituloEnunciado}
                                    floatingLabelText="Titulo"
                                    fullWidth={true}
                                    onChange={this.updateTitle.bind(this)}
                       />
                        <SelectField
                                    floatingLabelText="Estado"
                                    value = {this.state.publicacion}
                                    onChange={(evt, newIndex) => this.updateState(newIndex)} value={this.state.publicacion} 
                                    fullWidth={true}>
                                        {this.state.options.map(function(w, index){
                                        return  <MenuItem key={index} label={w} value={w}>{w}</MenuItem>;
                                          })}
                       </SelectField>
                        <TextField
                                    hintText="enunciado"
                                    floatingLabelText="Enunciado"
                                    value = {this.state.descripcion}

                                    fullWidth={true}
                                    multiLine={true}
                                    rows={10}
                                    rowsMax={14}
                                    onChange={this.updateDescription.bind(this)}
                          /> 


                           <Divider/>

                            <div style={Css.buttons}>
                                        <RaisedButton label="Cancelar"
                                             onClick = {this.loadCancelar}
                                         />

                               <RaisedButton label="Guardar"
                                            style={Css.saveButton}
                                              primary={true}
                                               onClick={this.agregarEnunciado.bind(this)}
                                          />
                              </div>

                    </div>

                }
      </div>
       
      );
  }
  updateTitleEdit(event){
    this.setState({
      enunciadoPreDefinidoTitle: event.target.value
    });


  }
  updatePublishEdit(newIndex){
    this.setState({
      enunciadoPreDefinidoPublish:  this.state.options[newIndex]
    });


  }
  updateDescriptionEdit(event){
    this.setState({
      enunciadoPreDefinidoDescription: event.target.value
    });


  }

  updateTitle(event){
    this.setState({
      tituloEnunciado: event.target.value
    });
  }
  updateState(newIndex){
   
    this.setState({
      publicacion: this.state.options[newIndex]
    });

  }
 
  updateDescription(event){
    this.setState({
      descripcion: event.target.value
    });
  }
  agregarEnunciado2= () =>{
    let jsonAgregar = {
      title:this.state.tituloEnunciado,
      description: this.state.descripcion,
      published: this.state.publish
    }
    
    //http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/create/{id}, el id es para un usuario
    //en particular.
    //Futuro push se cambiara el id dependiendo del usuario
    Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/create/1', jsonAgregar)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      alert('Enunciado agregado ' + this.state.tituloEnunciado);
     


    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);

    })


  }
 
  agregarEnunciado(){
    console.log(this.state.descripcion)
    console.log(this.state.tituloEnunciado)
    console.log(this.state.publicacion)
    
    if(this.state.tituloEnunciado, this.state.publicacion , this.state.descripcion){            
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "@crossorigin",
      }
    };
    console.log("este es el estado de la publicacion")
    console.log(this.state.publicacion) 
    if(this.state.publicacion === "Publicar"){
      this.setState({publish:true}, this.agregarEnunciado2);
    }
    else if (this.state.publicacion === "No publicar"){
      this.setState({publish:false},this.agregarEnunciado2)
    }
    
   

    }
    else{
      alert('Debes completar todos los campos');
    }
  
  }

  editarEnunciado(){
    console.log(this.state.enunciadoPreDefinidoTitle)
    console.log(this.state.enunciadoPreDefinidoDescription)
    console.log(this.state.enunciadoPreDefinidoPublish)
    
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "@crossorigin",
      }
    };
    let jsonAgregar = {
      title:this.state.enunciadoPreDefinidoTitle,
      description: this.state.enunciadoPreDefinidoDescription,
      published: this.state.enunciadoPreDefinidoPublish
    }
    
    
    //http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/{Id}/publish, el id es para un usuario
    //en particular.
    //Futuro push se cambiara el id dependiendo del usuario
    Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/1/publish', jsonAgregar)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      alert('Enunciado agregado ' + this.state.enunciadoPreDefinidoTitle);
     


    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);

    })
    
   




  }
}

export default FormPage;