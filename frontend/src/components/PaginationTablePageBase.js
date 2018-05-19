import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500, white, blue500} from 'material-ui/styles/colors';
import PageBase from '../containers/PageBase';
import TextField from 'material-ui/TextField';
import map from 'lodash/map';
import ReactPaginate from 'react-paginate';
import PaginationTablePage from './PaginationTablePage'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


//props.route.algo, esta en "algo" los props

class PaginationTablePageBase extends Component {
   constructor(props) {
    super(props);
    console.log("estos son mis props de tabla paginacion");
    console.log(props);
    this.state = {
        publicacion: "",
        options: ["Publicado", "No publicado"],
        abierto: false,
        type: props.type,
        volvioDePagina: props.location.state.fromEnunciadoProfesor


    }

    this.getPagination = this.getPagination.bind(this);
   }
 
   shouldComponentUpdate(nextProps,nextState){
     //Si es que se va de una lista a otra, ver su tipo
     //si es diferente, entonces se updatea el tipo y se renderea

    //WARNING:
    //Formalmente, no se puede ir de una lista a otra debido a que cada usuario 
    //tiene solo una lista
    //Esto es para efectos de tener todos los links accesibles y andar probando
    console.log(nextProps)
    if(this.props.type !== nextProps.type){
      console.log("Me debo re-renderear")
        this.setState({
            type:nextProps.type
        })
        return true;
    }
    else{
      return true;
    }
   }


   
  
  componentWillMount() {
    console.log(this.state.volvioDePagina)
      if(this.state.volvioDePagina !== undefined){
        if(this.state.volvioDePagina){
          this.setState({
            publicacion: "Publicado",
            abierto: true,
            volvioDePagina:false
          });
        }
        else{
          this.setState({
            publicacion: "No publicado",
            abierto: true,
            volvioDePagina:false

          });
        }
          
      
      }
     


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
             {this.state.type === "prof" &&
             <div>
                  <SelectField
                            floatingLabelText="Estado"
                            onChange={(evt, newIndex) => this.updateState(newIndex)} value={this.state.publicacion} 
                            fullWidth={true}>
                            {this.state.options.map(function(w, index){
                            return  <MenuItem key={index} label={w} value={w}>{w}</MenuItem>;
                              })}
                  </SelectField>
                 
                    {this.state.abierto  && <PaginationTablePage  publicado = {this.state.publicacion} type = {this.state.type}/>
                       }
             </div>
            
              }
             {this.state.type === "alumn" &&
               <PaginationTablePage  publicado = {"Publicado"} type = {this.state.type}/>

            
            }

    </PageBase>
  );
 }

 updateState(newIndex, tipo){
    console.log(this.state.abierto);
    console.log("pase por aqui");
    console.log(newIndex);

    if(this.state.abierto){
      if(!this.state.volvioDePagina){

        console.log("pase por aqui");
        this.setState({
          publicacion: this.state.options[newIndex],
          abierto:false
        });
        setTimeout(()=>this.setState({abierto: true}), 50);
      }
      else{
        this.setState({
          volvioDePagina: undefined
        });
      }
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