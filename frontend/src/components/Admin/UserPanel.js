import React,{Component} from 'react'; 
import Axios from 'axios'; 
import {Panel, ButtonGroup,Form,FormControl,Button, Grid, Row, Col,FormGroup,Modal,ControlLabel} from 'react-bootstrap' 
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const columns = [{
    dataField: 'id',
    text: 'ID',
    headerAlign: 'center',
    align: 'center',
    headerAttrs: { width: '10%' }
  }, {
    dataField: 'email',
    text: 'Email',
    headerAlign: 'center',
    align: 'center',
    headerAttrs: { width: '20%' }
  }, {
    dataField: 'role.nameRol',
    text: 'Rol',
    headerAlign: 'center',
    align: 'center',
    headerAttrs: { width: '20%' }
  },
  {
    dataField: 'clase.nameClass',
    text: 'Curso',
    headerAlign: 'center',
    align: 'center',
    headerAttrs: { width: '20%' }
  },
  {
    dataField: 'career.nameCareer',
    text: 'Carrera',
    headerAlign: 'center',
    align: 'center',
    headerAttrs: { width: '20%' }
  },
];


class UserPanel extends Component{ 
    constructor(props) {     
        super(props); 
        this.state = { 
            users: [], 
            usersFiltered: [], 
            modalNew:false, 
            modalEdit:false, 
            selected:[], 
            search: '',
            role:'role', //combobox
            clase:'class', //Combobox
            career:'career', //Combobox
            careers:[],
            classes:[],
            email:'',  

             
        } 

        //Servicios
        this.getUsers = this.getUsers.bind(this);
        this.deleteUsers = this.deleteUsers.bind(this);
        this.getClasses = this.getClasses.bind(this);
        this.getCareers = this.getCareers.bind(this);


        //abrir y cerrar modales
        this.showModalNew = this.showModalNew.bind(this);
        this.closeModalNew = this.closeModalNew.bind(this);
        this.showModalEdit = this.showModalEdit.bind(this);
        this.closeModalEdit = this.closeModalEdit.bind(this);

        //Funciones para inputs
        this.updateEmail = this.updateEmail.bind(this);
        this.updateRole = this.updateRole.bind(this);
        this.updateCareer= this.updateCareer.bind(this);
        this.updateClass = this.updateClass.bind(this);

        //Manejo de las tablas
        this.updateSearch = this.updateSearch.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleOnSelectAll = this.handleOnSelectAll.bind(this);

       
    } 

