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
      view: ""
     
    }
  }
  loadCancelar = () => {
    this.setState({view: "Cancelar"});
  }
  render(){
      
      return(

        <PageBase title="Ingrese enunciado"
                  navigation="Nuevo enunciado" type = "paper">
          <form style={Css.forms}>

            <TextField
              hintText="Name"
              floatingLabelText="Titulo del enunciado"
              fullWidth={true}
            />

            <SelectField
              floatingLabelText="Estado"
              value=""
              fullWidth={true}>
              <MenuItem key={0} primaryText="Publicar"/>
              <MenuItem key={1} primaryText="No publicar"/>
            </SelectField>

            <TextField
              hintText="enunciado"
              floatingLabelText="Enunciado"
              fullWidth={true}
              multiLine={true}
              rows={10}
              rowsMax={14}
            /> 
            <Divider/>

            <div style={Css.buttons}>
              <Link to="/">
                <RaisedButton label="Cancelar"/>
              </Link>

              <RaisedButton label="Guardar"
                            style={Css.saveButton}
                            type="submit"
                            primary={true}/>
            </div>
          </form>
          </PageBase>
       
      );
  }
}

export default FormPage;