import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";
import auth from "../../../../../services/auth";
import { Link, useHistory } from "react-router-dom";
import { ButtonLink } from "./styles";

export default function NavMenu() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    auth.logout();
    history.replace("/");
  };

  return (
    <Navbar color="light" light expand="md">
      <Link
        to="/"
        style={{ marginLeft: "10px", marginRight: "10px", color: "#6c757d" }}
      >
        Home
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-2" navbar>
          {!auth.getToken() ? (
            <NavItem>
              <Link
                to="/login"
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  color: "#6c757d",
                }}
              >
                Login
              </Link>
            </NavItem>
          ) : (
            <>
            <NavItem>
              <Link to="/my-posts" style={{marginLeft:"10px", marginRight: "10px", color: "#6c757d"}}>Meus Posts</Link>
            </NavItem>
              <NavItem>
                <Link
                  to="/profile"
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    color: "#6c757d",
                  }}
                >
                  Perfil
                </Link>
              </NavItem>
              <NavItem>
                <ButtonLink onClick={handleLogout}>Logout</ButtonLink>
              </NavItem>
            </>
          )}
        </Nav>
        {auth.getToken() && <NavbarText>Bem Vindo {auth.getUserName()}!</NavbarText>}
      </Collapse>
    </Navbar>
  );
}
