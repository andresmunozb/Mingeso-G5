import React , {Component} from 'react'
import {Grid,Row,Col} from 'react-bootstrap';
import CareerPanel from './CareerPanel';
import ClassPanel from './ClassPanel';


class ClassList extends Component{
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    render(){
        return(
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={6}>
                        <ClassPanel/>
                    </Col>
                    <Col xs={12} sm={12} md={6}>
                        <CareerPanel/>
                    </Col> 
                </Row> 
            </Grid>
        );
    }

}





export default ClassList;