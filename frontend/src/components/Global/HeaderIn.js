import React,{Component} from 'react';
import {Button, Nav, NavItem} from 'react-bootstrap';
import PropTypes from 'prop-types';

class HeaderIn extends Component{

    render(){
        return(
            
            <Nav pullRight>
                <NavItem >
                <Button bsStyle="danger" onClick={this.props.onAuth}>Login</Button>
                </NavItem>
            </Nav>
        );
    }
}

HeaderIn.propTypes = {
    onAuth: PropTypes.func.isRequired
}

export default HeaderIn;