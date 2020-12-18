import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';
  import { Link } from "react-router-dom";

export default function NavMenu() {
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar color="light" light expand="md">
        <Link to="/" style={{marginLeft:"10px", marginRight: "10px", color: "#6c757d"}}>Home</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-2" navbar>
            <NavItem>
              <Link to="/login" style={{marginLeft:"10px", marginRight: "10px", color: "#6c757d"}}>Login</Link>
            </NavItem>
            <NavItem>
              <Link to="/my-posts" style={{marginLeft:"10px", marginRight: "10px", color: "#6c757d"}}>Meus Posts</Link>
            </NavItem>
          </Nav>
          <NavbarText>Bem Vindo!</NavbarText>
        </Collapse>
      </Navbar>
  );
}
