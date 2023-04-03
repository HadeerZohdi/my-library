import { Navbar as NavbarBS, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <NavbarBS className="mb-4 px-sm-5 shadow-sm">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>

          <Nav.Link as={NavLink} to="/my-library">
            My Library
          </Nav.Link>

          <Nav.Link as={NavLink} to="/how-to-use">
            How to Use
          </Nav.Link>
        </Nav>

        <span>Sign Out</span>
      </Container>
    </NavbarBS>
  );
};

export default Navbar;
