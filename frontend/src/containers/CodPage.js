import React from 'react';
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

const CodPage = () => {

	const styles = {

    toggleDiv: {
      maxWidth: 300,
      marginTop: 40,
      marginBottom: 5,
    },
    toggleLabel: {
      color: grey400,
      fontWeight: 100
    },
    saveButton: {
      marginLeft: 5
    }
  };
  return (

    <div className="row">
			<div className="col-sm-2">
		    	<SelectField
		          floatingLabelText="Lenjuaje"
		          value=""
		          fullWidth={true}>
		          <MenuItem key={0} primaryText="Python"/>
		          <MenuItem key={1} primaryText="C"/>
		          <MenuItem key={2} primaryText="Java"/>
		        </SelectField>
	        </div>
	        <button type="button" class="btn btn-primary">Run</button>
	    
    	<div className="row" >
	    	<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
				<textarea rows="33" cols="60">
				Escribir código...
				</textarea>
			</div>
			<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
				<textarea rows="33" cols="60">
				</textarea>
			</div>
		</div>
    </div>

  );
};

export default CodPage;