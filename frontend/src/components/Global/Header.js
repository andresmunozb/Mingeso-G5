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
                                <li><Link to={{
                                    pathname: '/Dashboard',
                                    state: { enunciado: "soy un nuevo enunciado" }
                                }}>
                                    Dashboard

                                </Link></li>
                            </NavDropdown>
                            <NavDropdown eventKey={3} title="Teacher" id="basic-nav-dropdown">
                                <li><Link to={{
                                    pathname: '/nuevoEnunciado',
                                    state: { enunciado: "soy un nuevo enunciado" }
                                }}>
                                    Crear enunciado

                                </Link></li>
                                <li><Link to={{
                                    pathname: '/listaEnunciadosProfesor',
                                    state: { enunciado: "soy una lista de enunciados" }
                                }}>
                                        Lista de enunciados
                                </Link></li>

                                

                            </NavDropdown>
                            <NavDropdown eventKey={3} title="Student" id="basic-nav-dropdown">
                                
                                <li><Link to={{
                                    pathname: '/listaEnunciadosAlumno',
                                    state: { enunciado: "soy alumno" }
                                }}>
                                        Enunciados
                                </Link></li>
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