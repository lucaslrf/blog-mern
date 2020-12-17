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

export default function NavMenu() {
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-2" navbar>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">Login</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Bem Vindo!</NavbarText>
        </Collapse>
      </Navbar>
  );
}
