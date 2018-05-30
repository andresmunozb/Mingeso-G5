import React , {Component} from 'react';
import {Grid,Panel} from 'react-bootstrap';
class CareerList extends Component{
    render(){
        return(
            <Grid>
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        CareerList
                    </Panel.Body>
                </Panel>    
            </Grid>
        );
    }

}

export default CareerList;