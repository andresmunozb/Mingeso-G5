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
import CodePage from './CodePage';
import Css from '../styles';
import Axios from 'axios';




class FormPage extends Component{
  constructor(props){
    console.log("estos son mis propus")
    console.log(props)
    super(props);
    this.state ={
      tituloEnunciado:props.enunciado.title ,
      publicacion:props.enunciado.published ,
      descripcion:props.enunciado.description,
      options: ["Publicar", "No publicar"],
      publish: false,
      type: props.type,
      speciality: props.speciality,
      preparations: false,
      enunciadoPreDefinido: null,
      enunciadoPreDefinidoTitle: null,
      enunciadoPreDefinidoPublish: null,
      enunciadoPreDefinidoDescription: null,
      publicado: null
     
    }
    this.test = this.test.bind(this);

  }
  componentWillMount(){
    if(this.props.enunciado.published){

          this.setState({
            publicado: "Publicado"  
          });
    }
    else{

          this.setState({
            publicado: "No publicado"   
          });
    }

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

            if(this.state.publicacion){
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
        { this.state.type === "lookUp" &&
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
                    value = {this.state.publicado}
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
              </div>

              <div style={Css.buttons}>
                {this.state.speciality === "prof" &&

                 //ROUTER V4
                   <Link to={{
                          pathname: '/listaEnunciadosProfesor',
                          state: { fromEnunciadoProfesor: this.props.enunciado.published }
                  }}>
                                      
                  <RaisedButton label="Volver"
                    style={Css.saveButton}
                    primary={true}
                    onClick = {this.test}
                  />
                  </Link>
                  }
                  
                  {this.state.speciality === "alumn" &&
                                //ROUTER V4
                  <Link to={{
                             pathname: '/listaEnunciadosAlumno',
                          state: { fromEnunciadoProfesor: this.props.enunciado.published }
                  }}>
                          <RaisedButton label="Volver"
                          style={Css.saveButton}
                          primary={true}
                          />
                   </Link>

                  }
              </div>
        </div>
      }
                { this.state.type === "edit" &&
                  <div>
                      <div>
                        <TextField
                            hintText="Name"
                            value = {this.state.tituloEnunciado}
                            floatingLabelText="Titulo"
                            fullWidth={true}
                            onChange={this.updateTitleEdit.bind(this)}
                            errorText= {this.state.tituloEnunciado !== undefined && 
                              this.state.tituloEnunciado.length === 0 &&
                            'Este campo es requerido' }

                         />
                         <SelectField
                            floatingLabelText={"Estado:   "+this.state.publicado}
                            onChange={(evt, newIndex) => this.updatePublishEdit(newIndex)} 
                            value={this.state.publicacion} 
                            fullWidth={true}

                            errorText= {this.state.publicacion !== undefined && 
                              this.state.publicacion.length === 0 &&
                            'Este campo es requerido' }

                            >
                                {this.state.options.map(function(w, index){
                                return  <MenuItem key={index} label={w} value={w}>{w}</MenuItem>;
                                  })}
                       </SelectField>
                        <TextField
                                hintText="enunciado"
                                floatingLabelText="Enunciado"
                                value = {this.state.descripcion}
                                errorText= {this.state.descripcion !== undefined && 
                                  this.state.descripcion.length === 0 &&
                                'Este campo es requerido' }
                                fullWidth={true}
                                multiLine={true}
                                rows={10}
                                rowsMax={14}
                                onChange={this.updateDescriptionEdit.bind(this)}

                        /> 
                        </div>
                           <div style={Css.buttons}>                       
                           <Link to={{
                                  pathname: '/listaEnunciadosProfesor',
                                state: { fromEnunciadoProfesor: this.props.enunciado.published }
                            }}>
                                <RaisedButton label="Volver"
                                                        style={Css.saveButton}
                                                        primary={true}
                                            />
                                  </Link>
                          
                                <RaisedButton label="Modificar"
                                                        style={Css.saveButton}
                                                        primary={true}
                                                        onClick={this.editarEnunciado.bind(this)}
                                            />
                             </div>

                          
                       
                        
                  </div>
                }
                { this.state.type === "new" &&

                <div> 
                      <div>                           
                       <TextField
                                    hintText="Name"
                                    value = {this.state.tituloEnunciado}
                                    floatingLabelText="Titulo"
                                    fullWidth={true}
                                    onChange={this.updateTitle.bind(this)}

                                    errorText= {this.state.tituloEnunciado !== undefined && 
                                                this.state.tituloEnunciado.length === 0 &&
                                              'Este campo es requerido' }
                       />
                        <SelectField
                                    floatingLabelText="Estado"
                                    value = {this.state.publicacion}
                                    onChange={(evt, newIndex) => this.updateState(newIndex)} 
                                    errorText= {this.state.publicacion !== undefined && 
                                      this.state.publicacion.length === 0 &&
                                    'Este campo es requerido' }
                                    >
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
                                    errorText= {this.state.descripcion !== undefined && 
                                      this.state.descripcion.length === 0 &&
                                    'Este campo es requerido' }

                          /> 
                          </div>


                          <Divider/>

                           <div style={Css.buttons}>
                                        <RaisedButton label="Reutilizar"
                                             onClick = {this.loadCancelar}
                                             style={Css.reUseBtn}
                                         />

                            <RaisedButton label="Guardar"
                                            style={Css.saveButton}
                                              primary={true}
                                              style={Css.createBtn}
                                               onClick={this.agregarEnunciado.bind(this)}
                                          />
                              </div>

                    </div>

                }

                {this.state.type==="code"&& 
                  <div>
                    <div style={Css.forms3}>
                    <TextField
                      hintText="Name"
                      value = {this.props.enunciado.title}
                      floatingLabelText="Titulo"
                      fullWidth={true}
                      />
                    <TextField
                      hintText="enunciado"
                      floatingLabelText="Enunciado"
                      value = {this.props.enunciado.description}
                      fullWidth={true}
                      multiLine={true}
                      rows={8}
                      cols = {1000}
                      rowsMax={8}
                      /> 
                      </div>
                      
                        <CodePage enunciado= {this.props.enunciado}/>
                      
                 </div>
              }
      </div>
       
      );
}


