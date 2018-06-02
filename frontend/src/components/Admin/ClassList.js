import React , {Component} from 'react'
import {Grid,Panel,Table, Button, Row, Col,Modal, Form, FormGroup,FormControl,ControlLabel} from 'react-bootstrap';
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

class ClassList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            careers: [],
            showNewClass:false,
            showNewCareer:false,
            nameNewClass:'',
            nameNewCareer:'',
        }
        this.getCareers = this.getCareers.bind(this);
        this.getClasses = this.getClasses.bind(this);
        this.deleteCareer = this.deleteCareer.bind(this);
        this.deleteClass = this.deleteClass.bind(this);

        this.closeNewCareer = this.closeNewCareer.bind(this);
        this.closeNewClass = this.closeNewClass.bind(this);
        this.showNewCareer = this.showNewCareer.bind(this);
        this.showNewClass = this.showNewClass.bind(this);

        this.updateNameNewCareer = this.updateNameNewCareer.bind(this);
        this.createCareer = this.createCareer.bind(this);

    }
    //Career

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

    

    //Class
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

    closeNewClass() {
        this.setState({ showNewClass: false });
    }
    
    showNewClass() {
        this.setState({ showNewClass: true });
    }
    
    


    componentWillMount(){
        this.getClasses();
        this.getCareers();
    }

   
    /*<Form horizontal>
                                    
                                    <FormGroup bsSize="small"  controlId="formHorizontalEmail">
                                        <Col xs={12} sm={2}>
                                            Sección
                                        </Col>
                                        <Col xs={12} sm={7}>
                                            <FormControl 
                                                type="text" 
                                                placeholder="Buscar sección" 
                                                value={this.state.nameNewCareer} 
                                                />
                                        </Col>
                                        <Col xs={12} sm={3  }>
                                            <Button className="pull-right" bsStyle="success" bsSize="small" onClick={this.showNewClass}>Add</Button>
                                        </Col>
                                        </FormGroup>
                                    </Form>*/
    
    render(){
        return(
            
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={6}>
                    
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
                    </Col>

                    <Col xs={12} sm={12} md={6}>

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
                    </Col>

                    
                </Row> 
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
            </Grid>
        );
    }

}



export default ClassList;