    createUser(){
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "@crossorigin",
            }
          };
        const newUser = {email:this.state.email}
        Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/users/create',newUser,axiosConfig)
        .then( res => {
            this.getUsers();
        })
        this.setState({nameNewClass:''})
        this.closeModalNew();
    }
    

    //Servicios
    getUsers(){
        Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/users/')
        .then( res => {
            const users = res.data;
            this.setState({users,search:'', usersFiltered :users});
        })
    }

    deleteUsers(){
    }


    
    
    getClasses(){
        Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/classes/')
        .then( res => {
            const classes = res.data;
            this.setState({classes});
        })
    }
    getCareers(){
        Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/careers/')
        .then( res => {
            const careers = res.data;
            this.setState({careers});
        })
    }

    


    //Abrir y cerrar modales
    showModalNew(){
        this.setState({
            modalNew:true,
        });
    }
    closeModalNew(){
        this.setState({
            modalNew:false,
        });
    }
    showModalEdit(){
        this.setState({
            modalEdit:true,
        });
    }
    closeModalEdit(){
        this.setState({
            modalEdit:false,
        });
    }
    //Funciones para inputs
    updateEmail(event){
        this.setState({
            email:event.target.value,
        });
    }
    updateRole(event) {
        let role = event.target.value;
        if(role !== 'student'){
            this.setState({role,career:'career',clase:'class'});
        }
        else{
            this.setState({role});
        }
    }
    updateCareer(event){
        this.setState({career:event.target.value});
    }
    updateClass(event){
        this.setState({class:event.target.value});
    }

    //Manejo de tablas
    updateSearch(event){
        var search = event.target.value;
        var usersFiltered = this.state.users.filter(function(element) {
            if (element.career !== null && (element.career.nameCareer.toLowerCase().indexOf(search.toLowerCase()) !== -1) ){
                return true;
            }
            else if(element.clase !== null && (element.clase.nameClass.toLowerCase().indexOf(search.toLowerCase()) !== -1)){
                return true;
            }
            else if(element.email.toLowerCase().indexOf(search.toLowerCase()) !== -1){
                return true;
            }
            else if(element.role.nameRol.toLowerCase().indexOf(search.toLowerCase()) !== -1){
                return true;
            }
            return false;
        });
        this.setState({search,usersFiltered});
  
      }
    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
          this.setState(() => ({
            selected: [...this.state.selected, row.id]
          }));
        } else {
          this.setState(() => ({
            selected: this.state.selected.filter(x => x !== row.id)
          }));
        }
      }
      
    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.id);
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


    //Acciones que se hacen antes de redenderizar el componente
    componentWillMount(){
        this.getUsers();
        this.getCareers();
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
        console.log(this.state.email);
        console.log(this.state.role);
        //console.log(this.state.users);  
        return( 
            <div> 
                <Grid> 
                    <Row> 
                        <Col xs={12} smOffset={1} sm={10} mdOffset={3} md={6}> 
                            <Panel bsStyle="primary"> 
                                <Panel.Heading> 
                                    <Panel.Title componentClass="h3"> 
                                    Usuarios 
                                    </Panel.Title> 
                                </Panel.Heading> 
                                <Panel.Body> 
                                <Form horizontal> 
                                    <FormGroup> 
                                        <Col  xs={12} > 
                                            <ButtonGroup bsSize="small"> 
                                                <Button  bsStyle="success" bsSize="small" onClick={this.showModalNew} >Nuevo</Button> 
                                                <Button onClick={this.showModalEdit} bsStyle="primary" bsSize="small"  >Editar</Button> 
                                                <Button onClick={this.deleteUsers} bsStyle="danger" bsSize="small"  >Borrar</Button> 
                                            </ButtonGroup> 
                                        </Col> 
                                    </FormGroup> 
                                    <FormGroup> 
                                        <Col smOffset={0} sm={12}> 
                                            <FormControl type="text" 
                                            placeholder="Buscar" 
                                            value={this.state.search} 
                                            onChange={this.updateSearch} 
                                            onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}/> 
                                        </Col> 
                                    </FormGroup> 
                                    
                                </Form>
                                
                                <BootstrapTable keyField="id"
                                data={ this.state.usersFiltered }  
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

                <Modal backdrop='static' show={this.state.modalNew} onHide={this.closeModalNew}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nuevo Usuario</Modal.Title>
                    </Modal.Header>
                    <Form horizontal>
                        <Modal.Body>
                            <FormGroup controlId="formHorizontalEmail">
                            <Col xs={6}>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl 
                                    type="email" 
                                    placeholder="Email" 
                                    value={this.state.email}
                                    onChange={this.updateEmail} 
                                    onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}}
                                    />
                            </Col>
                            <Col xs={6}>
                                <ControlLabel>Rol</ControlLabel>
                                <FormControl value={this.state.role} onChange={this.updateRole} componentClass="select" placeholder="Rol">
                                    <option value="role">Seleccione un rol  </option>
                                    <option value="admin">Admin</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="student">Student</option>
                                </FormControl>
                                </Col>
                            
                            {this.state.role === 'student' ?<div>
                            <Col xs={6}>
                                <ControlLabel>Carrera</ControlLabel>
                                <FormControl value={this.state.career} onChange={this.updateCareer} componentClass="select">
                                    <option value="career">Seleccione una carrera</option>
                                    {this.state.careers.map((career,key)=> <option key={key} value={career.idCareer}> {career.nameCareer} </option>)}
                                </FormControl>
                                </Col>
                            <Col xs={6}>
                                <ControlLabel>Curso</ControlLabel>
                                <FormControl value={this.state.class} onChange={this.updateClass} componentClass="select" >
                                    <option value="class">Seleccione un curso</option>
                                    {this.state.classes.map((clase,key)=><option key={key} value={clase.idClass}>{clase.nameClass}</option>)}
                                </FormControl>
                                </Col>
                            </div>:null
                            }
                            </FormGroup>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button  bsStyle="danger" onClick={this.closeModalNew}>Cancelar</Button>
                            <Button  bsStyle="primary" onClick={this.createUser}>Guardar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div> 
        ); 
    } 
}    
 
export default UserPanel;