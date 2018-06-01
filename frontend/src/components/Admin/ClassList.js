import React , {Component} from 'react'
import {Grid,Panel,Table, Button} from 'react-bootstrap';
import Axios from 'axios'

class ClassList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
        }

    }


    componentWillMount(){
        console.log(this.state);
        Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/users/')
        .then( res => {
            const classes = res.data;
            this.setState({classes});
            console.log(this.state);
        })
        

    }
    render(){
        return(
            
            <Grid>
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">
                            Panel heading 
                            <Button>Add</Button>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                    <Table  bordered condensed hover responsive>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Sección</th>
                            <th>Acción</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.state.classes && this.state.classes.map((clase,key)=>
                                <tr key={key}>
                                    <th>{clase.id}</th>
                                    <th>{clase.email}</th>
                                    <th>Mark</th>
                                </tr>                            
                            )}
                            
                        </tbody>
                    </Table>
                    </Panel.Body>
                </Panel>    
            </Grid>
        );
    }

}

export default ClassList;