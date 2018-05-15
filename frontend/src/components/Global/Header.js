import React,{Component} from 'react';
import {Grid,Navbar,Nav,NavItem,NavbarBrand,MenuItem,NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom'



class Header extends Component {
    render(){

        return (
        
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="/Dashboard">Plataforma</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                    <NavDropdown eventKey={3} title="Coordinator" id="basic-nav-dropdown">
                        <Link to={{
                            pathname: '/Dashboard',
                            state: { enunciado: "soy un nuevo enunciado" }
                        }}>
                            Dashboard

                        </Link>
                    </NavDropdown>
                    <NavDropdown eventKey={3} title="Teacher" id="basic-nav-dropdown">
                        <Link to={{
                            pathname: '/nuevoEnunciado',
                            state: { enunciado: "soy un nuevo enunciado" }
                        }}>
                            Crear enunciado

                        </Link>
                        <Link to={{
                            pathname: '/listaDeEnunciados',
                            state: { enunciado: "soy una lista de enunciados" }
                        }}>
                                Lista de Enunciados
                        </Link>

                        

                    </NavDropdown>
                    <NavDropdown eventKey={3} title="Student" id="basic-nav-dropdown">
                        
                        <Link to={{
                            pathname: '/listaEnunciados',
                            state: { enunciado: "soy alumno" }
                        }}>
                                Enunciados
                        </Link>
                        
                        

                    </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                    <NavItem eventKey={1} href="#">
                        Log in
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                           Log out
                    </NavItem>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            
        );
    }
}

export default Header;