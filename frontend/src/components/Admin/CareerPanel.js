import React,{Component} from 'react';
import {Col,Panel,Table, Button, Modal, Form, FormGroup,FormControl} from 'react-bootstrap';
import axios from 'axios'

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


class CareerPanel extends Component{
    constructor(props) {    
        super(props);
        this.state = {
            careers: [],
            showNewCareer:false,
            nameNewCareer:'',
        }
        this.getCareers = this.getCareers.bind(this);
        this.deleteCareer = this.deleteCareer.bind(this);
        this.closeNewCareer = this.closeNewCareer.bind(this);
        this.showNewCareer = this.showNewCareer.bind(this);
        this.updateNameNewCareer = this.updateNameNewCareer.bind(this);
        this.createCareer = this.createCareer.bind(this);

    }

    getCareers(){
        axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/careers/')
        .then( res => {
            const careers = res.data;
            this.setState({careers});
        })
    }

    deleteCareer(id){
        const url = 'http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/careers/'.concat(id).concat('/delete');
        console.log(url)
        axios.delete(url)
        .then( res => {
            this.getCareers();
        });
        
    }
    
    createCareer(){
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "@crossorigin",
            }
          };
        const newCareer = {nameCareer:this.state.nameNewCareer}
        axios.post('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/careers/create',newCareer,axiosConfig)
        .then( res => {
            this.getCareers();
           
        })
        this.setState({nameNewCareer:''})
        this.closeNewCareer();
        
    }
    updateNameNewCareer(event){
        this.setState({
            nameNewCareer:event.target.value,
        })
        console.log(this.state.nameNewCareer)
    }

    closeNewCareer() {
        this.setState({ showNewCareer: false });
    }
    
    showNewCareer() {
        this.setState({ showNewCareer: true });
    }

    componentWillMount(){
        this.getCareers();
    }

    render(){
        return(
            <div>
            <Panel bsStyle="primary">
            <Panel.Heading>
                <Panel.Title componentClass="h3">
                    Carreras
                    <Button className="pull-right" bsStyle="success" bsSize="small" onClick={this.showNewCareer} >Add</Button>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <Table  bordered  hover responsive>
                <thead>
                    <tr>
                    <th style={styleStart}>#</th>
                    <th style={styleMid}>Carrera</th>
                    <th style={styleEnd}>Acción</th>
                    
                    </tr>
                </thead>
                <tbody>
                    
                    {this.state.careers && this.state.careers.map((clase,key)=>
                        <tr key={key}>
                            <th style={styleStart}>{clase.idCareer}</th>
                            <th style={styleMid}>{clase.nameCareer}</th>
                            <th style={styleEnd}>
                                <Button bsStyle="primary" bsSize="small"  >
                                    Editar
                                </Button>
                                <Button onClick={() => this.deleteCareer(clase.idCareer)} bsStyle="danger" bsSize="small"  >
                                    Borrar
                                </Button>
                            </th>
                        </tr>                            
                    )}
                    
                </tbody>
            </Table>
            </Panel.Body>
        </Panel>

        <Modal backdrop='static' show={this.state.showNewCareer} onHide={this.closeNewCareer}>
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
                    <Button  bsStyle="danger" onClick={this.closeNewCareer}>Cancelar</Button>
                    <Button  bsStyle="primary" onClick={this.createCareer}>Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>   
        </div>
        );
    }
}

export default CareerPanel;