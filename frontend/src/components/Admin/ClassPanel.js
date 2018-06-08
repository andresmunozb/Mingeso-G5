import React , {Component} from 'react';
import Axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {Panel,Button,Form,FormControl,FormGroup,Col,Modal,ButtonGroup,Grid,Row} from 'react-bootstrap';


const columns = [{
    dataField: 'idClass',
    text: 'ID',
    headerAlign: 'center',
    align: 'center',
    headerAttrs: { width: '20%' }
  }, {
    dataField: 'nameClass',
    text: 'Curso',
    headerAlign: 'center',
    align: 'center',
    headerAttrs: { width: '80%' }
  },];

class ClassPanel extends Component {

    constructor(props) {    
        super(props);
        this.state = {
            classes: [],
            modalNew:false,
            modalEdit:false,
            nameNewClass:'',
            selected:[],
            search: '',
            classesFiltered: [],
            nameEdit:'',
            id:null,
        }
        this.getClasses = this.getClasses.bind(this);//Listo
        this.deleteClass = this.deleteClass.bind(this); //Listo 
        this.deleteClasses = this.deleteClasses.bind(this); //Listo
        this.createClass = this.createClass.bind(this); //Listo
        this.updateClass = this.updateClass.bind(this); //Listo

        
        
        
        this.handleOnSelect = this.handleOnSelect.bind(this); //Listo
        this.handleOnSelectAll = this.handleOnSelectAll.bind(this); //Listo
        this.updateSearch = this.updateSearch.bind(this); //Listo

        //Create Class
        this.closeModalNew = this.closeModalNew.bind(this);
        this.showModalNew = this.showModalNew.bind(this);
        this.updateNameNewClass = this.updateNameNewClass.bind(this);

        //Update Class
        this.closeModalEdit = this.closeModalEdit.bind(this);
        this.showModalEdit = this.showModalEdit.bind(this);
        this.updateNameEdit = this.updateNameEdit.bind(this)




    }


    //Servicios
    getClasses(){
        Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/classes/')
        .then( res => {
            const classes = res.data;
            this.setState({classes,search:'',classesFiltered:classes});
        })
    }
    deleteClass(id){
        const url = 'http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/classes/'.concat(id).concat('/delete');
        console.log(url)
        Axios.delete(url)
        .then( res => {
            this.getClasses();
        });
    }

    deleteClasses(){
        
        this.state.selected.map((id)=>this.deleteClass(id));
        this.setState({selected:[]});
    }

    createClass(){
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "@crossorigin",
            }
          };
        const newClass = {nameClass:this.state.nameNewClass}
        Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/classes/create',newClass,axiosConfig)
        .then( res => {
            this.getClasses();
        })
        this.setState({nameNewClass:''})
        this.closeModalNew();
    }
    updateClass(){
        let jsonEdit = {nameClass:this.state.nameEdit}
      
        Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/classes/'+this.state.id+'/edit',jsonEdit)
              .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                this.closeModalEdit();
                this.getClasses();
                
              })
      }

    //Manejo de Table
    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
          this.setState(() => ({
            selected: [...this.state.selected, row.idClass]
          }));
        } else {
          this.setState(() => ({
            selected: this.state.selected.filter(x => x !== row.idClass)
          }));
        }
      }
      
    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.idClass);
        if (isSelect) {
            this.setState(() => ({
            selected: ids
            }));
        } 
        else {  
            this.setState(() => ({
            selected: []
            }));
        }
    }
    updateSearch(event){

        var search = event.target.value;
        var classesFiltered = this.state.classes.filter(function(element) {
          return element.nameClass.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
        this.setState({search,classesFiltered});
  
      }
    



    closeModalNew() {
        this.setState({ modalNew: false });
    }
    
    showModalNew() {
        this.setState({ modalNew: true });
    }

    updateNameNewClass(event){
      this.setState({
          nameNewClass:event.target.value,
      })
    }
    

    

    closeModalEdit() {
        this.setState({ modalEdit: false });
    }
      
    showModalEdit() {
        if(this.state.selected.length > 1){
            alert("Debe seleccionar solamente un curso")
        }
        else if(this.state.selected.length < 1){
            alert("Debe seleccionar un curso para editar")
        }
        else{
            let id = this.state.selected[0];
            let clase = this.state.classes.find((e)=> e.idClass === id);
            let nameEdit =  clase.nameClass;
            this.setState({ modalEdit: true,nameEdit,id });
        }
    }
    updateNameEdit(event){
        this.setState({
            nameEdit:event.target.value,
        })
    }

    
   

    
    
    
    componentWillMount(){
        this.getClasses();
    }

    
    render(){
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.state.selected,
            onSelect: this.handleOnSelect,
            onSelectAll: this.handleOnSelectAll
          };
          //console.log(this.state.selected);
        return(
            <div>
            <Grid>
            <Row>
                <Col xs={12} smOffset={1} sm={10} mdOffset={3} md={6}>
            <Panel bsStyle="primary">
            <Panel.Heading>
                <Panel.Title componentClass="h3">
                    Cursos
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
            


            <Form horizontal>
              <FormGroup>
              <Col  xs={12} >
              <ButtonGroup bsSize="small">
              <Button  bsStyle="success" bsSize="small" onClick={this.showModalNew} >Nuevo</Button>
              <Button onClick={this.showModalEdit} bsStyle="primary" bsSize="small"  >Editar</Button>
              <Button onClick={this.deleteClasses} bsStyle="danger" bsSize="small"  >Borrar</Button>
              
              </ButtonGroup>
              </Col>
              </FormGroup>
              <FormGroup>
              <Col smOffset={0} sm={12}>
                  <FormControl type="text" placeholder="Buscar" value={this.state.search} onChange={this.updateSearch} />
                </Col>
              </FormGroup>
            </Form>
            <BootstrapTable keyField="idClass" 
              data={ this.state.classesFiltered } 
              columns={ columns } 
              selectRow={ selectRow } 
              pagination={ paginationFactory()}
              noDataIndication="No existen datos para mostrar"
              />
            
            </Panel.Body>
        </Panel>
        </Col>
                </Row> 
                </Grid>
            
        <Modal backdrop='static' show={this.state.modalNew} onHide={this.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Nuevo Curso</Modal.Title>
            </Modal.Header>
            <Form horizontal>
                <Modal.Body>

                    
                    <FormGroup controlId="formHorizontalEmail">
                    
                    <Col xs={12}>
                        <FormControl 
                            type="text" 
                            placeholder="Nombre del curso" 
                            value={this.state.nameNewClass}
                            onChange={this.updateNameNewClass} 
                            />
                    </Col>
                    </FormGroup>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button  bsStyle="danger" onClick={this.closeModalNew}>Cancelar</Button>
                    <Button  bsStyle="primary" onClick={this.createClass}>Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>

        <Modal backdrop='static' show={this.state.modalEdit} onHide={this.closeModalEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Curso</Modal.Title>
            </Modal.Header>
            <Form horizontal>
                <Modal.Body>

                    
                    <FormGroup controlId="formHorizontalEmail">
                    
                    <Col xs={12}>
                        <FormControl 
                            type="text" 
                            placeholder="Nombre del curso" 
                            value={this.state.nameEdit}
                            onChange={this.updateNameEdit}
                            />
                    </Col>
                    </FormGroup>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button  bsStyle="danger" onClick={this.closeModalEdit}>Cancelar</Button>
                    <Button  bsStyle="primary" onClick={this.updateClass}>Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
          </div>

        );
    }
}

export default ClassPanel;
