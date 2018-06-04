import React , {Component} from 'react'
import {Col,Panel,Table, Button, Modal, Form, FormGroup,FormControl} from 'react-bootstrap';
import axios from 'axios';

const styleStart = {
    width:"10%",
    textAlign: 'center'
  };
  const styleMid = {
    width:"50%",
    textAlign: 'center'
  };
  const styleEnd = {
    width:"40%",
    textAlign: 'center'
  };

class ClassPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            showNewClass:false,
            nameNewClass:'',
        }

        this.getClasses = this.getClasses.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
        this.closeNewClass = this.closeNewClass.bind(this);
        this.showNewClass = this.showNewClass.bind(this);
        this.updateNameNewClass = this.updateNameNewClass.bind(this);
        this.createClass = this.createClass.bind(this);

    }
    getClasses(){
        console.log(this.state);
        axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/classes/')
        .then( res => {
            const classes = res.data;
            this.setState({classes});
            console.log(this.state);
        })
    }

    deleteClass(id){
        const url = 'http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/classes/'.concat(id).concat('/delete');
        console.log(url)
        axios.delete(url)
        .then( res => {
            this.getClasses();
        });

    }
    createClass(){
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "@crossorigin",
            }
          };
        const newClass = {nameClass:this.state.nameNewClass}
        axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/classes/create',newClass,axiosConfig)
        .then( res => {
            this.getClasses();
           
        })
        this.setState({nameNewClass:''})
        this.closeNewClass();
        
    }

    updateNameNewClass(event){
        this.setState({
            nameNewClass:event.target.value,
        })
        console.log(this.state.nameNewClass)
    }

    closeNewClass() {
        this.setState({ showNewClass: false });
    }
    
    showNewClass() {
        this.setState({ showNewClass: true });
    }
    

    componentWillMount(){
        this.getClasses();
    }

    render(){
        return(
            <div>
                <Panel bsStyle="primary">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">
                                    
                                Sección
                                <Button className="pull-right" bsStyle="success" bsSize="small" onClick={this.showNewClass}>Add</Button>
                                    </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                            
                                <Table  bordered  hover responsive >
                                <thead >
                                    <tr>
                                    <th style={styleStart}>#</th>
                                    <th style={styleMid}>Sección</th>
                                    <th style={styleEnd}>Acción</th>
                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {this.state.classes && this.state.classes.map((clase,key)=>
                                        <tr key={key}>
                                            <th style={styleStart}>{clase.idClass}</th>
                                            <th style={styleMid}>{clase.nameClass}</th>
                                            <th style={styleEnd}>
                                                <Button bsStyle="primary" bsSize="small"  >
                                                    Editar
                                                </Button>
                                                <Button onClick={() => this.deleteClass(clase.idClass)} bsStyle="danger" bsSize="small"  >
                                                    Borrar
                                                </Button>
                                            </th>
                                        </tr>                            
                                    )}
                                    
                                </tbody>
                            </Table>
                            </Panel.Body>
                        </Panel>   
        <Modal backdrop='static' show={this.state.showNewClass} onHide={this.closeNewClass}>
            <Modal.Header closeButton>
                <Modal.Title>Nueva Sección</Modal.Title>
            </Modal.Header>
            <Form horizontal>
                <Modal.Body>

                    
                    <FormGroup controlId="formHorizontalEmail">
                    
                    <Col xs={12}>
                        <FormControl 
                            type="text" 
                            placeholder="Nombre de la sección" 
                            value={this.state.nameNewClass}
                            onChange={this.updateNameNewClass} 
                            />
                    </Col>
                    </FormGroup>

                    
                    
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button  bsStyle="danger" onClick={this.closeNewClass}>Cancelar</Button>
                    <Button  bsStyle="primary" onClick={this.createClass}>Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>  
            </div>
        );
    }
}

export default ClassPanel;