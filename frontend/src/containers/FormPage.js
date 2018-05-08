import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import PageBase from '../components/PageBase';
import Css from '../data'

const FormPage = () => {

  return (
    <PageBase title="Ingrese enunciado"
              navigation="Nuevo enunciado">
      <form style={Css.forms}>

        <TextField
          hintText="Name"
          floatingLabelText="Titulo del enunciado"
          fullWidth={true}
        />

        <SelectField
          floatingLabelText="Unidad"
          value=""
          fullWidth={true}>
          <MenuItem key={0} primaryText="lista"/>
          <MenuItem key={1} primaryText="Pila"/>
          <MenuItem key={2} primaryText="Palindromo"/>
        </SelectField>

        <DatePicker
          hintText="Expiration Date"
          floatingLabelText="Fecha máxima"
          fullWidth={true}/>

        <TextField
          hintText="enunciado"
          floatingLabelText="Enunciado"
          fullWidth={true}
          multiLine={true}
          rows={10}
          rowsMax={14}
        /> 
        <SelectField
            floatingLabelText="Publicar"
            value=""
            fullWidth={true}>
            <MenuItem key={0} primaryText="Publicar"/>
             <MenuItem key={1} primaryText="No publicar"/>
        </SelectField>
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
};

export default FormPage;