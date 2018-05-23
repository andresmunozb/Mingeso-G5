import React,{Component} from 'react';
import {Button,Image,Nav, NavItem} from 'react-bootstrap';
import PropTypes from 'prop-types';

class HeaderOut extends Component{
    render(){
        return(
            <Nav pullRight>
                <NavItem >
                <Image width='32' src={this.props.user.photoURL} circle />
                </NavItem>
                <NavItem >
                <Button bsStyle="danger" onClick={this.props.onLogout}>Logout</Button>
                </NavItem>
            </Nav>
        );
    }
}
HeaderOut.propTypes = {
    user: PropTypes.object,
    onLogout: PropTypes.func.isRequired,
}

export default HeaderOut;