import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {white, blue500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';

const styles = {
  iconButton: {
    float: 'left',
    paddingTop: 17
  },
  textField: {
    color: white,
    backgroundColor: blue500,
    borderRadius: 2,
    height: 35
  },
  inputStyle: {
    color: white,
    paddingLeft: 5
  },
  hintStyle: {
    height: 16,
    paddingLeft: 5,
    color: white
  }
};

class SearchBox extends Component{
  constructor(props){
    super(props);
    this.state ={
     
     
    }
  }
  function = (param) => {
   
    }
  
  render(){
      return(
        <div>
          <IconButton style={styles.iconButton} >
            <Search color={white} />
          </IconButton>
          <TextField
            hintText="Buscar..."
            underlineShow={false}
            fullWidth={true}
            style={styles.textField}
            inputStyle={styles.inputStyle}
            hintStyle={styles.hintStyle}
          />
    </div>
      );

  }
}


export default SearchBox;
