import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentDelete from 'material-ui/svg-icons/action/delete';
import ContentLookUp from 'material-ui/svg-icons/action/search';
import ContentCode from 'material-ui/svg-icons/action/code';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500, white, blue500} from 'material-ui/styles/colors';
import PageBase from './../containers/PageBase';
import TextField from 'material-ui/TextField';
import ReactPaginate from 'react-paginate';
import RaisedButton from 'material-ui/RaisedButton';
import Axios from 'axios'


const styles = {
  bttn: {
    margin: 12,
  },
  searchStyles: {
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
  },
floatingActionButton: {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
},
editButton: {
  fill: grey500
},
columns: {
  title: {
    width: '10%'
  },
  info: {
    width: '10%'
  },
  toCode: {
    width: '10%'
  },
  edit: {
    width: '10%'
  },
  delete: {
    width: '10%'
  }
}
};

// EN ESE ORDEN DE ARRIBA A ABAJO REEMPLAZAR ESTAS RUTAS
 //verEnunciadoProfesor

///editarEnunciadoProfesor
class TeacherTable extends Component {
 
  constructor(props) {
    super(props);
    console.log("Aqui deberia estar MIS PROPUS")
    console.log(props);
    this.state = {
      enunciados:props.enunciadosTotal,
      currentPage:props.presentPage,
      currentData: props.currentDataNow,
      selectedIssue: null,
      booleanButtonInitial: true,
      booleanButtonReal:false,
      selected: [-1]
    }
    this.issueDelete = this.issueDelete.bind(this);
    this.updateBooleanButtonReal = this.updateBooleanButtonReal.bind(this);
    this.updateBooleanButtonInitial = this.updateBooleanButtonInitial.bind(this);
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);


   }
   componentWillMount(){
     // CASO EXTREMO:
     //Se realiza esto si es que se borra todos los enunciados y se tiene un objeto vacio
     //Este no se puede mappear (iterar), por lo tanto se le asigna a la data actual como un arreglo vacio

      if(Object.keys(this.state.currentData).length === 0 && this.state.currentData.constructor === Object){
          this.setState({
            currentData: []
          })
      }
   }

  componentWillReceiveProps(nextProps) {
    // CASO "EXTREMO" (muy comun que le pase a un usuario pero es especial en como tratarlo):
     //Se realiza esta sentencia si es que se busca en la barra de buscar y no se encuentra ningun enunciado 
     //que tenga esa o esas letras en comun con algun enunciado
     //Este no se puede mappear (iterar) debido a que retorna un objeto vacio (no tiene metodo map y se cae) 
     //al no encontrar algun  enunciado, por lo tanto se le asigna a la data actual como un arreglo vacio
     //y no se carga nada debido a que no hay nada que coincida con lo buscado 
     //Se realiza en este metodo debido a que buscar cambia la data a mostrar SIN que se tenga que renderear
     //de nuevo este componente

     if(Object.keys(nextProps.currentDataNow).length === 0 && nextProps.currentDataNow.constructor === Object){
          this.setState({
            currentData: []
          })
     }
     //Ejecucion normal caso feliz
     //Se encuentra el enunciado al tener letras en comun con el buscador o se cambia de pagina simplemente
    else{
        this.setState({
          currentPage: nextProps.presentPage,
          currentData: nextProps.currentDataNow
        })
     }
  

  }
  updateBooleanButtonInitial(){
    if(this.state.selectedIssue === null){
          this.setState({booleanButtonInitial: false}, this.updateBooleanButtonReal)
      }
    else if(this.state.selected.length=== 0 ){
      this.setState({booleanButtonInitial: true}, this.updateBooleanButtonReal)

    }


  }
  updateBooleanButtonReal(){
    console.log(this.state.selectedIssue)
    if(this.state.booleanButtonReal){
      this.setState({booleanButtonReal: false},this._onRowSelection)
  }
  else{
    this.setState({booleanButtonReal: true},this._onRowSelection)

  }
}
isSelected = (index) => {
  var elegir = -1
  for(var i = 0; i<this.state.currentData.length;i++){
      if(this.state.currentData[i].id === index){
          elegir = i
      }
  }
  if(this.state.selected[0] === elegir){
      return true;
  }
  else{
      return false
  }

};

