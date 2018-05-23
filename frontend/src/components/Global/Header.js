import React,{Component} from 'react';
import {Navbar,Nav,MenuItem,NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import HeaderIn from './HeaderIn';
import HeaderOut from './HeaderOut';
import PropTypes from 'prop-types';

//import styles from './Header.css';

class MyLink extends Component{
    render(){
        return(
            <li ><Link to='/'>Home</Link></li>
        );
    }
}
class Header extends Component {
    render(){
        return (
         
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="#brand">React-Bootstrap</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                    <MyLink/>
                    
                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                        <MenuItem >Action</MenuItem>
                        <MenuItem >Another action</MenuItem>
                        <li ><Link to='/'>Home</Link></li>
                        <MenuItem divider />
                        <MenuItem >Separated link</MenuItem>
                    </NavDropdown>
                    </Nav>
                    {this.props.user ? <HeaderOut user={this.props.user} onLogout={this.props.onLogout}/> : <HeaderIn onAuth={this.props.onAuth}/> }
                </Navbar.Collapse>
                </Navbar>
            
        );
    }
}

Header.propTypes = {
    user: PropTypes.object,
    onLogout: PropTypes.func.isRequired,
    onAuth: PropTypes.func.isRequired
    
}
export default Header;