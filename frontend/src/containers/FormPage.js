import React, { Component } from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import Css from '../styles'
/*        
Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/products/create', jsonAgregar, axiosConfig)
.then((res) => {
  console.log("RESPONSE RECEIVED: ", res);
  alert('Producto agregado ' + this.state.nombreProducto);

})
.catch((err) => {
  console.log("AXIOS ERROR: ", err);
})*/




class FormPage extends Component{
  constructor(props){
    super(props);
    this.state ={
      tituloEnunciado:"Titulo del enunciado",
      publicacion:"Estado",
      descripcion:"Enunciado",
      options: ["Publicar", "No publicar"]
     
    }
  }
  loadCancelar = () => {
    this.setState({tituloEnunciado: "", descripcion: "", publicacion: ""});
  }
  render(){
      
      return(

        <PageBase title="Ingrese enunciado"
                  navigation="Nuevo enunciado" type = "paper">
          <form style={Css.forms}>

            <TextField
              hintText="Name"
              value = {this.state.tituloEnunciado}
              floatingLabelText="Titulo"
              fullWidth={true}
              onChange={this.updateTitle.bind(this)}
            />

            <SelectField
              floatingLabelText="Estado"
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
                            type="submit"
                            primary={true}
                            onClick={this.agregarEnunciado.bind(this)}
                            />
            </div>
          </form>
          </PageBase>
       
      );
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

  agregarEnunciado(){
    console.log(this.state.descripcion)
    console.log(this.state.tituloEnunciado)
    console.log(this.state.publicacion)

    if(this.state.tituloEnunciado, this.state.publicacion , this.state.descripcion){
      alert('Enunciado agregado ');
            
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "@crossorigin",
      }
    };             
    const jsonAgregar ={
      name: this.state.tituloEnunciado,
      text: this.state.descripcion,
      publicated: this.state.publicacion
    };


    Axios.post('138.197.105.209:3030/app/exercises/create', jsonAgregar, axiosConfig)
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          alert('Enunciado agregado ' + this.state.tituloEnunciado);

        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })

    }
    else{
      alert('Debes completar todos los campos');
    }
  
  }
}

export default FormPage;