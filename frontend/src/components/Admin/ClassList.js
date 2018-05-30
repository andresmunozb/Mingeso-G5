import React , {Component} from 'react'
import {Grid,Panel,Table} from 'react-bootstrap';

class ClassList extends Component{
    constructor(props) {
        super(props);

    }
    state ={
        data:[]
    }
    getClasses(){
        Axios.get('http://165.227.189.25:8080/backend-0.0.1-SNAPSHOT/exercises/1/published')
        .then(response => {
            console.log(response.data)
            this.setState({ data: response.data });
            setTimeout(5);
            })
        .catch(function(error) {
           console.log(error)
            })
    }
    render(){
        return(
            <Grid>
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                    <Table striped bordered condensed hover responsive>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Sección</th>
                            <th>Acción</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Mark</td>
                            </tr>                            
                        </tbody>
                    </Table>
                    </Panel.Body>
                </Panel>    
            </Grid>
        );
    }

}

export default ClassList;