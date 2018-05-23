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
import PageBase from '../containers/PageBase';
import Css from '../styles'
import Axios from 'axios'
import FormPage from './FormPage'

//props.location.state


class FormPageBase extends Component{
  constructor(props){
    console.log("estos son mis propus del base de los forms")
    
    console.log(props)
    super(props);
    this.state ={
      tituloPagina: props.title,
      navegacion:props.navegation,
      type: props.type,
      subtype: props.subtype,
      speciality: props.speciality,
      enunciadoPreDefinido: null,
      enunciadoNulo: [{title:"", description: "", published: "" }]
    }
  }

 
  componentWillMount(){
    if(this.props.location.state === undefined){
        this.setState({
          enunciadoPreDefinido:  [{title:"", description: "", published: "" }]
        })

    }
    else{
      this.setState({
        enunciadoPreDefinido: this.props.location.state.enunciado
      })

    }
  }
  render(){
      
      return(

            <div>

            {this.state.type === "littleForm" &&
                <PageBase title={this.state.tituloPagina}
                        navigation={this.state.navegation} type = "paper"
                  >
                <form style={Css.forms}>
                        {this.state.subtype === "lookUp" &&

                                <FormPage enunciado = {this.state.enunciadoPreDefinido}
                                          type = {this.state.subtype}
                                          speciality = {this.state.speciality}
                                />
                        }
                        {this.state.subtype === "edit" &&
                            <FormPage   enunciado = {this.state.enunciadoPreDefinido} 
                            type = {this.state.subtype}
                            speciality = {this.state.speciality}

                            />
                        }
                        {this.state.subtype === "new" &&
                    
                                 <FormPage type = {this.state.subtype}
                                             enunciado = {this.state.enunciadoNulo}
                                 />
                        }
                          
                        
                    </form>
                </PageBase>
                }

                 {this.state.type === "biggerForm" && 
                  <PageBase title={this.state.tituloPagina}
                        navigation={this.state.navegation} type = "paper2"  >
              
                    <form style={Css.forms2}>
                      <FormPage enunciado = {this.state.enunciadoPreDefinido} type= 'code' />
                    </form>
                  </PageBase>
                }
              </div>
                             
                );
  }


}

export default FormPageBase;