  updateTitleEdit(event){
    console.log(this.state.tituloEnunciado)
    this.setState({
      tituloEnunciado: event.target.value
    });
  }
  updatePublishEdit(newIndex){
    console.log(this.state.options[newIndex])
    this.setState({
      publicacion:  this.state.options[newIndex],
      publicado:  this.state.options[newIndex]
    },    console.log(this.state.publicacion)
  );
  }
  updateDescriptionEdit(event){
    console.log(this.state.descripcion)

    this.setState({
      descripcion: event.target.value
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
    
    if(this.state.tituloEnunciado !== undefined &&
       this.state.publicacion !== undefined && this.state.descripcion !== undefined){
        if(this.state.tituloEnunciado.length !== 0 &&
          this.state.publicacion.length !== 0 &&  this.state.descripcion.length !== 0 ){
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
    else{
      alert('Debes completar todos los campos');
    }
  
  }
  editarEnunciado2= () =>{
    console.log("esto va a pasar")

    console.log(this.state.tituloEnunciado)
    console.log(this.state.descripcion)
    console.log(this.state.publish)
    let jsonAgregar = {
      title:this.state.tituloEnunciado,
      description: this.state.descripcion,
      published:this.state.publish
    }
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "@crossorigin",
      }
    };
    console.log("se supone que soy un json VALIDO")
    console.log("se supone que es el numero")
    console.log(this.props.enunciado.id)
    //http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/{Id}/publish, el id es para un usuario
    //en particular.
    //Futuro push se cambiara el id dependiendo del usuario
    console.log('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.props.enunciado.id+'/publish')
    Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.props.enunciado.id+'/publish',jsonAgregar)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
     
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);

    });
  
    Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.props.enunciado.id+'/edit', jsonAgregar)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
    
      alert('Se ha modificado sadisfactoriamente el enunciado de titulo'+this.state.tituloEnunciado);


    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);

    })



  }

  editarEnunciado(){

    console.log(this.state.tituloEnunciado)
    console.log(this.state.descripcion)
    console.log(this.state.publicacion)
    if(this.state.tituloEnunciado !== undefined &&
      this.state.publicacion !== undefined && this.state.descripcion !== undefined){
      if(this.state.tituloEnunciado.length !== 0 &&
        this.state.publicacion.length !== 0 &&  this.state.descripcion.length !== 0 ){          
         
          console.log("este es el estado de la publicacion")
          console.log(this.state.publicacion) 
          if(this.state.publicacion === "Publicar"){
            this.setState({publish:true}, this.editarEnunciado2);
          }
          else if (this.state.publicacion === "No publicar"){
            this.setState({publish:false},this.editarEnunciado2)
          }
          
      }
      else{
        alert('Debes completar todos los campos');
      }
      
 
  }
  else{
    alert('Debes completar todos los campos');
  }
}
}

export default FormPage;