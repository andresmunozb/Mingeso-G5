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
            id:null,
            role:'role', //combobox
            clase:'class', //Combobox
            career:'career', //Combobox
            careers:[],
            classes:[],
            roles:[],
            email:'',  

             
        } 

        //Servicios
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.deleteUsers = this.deleteUsers.bind(this);
        this.getClasses = this.getClasses.bind(this);
        this.getCareers = this.getCareers.bind(this);
        this.getRoles = this.getRoles.bind(this);


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

        //Extra
        this.validateStudent = this.validateStudent.bind(this);
        this.validaUser = this.validaUser.bind(this);

       
    } 
    validateStudent(){
        if(this.state.clase === 'class'){
            return false;
        }
        else if(this.state.career==='career'){
            return false;
        }
        else if(this.state.email === ''){
            return false;
        }
        else if(this.state.role ==='role'){
            return false;
        }
        return true;
    }
    validaUser(){
        if(this.state.email === ''){
            return false;
        }
        else if(this.state.role ==='role'){
            return false;
        }
        return true;
    }
    createUser(){
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "@crossorigin",
            }
          };
        const newUser = {email:this.state.email}
        if(this.state.role ==="3"){
            if(!this.validateStudent()){
                alert("Debe rellenar todos los campos")
            }
            else{
                Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/users/create/'+
                this.state.role+'/'+
                this.state.clase+'/'+
                this.state.career,
                newUser,axiosConfig)
                .then( res => {
                    this.getUsers();
                })
                this.setState({clase:'class',career:'career',email:'',role:'role'})
                this.closeModalNew();
            }
        }
        else{
            if(!this.validaUser()){
                alert("Debe rellenar todos los campos");
            }
            else{
                Axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/users/create/'+this.state.role,
                newUser,axiosConfig)
                .then( res => {
                    this.getUsers();
                })
                this.setState({clase:'class',career:'career',email:'',role:'role'})
                this.closeModalNew();
            }
        }
        
    }
    

    updateUser(){
        const json = {email:this.state.email}

        if(this.state.role ==="3"){
            if(!this.validateStudent()){
                alert("Debe rellenar todos los campos")
                
            }
            else{
                console.log('Estoy aqui')
                Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/users/'+
                            this.state.id+
                            '/update/'+
                            this.state.role + '/' +
                            this.state.clase + '/' +
                            this.state.career 
                            ,json)
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    this.setState({role:'role',clase:'class',career:'career',email:''})
                    this.closeModalEdit();
                    this.getUsers();
                    
                })
            }
        }
        else{
            if(!this.validaUser()){
                alert("Debe rellenar todos los campos");
            }
            else{
                Axios.put('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/users/'+
                            this.state.id+
                            '/update/'+
                            this.state.role
                            ,json)
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                    this.setState({role:'role',clase:'class',career:'career',email:''})
                    this.closeModalEdit();
                    this.getUsers();
                    
                })
            }
        }
        

    }
    //Servicios
    getUsers(){
        Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/users/')
        .then( res => {
            const users = res.data;
            this.setState({users,search:'', usersFiltered :users});
        })
    }
    deleteUser(id){
        /*const url = 'http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/classes/'.concat(id).concat('/delete');
        console.log(url)
        Axios.delete(url)
        .then( res => {
            this.getClasses();
        });*/
    }

    deleteUsers(){
        
        this.state.selected.map((id)=>this.deleteUser(id));
        this.setState({selected:[]});
    }




    
    getRoles(){
        Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/roles/')
        .then( res => {
            const roles = res.data;
            this.setState({roles});
        })
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
            id:null,
            email:'',
            clase:'class',
            career:'career',
            role:'role',
        });
    }
    closeModalNew(){
        this.setState({
            modalNew:false,
        });
    }
    showModalEdit(){
        if(this.state.selected.length > 1){
            alert("Debe seleccionar solamente un curso")
        }
        else if(this.state.selected.length < 1){
            alert("Debe seleccionar un curso para editar")
        }
        else{
            const id = this.state.selected[0];
            const user = this.state.users.find((e)=> e.id === id);
            const email =  user.email;
            const role = user.role.idRol.toString();
            let clase;
            let career;
            user.clase ? clase=user.clase.idClass.toString():clase='class';
            user.career ? career=user.career.idCareer.toString():career='career';  
            this.setState({ modalEdit: true,email,id,role,clase,career });
        }
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
        if(role !== "3"){
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
        this.setState({clase:event.target.value});
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
            else if(element.email !== null && element.email.toLowerCase().indexOf(search.toLowerCase()) !== -1){
                return true;
            }
            else if(element.role !== null && element.role.nameRol.toLowerCase().indexOf(search.toLowerCase()) !== -1){
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
        this.getRoles();
    }

 
    render(){
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.state.selected,
            onSelect: this.handleOnSelect,
            onSelectAll: this.handleOnSelectAll
        };
        //console.log(this.state.email);
        //console.log(this.state.role);
        //console.log(this.state.users);
        console.log(this.state)  
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
                                    {this.state.roles.map((role,key)=> <option key={key} value={role.idRol}>{role.nameRol}</option>)}
                                </FormControl>
                                </Col>
                            
                            {this.state.role === "3" ?<div>
                            <Col xs={6}>
                                <ControlLabel>Curso</ControlLabel>
                                <FormControl value={this.state.clase} onChange={this.updateClass} componentClass="select" >
                                    <option value="class">Seleccione un curso</option>
                                    {this.state.classes.map((clase,key)=><option key={key} value={clase.idClass}>{clase.nameClass}</option>)}
                                </FormControl>
                                </Col>
                            <Col xs={6}>
                                <ControlLabel>Carrera</ControlLabel>
                                <FormControl value={this.state.career} onChange={this.updateCareer} componentClass="select">
                                    <option value="career">Seleccione una carrera</option>
                                    {this.state.careers.map((career,key)=> <option key={key} value={career.idCareer}> {career.nameCareer} </option>)}
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
                <Modal backdrop='static' show={this.state.modalEdit} onHide={this.closeModalEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Usuario</Modal.Title>
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
                                    {this.state.roles.map((role,key)=> <option key={key} value={role.idRol}>{role.nameRol}</option>)}
                                </FormControl>
                                </Col>
                            
                            {this.state.role === "3" ?<div>
                            
                            <Col xs={6}>
                                <ControlLabel>Curso</ControlLabel>
                                <FormControl value={this.state.clase} onChange={this.updateClass} componentClass="select" >
                                    <option value="class">Seleccione un curso</option>
                                    {this.state.classes.map((clase,key)=><option key={key} value={clase.idClass}>{clase.nameClass}</option>)}
                                </FormControl>
                                </Col>
                            <Col xs={6}>
                                <ControlLabel>Carrera</ControlLabel>
                                <FormControl value={this.state.career} onChange={this.updateCareer} componentClass="select">
                                    <option value="career">Seleccione una carrera</option>
                                    {this.state.careers.map((career,key)=> <option key={key} value={career.idCareer}> {career.nameCareer} </option>)}
                                </FormControl>
                                </Col>
                            </div>:null
                            }
                            </FormGroup>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button  bsStyle="danger" onClick={this.closeModalEdit}>Cancelar</Button>
                            <Button  bsStyle="primary" onClick={this.updateUser}>Guardar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div> 
        ); 
    } 
}    
 
export default UserPanel;