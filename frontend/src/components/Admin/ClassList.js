import React , {Component} from 'react'
import {Grid,Row,Col} from 'react-bootstrap';
import CareerPanel from './CareerPanel';
//import ClassPanel from './ClassPanel';
import NewPanel from './NewPanel';


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
                        <NewPanel/>
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