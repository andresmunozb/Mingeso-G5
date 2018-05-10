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
import Modal from 'react-responsive-modal';


const styles = {
      
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
  id: {
    width: '10%'
  },
  name: {
    width: '20%'
  },
  price: {
    width: '20%'
  },
  category: {
    width: '20%'
  },
  edit: {
    width: '10%'
  },
  delete: {
    width: '10%'
  }
}
};


class PaginationTablePage extends React.PureComponent {
   constructor(props) {
    super(props);
    console.log("Aqui deberia estar el tipo, publicado o no publicado")
    console.log(props);

    this.state = {
      publicacion: this.props,
      enunciados: [],
      currentPage:0,
      pageCount:0,
      offers :{},
      filterOffers: {}
    }

    this.getPagination = this.getPagination.bind(this);
   }

  componentDidMount() {
    this.getPagination(Data.tablePage.items);
  }

   handlePageClick = (data) => {
    let selected = data.selected;
    this.setState({currentPage:selected});
  }
  
   getPagination(data){
   /*  if(this.state.publicacion == "Publicado"){
        Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/published')
        .then(response => {
            this.setState({ enunciados: response.data });
        })
        .catch(function(error) {
            console.log(error)
        })


     }
     else{
             Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/unpublished')
              .then(response => {
                  this.setState({ enunciados: response.data });          

              })
              .catch(function(error) {
                  console.log(error)
              })
     }
    */

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
       
  }

  filterList(event) {
    let obj = Data.tablePage.items;
    let filteredArray = [];
    let filterObjects = [];
    Object.keys(obj).forEach(function (key) {
      filteredArray.push(obj[key]);
    });
    
    filteredArray = filteredArray.filter((item) => {
      return item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;

    });
    this.getPagination(filteredArray);
    
  }
 render() {
  let {filterOffers,offers, isFirstPage, isLastPage, currentPage} = this.state;
   let currentData = {};
    let currentUsers = [];
    for (let i = 0; i < filterOffers.length; i++) {
      if(currentPage == i){
         currentData = filterOffers[i];
      }
    
    }
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
       
       
        <Table  className="tableBox">
          <TableHeader>
            <TableRow>
          {/*   <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>*/}
              <TableHeaderColumn style={styles.columns.name}>Titulo enunciado</TableHeaderColumn>
          {/* <TableHeaderColumn style={styles.columns.price}>Price</TableHeaderColumn>*/}
               <TableHeaderColumn style={styles.columns.edit}>Editar</TableHeaderColumn>
          {/*    <TableHeaderColumn style={styles.columns.edit}>Editar</TableHeaderColumn>*/}
                 <TableHeaderColumn style={styles.columns.delete}>Borrar</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {map(currentData, item =>
              <TableRow key={item.id}>
            {/*     <TableRowColumn style={styles.columns.id}>{item.id}</TableRowColumn>*/}
                <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
            {/*     <TableRowColumn style={styles.columns.price}>{item.price}</TableRowColumn>*/}
                {/**/}
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
                  <Link className="button" to="/nuevoEnunciado">
                    <FloatingActionButton zDepth={0}
                                          mini={true}
                                          backgroundColor={grey200}
                                          iconStyle={styles.editButton}>
                      <ContentDelete  />
                    </FloatingActionButton>
                  </Link>
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
  );
 }
/*
    productDelete = () =>{
            
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "@crossorigin",
        }
      };   
      Axios.delete('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/products/delete/'+(this.state.propProduct.id).toString(),axiosConfig)
        .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            this.loadCancelar();

          })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })
        


    }*/

    /*
     onOpenModal = () => {
      if(!(this.isEmpty(this.state.propProduct))){ 
        this.setState({ open: true });
      }
      else{
        alert('No se ha seleccionado ningun item para eliminar, seleccione uno para poder eliminarlo');
      }
    };
    */
   /*

   onCloseModal = () => {
      this.setState({ open: false });
    };
   */

   /*
   onClick = {this.onOpenModal}
    <Modal open={open} onClose={this.onCloseModal} little >
                          <h2>Eliminar producto</h2>
                          <p>
                            ¿Esta seguro que desea eliminar el producto?
                          </p>
                          <div className="row">
                            <div className="col col-lg-6">
                              <input type="button"  className="btn btn-primary" value="Cancelar" onClick = {this.loadCancelar}></input>
                            </div>
                            <div className="col col-lg-6">
                              <input type="button"  className="btn btn-danger" value="Confirmar" onClick = {this.productDelete}></input>
                            </div>
                          </div>
                        </Modal>
   */
};

export default PaginationTablePage;