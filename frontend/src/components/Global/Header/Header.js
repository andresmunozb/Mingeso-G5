import React,{Component} from 'react';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import HeaderIn from './HeaderIn';
import HeaderOut from './HeaderOut';
import PropTypes from 'prop-types';

//import styles from './Header.css';
class MyLink extends Component{
    render(){
        return(
            <li key={this.props.key} >
            {(this.props.route.enable) ?<Link to={this.props.route.path}>{this.props.route.title}</Link>:null}
            </li>
                  
        );
    }
}

class Header extends Component {
    render(){
        return (
         
            <Navbar inverse collapseOnSelect fluid staticTop>
            <Navbar.Header>
                <Navbar.Brand>
                <a href="#brand">USACH</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
                <Navbar.Collapse>
                
                    <Nav>
                    {this.props.routes && this.props.routes.map(
                        (route,key) => 
                            route.routes ?
                            <NavDropdown key={key} title={route.title} id="basic-nav-dropdown">
                                {route.routes.map((route2,key2)=> <MyLink key={key2} route={route2}/>)}
                            </NavDropdown>:
                            <MyLink key={key} route={route}/>
                    )}
                    
                    
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