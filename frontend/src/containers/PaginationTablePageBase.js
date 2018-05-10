import React from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500, white, blue500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import TextField from 'material-ui/TextField';
import Data from '../data';
import map from 'lodash/map';
import ReactPaginate from 'react-paginate';
import PaginationTablePage from './PaginationTablePage'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';




class PaginationTablePageBase extends React.PureComponent {
   constructor(props) {
    super(props);
    this.state = {
        publicacion: "",
        options: ["Publicado", "No publicado"],
        abierto: false

    }

    this.getPagination = this.getPagination.bind(this);
   }

  componentDidMount() {
  }

   handlePageClick = (data) => {
    let selected = data.selected;
    this.setState({currentPage:selected});
  }
  
   getPagination(data){
  }

  filterList(event) {
  }
 render() {
  return (
    
    <PageBase title="Lista de enunciados"
              navigation="" type= "paper3"
             >
             <SelectField
              floatingLabelText="Estado"
              onChange={(evt, newIndex) => this.updateState(newIndex)} value={this.state.publicacion} 
              fullWidth={true}>
              {this.state.options.map(function(w, index){
              return  <MenuItem key={index} label={w} value={w}>{w}</MenuItem>;
                })}
            </SelectField>

            {this.state.abierto  && <PaginationTablePage  publicado = {this.state.publicacion} />
             }


    </PageBase>
  );
 }

 updateState(newIndex){
    console.log(this.state.abierto);
    if(this.state.abierto){
      console.log("pase por aqui");
      this.setState({
        publicacion: this.state.options[newIndex],
        abierto:false
      });
      setTimeout(()=>this.setState({abierto: true}), 100);
    }
    else{
      this.setState({
        publicacion: this.state.options[newIndex],
        abierto: true
      });

    }

  }
};

export default PaginationTablePageBase;