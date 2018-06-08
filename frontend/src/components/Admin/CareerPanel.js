import React , {Component} from 'react';
import Axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {Panel,Button,Form,FormControl,FormGroup,Col,Modal,ButtonGroup,Grid,Row} from 'react-bootstrap';


const columns = [{
    dataField: 'idCareer',
    text: 'ID',
    headerAlign: 'center',
    align: 'center',
    headerAttrs: { width: '20%' }
  }, {
    dataField: 'nameCareer',
    text: 'Carrera',
    headerAlign: 'center',
    align: 'center',
    headerAttrs: { width: '80%' }
  },];

  



  

class CareerPanel extends Component {

    constructor(props) {    
        super(props);
        this.state = {
            careers: [],
            modal:false,
            modalEdit:false,
            nameNewCareer:'',
            selected:[],
            search: '',
            carrersFiltered: [],
            nameEdit:'',
            id:null,
        }
        this.getCareers = this.getCareers.bind(this);
        this.deleteCareer = this.deleteCareer.bind(this);
        this.deleteCareers = this.deleteCareers.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.updateNameNewCareer = this.updateNameNewCareer.bind(this);
        this.createCareer = this.createCareer.bind(this);
        
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleOnSelectAll = this.handleOnSelectAll.bind(this);
        this.updateSearch = this.updateSearch.bind(this);

        this.closeModalEdit = this.closeModalEdit.bind(this);
        this.showModalEdit = this.showModalEdit.bind(this);
        this.updateNameEdit = this.updateNameEdit.bind(this)
        this.updateCareer = this.updateCareer.bind(this);

    }

    closeModalEdit() {
      this.setState({ modalEdit: false });
    }
    
    showModalEdit() {
        if(this.state.selected.length > 1){
          alert("Debe solamente seleccionar una carrera")
        }
        else if(this.state.selected.length < 1){
          alert("Debe seleccionar una carrera para editar")
        }
        else{
          let id = this.state.selected[0];
          let career = this.state.careers.find((e)=> e.idCareer === id);
          let nameEdit =  career.nameCareer;
          this.setState({ modalEdit: true,nameEdit,id });
        }
    }
    updateNameEdit(event){
      this.setState({
        nameEdit:event.target.value,
      })
    }
    updateCareer(){
      let jsonEdit = {nameCareer:this.state.nameEdit}
    
      Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/careers/'+this.state.id+'/edit',jsonEdit)
            .then((res) => {
              console.log("RESPONSE RECEIVED: ", res);
              this.closeModalEdit();
              this.getCareers();
              
            })
    }

    updateSearch(event){

      var search = event.target.value;
      var carrersFiltered = this.state.careers.filter(function(element) {
        return element.nameCareer.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      });
      this.setState({search,carrersFiltered});

    }
    updateNameNewCareer(event){
      this.setState({
          nameNewCareer:event.target.value,
      })
    }
    closeModal() {
      this.setState({ modal: false });
    }
    
    showModal() {
        this.setState({ modal: true });
    }

    getCareers(){
        Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/careers/')
        .then( res => {
            const careers = res.data;
            this.setState({careers,search:'',carrersFiltered:careers});
        })
    }

    deleteCareer(id){
        const url = 'http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/careers/'.concat(id).concat('/delete');
        console.log(url)
        Axios.delete(url)
        .then( res => {
            this.getCareers();
        });
    }

    deleteCareers(){
        
        this.state.selected.map((id)=>this.deleteCareer(id));
        this.setState({selected:[]});
    }
    createCareer(){
      const axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "@crossorigin",
          }
        };
      const newCareer = {nameCareer:this.state.nameNewCareer}
      Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/careers/create',newCareer,axiosConfig)
      .then( res => {
          this.getCareers();
         
      })
      this.setState({nameNewCareer:''})
      this.closeModal();
      
  }

    
    
    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
          this.setState(() => ({
            selected: [...this.state.selected, row.idCareer]
          }));
        } else {
          this.setState(() => ({
            selected: this.state.selected.filter(x => x !== row.idCareer)
          }));
        }
      }
    
      handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.idCareer);
        if (isSelect) {
          this.setState(() => ({
            selected: ids
          }));
        } else {
          this.setState(() => ({
            selected: []
          }));
        }
      }
    componentWillMount(){
        this.getCareers();
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
                    Carreras
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
            


            <Form horizontal>
              <FormGroup>
              <Col  xs={12} >
              <ButtonGroup bsSize="small">
              <Button  bsStyle="success" bsSize="small" onClick={this.showModal} >Nuevo</Button>
              <Button onClick={this.showModalEdit} bsStyle="primary" bsSize="small"  >Editar</Button>
              <Button onClick={this.deleteCareers} bsStyle="danger" bsSize="small"  >Borrar</Button>
              
              </ButtonGroup>
              </Col>
              </FormGroup>
              <FormGroup>
              <Col smOffset={0} sm={12}>
                  <FormControl type="text" placeholder="Buscar" value={this.state.search} onChange={this.updateSearch} />
                </Col>
              </FormGroup>
            </Form>
            <BootstrapTable keyField="idCareer" 
              data={ this.state.carrersFiltered } 
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
        <Modal backdrop='static' show={this.state.modal} onHide={this.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Nueva Carrera</Modal.Title>
            </Modal.Header>
            <Form horizontal>
                <Modal.Body>

                    
                    <FormGroup controlId="formHorizontalEmail">
                    
                    <Col xs={12}>
                        <FormControl 
                            type="text" 
                            placeholder="Nombre de la carrera" 
                            value={this.state.nameNewCareer}
                            onChange={this.updateNameNewCareer} 
                            />
                    </Col>
                    </FormGroup>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button  bsStyle="danger" onClick={this.closeModal}>Cancelar</Button>
                    <Button  bsStyle="primary" onClick={this.createCareer}>Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>

        <Modal backdrop='static' show={this.state.modalEdit} onHide={this.closeModalEdit}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Carrera</Modal.Title>
            </Modal.Header>
            <Form horizontal>
                <Modal.Body>

                    
                    <FormGroup controlId="formHorizontalEmail">
                    
                    <Col xs={12}>
                        <FormControl 
                            type="text" 
                            placeholder="Nombre de la carrera" 
                            value={this.state.nameEdit}
                            onChange={this.updateNameEdit}
                            />
                    </Col>
                    </FormGroup>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button  bsStyle="danger" onClick={this.closeModalEdit}>Cancelar</Button>
                    <Button  bsStyle="primary" onClick={this.updateCareer}>Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
          </div>

        );
    }
}

export default CareerPanel;