handleRowSelection = (selectedRows) => {
  this.setState({
    selected: selectedRows,
  },this.updateBooleanButtonInitial);
};



  
  _onRowSelection = () => {
    if(this.state.selected.length === 0 ){
        this.setState({selectedIssue: null});
    }
    else{      
        const element = this.state.enunciados[this.state.selected[0]+this.state.currentPage*5];
        console.log(element)
        this.setState({selectedIssue:element });
    }

    
  }

  getKey(){
    return this.keyCount++;
  }
  render(){
    return(
      <Table  onRowSelection={this.handleRowSelection}
            >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.title}>Titulo enunciado</TableHeaderColumn>

                <TableHeaderColumn style={styles.columns.info}>Detalles</TableHeaderColumn>
                 
                <TableHeaderColumn style={styles.columns.edit}>Editar</TableHeaderColumn>
                
                <TableHeaderColumn style={styles.columns.delete}>Borrar</TableHeaderColumn>
                
                  
              </TableRow>
            </TableHeader>
        
         <TableBody>
         
            {this.state.currentData.map( item =>
                <TableRow key= {this.getKey()}selected={this.isSelected(item.id)}>
          
              <TableRowColumn style={styles.columns.title}>{item.title}</TableRowColumn>
                    <TableRowColumn style={styles.columns.info}>

                    { (this.state.booleanButtonInitial || !(this.isSelected(item.id))) &&
                      <FloatingActionButton zDepth={0}
                                                  mini={true}
                                                  backgroundColor={grey200}
                                                  iconStyle={styles.editButton}>
          
                                                  
                              <ContentLookUp />
                       </FloatingActionButton>
                    }
                    { this.state.booleanButtonReal && this.isSelected(item.id) &&

                      <Link to={{ pathname: '/verEnunciadoProfesor',
                                  state: { enunciado: this.state.selectedIssue }
                                  }}>
                          <FloatingActionButton zDepth={0}
                                                  mini={true}
                                                  backgroundColor={grey200}
                                                  iconStyle={styles.editButton}
                                                  disabled = {!(this.isSelected(item.id))}
                                                  >
                                                  
                              <ContentLookUp />
                            </FloatingActionButton>
                          </Link>



                    }
                        
                    </TableRowColumn>
          
                      <TableRowColumn style={styles.columns.edit}>
                        
                    { (this.state.booleanButtonInitial || !(this.isSelected(item.id))) &&
                      <FloatingActionButton zDepth={0}
                                                  mini={true}
                                                  backgroundColor={grey200}
                                                  iconStyle={styles.editButton}>
          
                                                  
                              <ContentCreate />
                       </FloatingActionButton>
                    }
                     { this.state.booleanButtonReal &&  this.isSelected(item.id) &&
                    
                    <Link to={{ pathname: '/editarEnunciado',
                    state: { enunciado: this.state.selectedIssue }
                    }}>
                    
                          <FloatingActionButton zDepth={0}
                                                  mini={true}
                                                  backgroundColor={grey200}
                                                  iconStyle={styles.editButton}
                                                  disabled = {!(this.isSelected(item.id))}
                                                  >
                                                  
                              <ContentCreate />
                            </FloatingActionButton>
                          </Link>



                    }
                    </TableRowColumn>
          
                      <TableRowColumn style={styles.columns.delete}>
                      { this.state.booleanButtonInitial &&
                      <FloatingActionButton zDepth={0}
                                                  mini={true}
                                                  backgroundColor={grey200}
                                                  iconStyle={styles.editButton}>
          
                                                  
                              <ContentDelete />
                       </FloatingActionButton>
                    }
                    { this.state.booleanButtonReal &&
                     <FloatingActionButton zDepth={0}
                                  mini={true}
                                                  backgroundColor={grey200}
                                                  iconStyle={styles.editButton}
                                                  onClick = {this.issueDelete}
                                                  disabled = {!(this.isSelected(item.id))}
                                                  >
          
                                                  
                          <ContentDelete />
                    </FloatingActionButton>



                    }
                    </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
      </Table>


    );

  }

  issueDelete = () =>{
    const ide = this.state.selectedIssue.id
    if(ide){
      console.log(ide)
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "@crossorigin",
        }
      };   
      Axios.delete('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/'+this.state.selectedIssue.id+'/delete',axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            this.props.issueErase();

          })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })
    }
    else{
      alert('Debes clickear algun elemento para borrar antes');
    }
  };
}




class StudentTable extends Component {
  constructor(props) {
    super(props);
    console.log("Aqui deberia estar el tipo, publicado o no publicado en el estudiante")
    console.log(props);
    this.state = {
      enunciados:props.enunciadosTotal,
      currentPage:props.presentPage,
      currentData: props.currentDataNow,
      selectedIssue: null,
      booleanButtonInitial: true,
        booleanButtonReal:false,
        selected: [-1]

    }

    this.updateBooleanButtonReal = this.updateBooleanButtonReal.bind(this);
    this.updateBooleanButtonInitial = this.updateBooleanButtonInitial.bind(this);
    this.keyCount = 0;
    this.getKey = this.getKey.bind(this);

   }
   componentWillMount(){
    // CASO EXTREMO:
     //Se realiza esto si es que se borra todos los enunciados y se tiene un objeto vacio
     //Este no se puede mappear (iterar), por lo tanto se le asigna a la data actual como un arreglo vacio
    if(Object.keys(this.state.currentData).length === 0 && this.state.currentData.constructor === Object){
        this.setState({
          currentData: []
        })
    }
 }
   

  componentWillReceiveProps(nextProps) {

     // CASO "EXTREMO" (muy comun que le pase a un usuario pero es especial en como tratarlo):
     //Se realiza esta sentencia si es que se busca en la barra de buscar y no se encuentra ningun enunciado 
     //que tenga esa o esas letras en comun con algun enunciado
     //Este no se puede mappear (iterar) debido a que retorna un objeto vacio (no tiene metodo map y se cae) 
     //al no encontrar algun  enunciado, por lo tanto se le asigna a la data actual como un arreglo vacio
     //y no se carga nada debido a que no hay nada que coincida con lo buscado 
     //Se realiza en este metodo debido a que buscar cambia la data a mostrar SIN que se tenga que renderear
     //de nuevo este componente

     if(Object.keys(nextProps.currentDataNow).length === 0 && nextProps.currentDataNow.constructor === Object){
      this.setState({
        currentData: []
      })
      }
      //Ejecucion normal caso feliz
      //Se encuentra el enunciado al tener letras en comun con el buscador o se cambia de pagina simplemente
      else{
          this.setState({
            currentPage: nextProps.presentPage,
            currentData: nextProps.currentDataNow
          })
      }

  }
  updateBooleanButtonInitial(){
     if(this.state.selectedIssue === null){
          this.setState({booleanButtonInitial: false}, this.updateBooleanButtonReal)
      }
    else if(this.state.selected.length=== 0 ){
      this.setState({booleanButtonInitial: true}, this.updateBooleanButtonReal)

    }


  }
  updateBooleanButtonReal(){

    if(this.state.booleanButtonReal){
      this.setState({booleanButtonReal: false}, this._onRowSelection)
  }
  else{
    this.setState({booleanButtonReal: true},this._onRowSelection)

  }
}

  isSelected = (index) => {
    var elegir = -1
    for(var i = 0; i<this.state.currentData.length;i++){
        if(this.state.currentData[i].id === index){
            elegir = i
        }
    }
    if(this.state.selected[0] === elegir){
        return true;
    }
    else{
        return false
    }

  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    }, this.updateBooleanButtonInitial);
  };



  
  _onRowSelection = () => {
    if(this.state.selected.length === 0 ){
      this.setState({selectedIssue: null});
    }
    else{      
      const element = this.state.enunciados[this.state.selected[0]+this.state.currentPage*5];
      console.log(element)
      this.setState({selectedIssue:element });
   }
    
  }

    getKey(){
      return this.keyCount++;
    }
  

  render(){
    return(
      <Table  className="tableBox" 
            onRowSelection={this.handleRowSelection}
            >
          <TableHeader>
                <TableRow>
                  <TableHeaderColumn style={styles.columns.title}>Titulo enunciado</TableHeaderColumn>

                  <TableHeaderColumn style={styles.columns.info}>Detalles</TableHeaderColumn>
                   
                    <TableHeaderColumn style={styles.columns.toCode}>Realizar</TableHeaderColumn>
                </TableRow>
          </TableHeader>

          <TableBody>
          {this.state.currentData.map(item =>
             <TableRow key= {this.getKey()}selected={this.isSelected(item.id)}>
                <TableRowColumn style={styles.columns.title}>{item.title}</TableRowColumn>
                    <TableRowColumn style={styles.columns.info}>
                    {  (this.state.booleanButtonInitial || !(this.isSelected(item.id))) &&
                      <FloatingActionButton zDepth={0}
                                                  mini={true}
                                                  backgroundColor={grey200}
                                                  iconStyle={styles.editButton}>
          
                                                  
                              <ContentLookUp />
                       </FloatingActionButton>
                    }
                    { this.state.booleanButtonReal && this.isSelected(item.id) &&
                      <Link to={{ pathname: '/verEnunciadoAlumno',
                      state: { enunciado: this.state.selectedIssue }
                      }}>
                      <FloatingActionButton zDepth={0}
                                                  mini={true}
                                                  backgroundColor={grey200}
                                                  iconStyle={styles.editButton}>
                                                 
                              <ContentLookUp />
                            </FloatingActionButton>
                          </Link>
                    }
                    </TableRowColumn>
                    <TableRowColumn style={styles.columns.toCode}>
                    { (this.state.booleanButtonInitial || !(this.isSelected(item.id))) &&
                      <FloatingActionButton zDepth={0}
                                                  mini={true}
                                                  backgroundColor={grey200}
                                                  iconStyle={styles.editButton}>
          
                              <ContentCode />
                       </FloatingActionButton>
                    }
                    { this.state.booleanButtonReal &&  this.isSelected(item.id) &&

                       <Link to={{ pathname: '/ejercitacionCodigo',
                            state: { enunciado: this.state.selectedIssue }
                        }}>
                        <FloatingActionButton zDepth={0}
                                                  mini={true}
                                                  backgroundColor={grey200}
                                                  iconStyle={styles.editButton}>
                                                  
                              <ContentCode/>
                            </FloatingActionButton>
                          </Link>



                    }
                    
                    </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
      </Table>


     );
    }


  }
class PaginationTablePage extends Component {
  constructor(props) {
   super(props);
   console.log("Aqui deberia estar el tipo, publicado o no publicado")
   console.log(props);

   this.state = {
     publicacion: props.publicado,
     currentPage:0,
     pageCount:0,
     offers :{},
     filterOffers: {},
     open: false,
     enunciados: [],
     selectedIssue: [],
     view: "",
     type: props.type,
     typeStudentBool: false,
     typeTeacherBool: false,

   }

   this.getPagination = this.getPagination.bind(this);
   this.getPaginationReal = this.getPaginationReal.bind(this);

   this.issueDelete = this.issueDelete.bind(this);
   this.detectIssue = this.detectIssue.bind(this);


   this.updateData = this.updateData.bind(this);
   this.setTables = this.setTables.bind(this);



  }

 componentDidMount() {
   this.getPagination();

 }

  handlePageClick = (data) => {
   let selected = data.selected;
   this.setState({currentPage:selected},this.updateData);
 }
 getPaginationReal(){
   console.log("deska")
   console.log(this.state.enunciados)
   let _this = this;
   let keys = Object.keys(this.state.enunciados); // Notice the .sort()!
    let pageLength = 5;
    let pageCount = Math.ceil(keys.length / pageLength);
    let currentPage = 1;
    let pages = [];
    let nextKey;
    let query;
    this.setState({pageCount:pageCount});
    for (let i = 0; i < pageCount; i++) {
     let key = keys[i * pageLength];
        if(this.state.enunciados.length >=1) {
            query = this.state.enunciados.slice(key, (i+1)*pageLength);
            pages.push(query);
        }
    }

    _this.setState({offers: pages, loading: false, filterOffers: pages},this.updateData);

 }
 
  getPagination(){
    if(this.props.publicado === "Publicado"){
       Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/published')
       .then(response => {
           this.setState({ enunciados: response.data },this.getPaginationReal );
           console.log(response.data)
       })
       .catch(function(error) {
           console.log(error)
       })


    }
    else if (this.props.publicado === "No publicado"){
     Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/unpublished')
     .then(response => {
         this.setState({ enunciados: response.data },this.getPaginationReal);        
         console.log(response.data)


     })
     .catch(function(error) {
         console.log(error)
     })
    }
    else{
     Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/')
     .then(response => {
         this.setState({ enunciados: response.data },this.getPaginationReal);        
         console.log(response.data)


     })
     .catch(function(error) {
         console.log(error)
     })
    }
    /*
    let _this = this;
   let keys = Object.keys(data); // Notice the .sort()!
    let pageLength = 5;
    let pageCount = Math.ceil(keys.length / pageLength);
    let currentPage = 1;
    let pages = [];
    let nextKey;
    let query;
    this.setState({pageCount:pageCount});
    for (let i = 0; i < pageCount; i++) {
     let key = keys[i * pageLength];
        if(data.length >=1) {
            query = data.slice(key, (i+1)*pageLength);
            pages.push(query);
        }
    }

    _this.setState({offers: pages, loading: false, filterOffers: pages});
   */
      
 }

 getPaginationSearch(data){
   let _this = this;
   let keys = Object.keys(data); // Notice the .sort()!
    let pageLength = 5;
    let pageCount = Math.ceil(keys.length / pageLength);
    let currentPage = 1;
    let pages = [];
    let nextKey;
    let query;
    this.setState({pageCount:pageCount});
    for (let i = 0; i < pageCount; i++) {
     let key = keys[i * pageLength];
        if(data.length >=1) {
            query = data.slice(key, (i+1)*pageLength);
            pages.push(query);
        }
    }

    _this.setState({offers: pages, loading: false, filterOffers: pages}, this.updateData);


 }

 filterList(event) {
   let obj = this.state.enunciados;
   let filteredArray = [];
   let filterObjects = [];
   Object.keys(obj).forEach(function (key) {
     filteredArray.push(obj[key]);
   });
   
   filteredArray = filteredArray.filter((item) => {
     return item.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1;

   });
   this.getPaginationSearch(filteredArray);
   
 }
 updateData(){
   let {filterOffers,offers, isFirstPage, isLastPage, currentPage} = this.state;
   let currentDataNow = {};
    let currentUsers = [];
    for (let i = 0; i < filterOffers.length; i++) {
      if(currentPage === i){
         currentDataNow = filterOffers[i];
      }
    
    }
    this.setState({currentData: currentDataNow}, this.setTables);



 }

 setTables(){
     if( this.state.type === "alumn"){
      
            this.setState({
              typeStudentBool: true

          });
       
     }
     else{
      
          this.setState({
            typeTeacherBool: true

              });
        
     }



 }
 _onRowSelection(rows) {
   const element = this.state.enunciados[rows[0]+this.state.currentPage*5];
   this.setState({selectedIssue:element },this.funcione);
   
 }
 
render() {
  if (this.state.view === "Redraw") return <PaginationTablePage publicado= {this.state.publicacion} type= {this.state.type}/>;

 return (
   <div>

       <div className="tableElm" >
         <TextField
           onChange={this.filterList.bind(this)}
           hintText={"Buscar ..."}
           underlineShow={false}
           fullWidth={false}
         />
       <div className="commentBox" id="react-paginate">
           <ReactPaginate previousLabel={"Anterior"}
                      nextLabel={"Siguiente"}
                      breakLabel={<a href="">...</a>}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"} />
       </div>
      </div>

      {this.state.typeStudentBool && 
      <StudentTable currentDataNow={this.state.currentData} presentPage= {this.state.currentPage} enunciadosTotal={this.state.enunciados} />
     
      }
      {this.state.typeTeacherBool && 
         <TeacherTable type= { this.state.type} currentDataNow={this.state.currentData} presentPage= {this.state.currentPage}  
         enunciadosTotal={this.state.enunciados} issueErase = {this.issueDelete} />
     
      }
    
   </div>
 );
}



   detectIssue = (ruta) => {

     const ide = this.state.selectedIssue
     if(ide){
       
     
     }
     else{
       alert('Debes clickear algun elemento para hacer algo antes');

     }


   }


   issueDelete = () =>{
    console.log("paso por aqui por lo menos");
    this.setState({view: "Redraw"})

   };
  
};
//           <TableRows  current={currentData} selectedIssue={this.state.selectedIssue} />
/*  {map(currentData, item =>
              <TableRow key={item.id}>
            {     <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>}
            <TableRowColumn style={styles.columns.name}>{item.title}</TableRowColumn>
            {   <TableRowColumn style={styles.columns.price}>{item.price}</TableRowColumn>}
                {}
                <TableRowColumn style={styles.columns.edit}>
                  <Link className="button" to="/nuevoEnunciado">
                    <FloatingActionButton zDepth={0}
                                          mini={true}
                                          backgroundColor={grey200}
                                          iconStyle={styles.editButton}>
                      <ContentCreate  />
                    </FloatingActionButton>
                  </Link>
                </TableRowColumn>
                <TableRowColumn style={styles.columns.delete}>
                  
                    <FloatingActionButton zDepth={0}
                                          mini={true}
                                          backgroundColor={grey200}
                                          iconStyle={styles.editButton}
                                          onClick = {this.issueDelete}
                                          >
                                         
                      <ContentDelete  />
                    </FloatingActionButton>
                  
                </TableRowColumn>
              </TableRow>
            )}*/

export default PaginationTablePage;