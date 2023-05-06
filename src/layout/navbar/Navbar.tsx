import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Divider, message } from "antd";
import { Navbar as NavbarBS, Nav, Container, Button } from "react-bootstrap";
import { auth } from "../../firebase";
import AppUsage from "../../components/appUsage";
import { useState } from "react";

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("@my-library");
      navigate("/signin");
    } catch {
      message.error("Signout Failed");
    }
  };

  return (
    <NavbarBS className="mb-4 px-sm-5 shadow-sm">
      <AppUsage openModal={openModal} setOpenModal={setOpenModal} />
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>

          <Nav.Link as={NavLink} to="/my-library">
            Library
          </Nav.Link>
        </Nav>

        <Button
          variant="link"
          style={{ textDecoration: "none", fontSize: "14px", padding: 1 }}
          onClick={() => setOpenModal(true)}
        >
          How to Use
        </Button>

        <Divider type="vertical" />

        <Button
          variant="link"
          style={{ textDecoration: "none", fontSize: "14px", padding: 1 }}
          onClick={handleSignout}
        >
          Sign Out
        </Button>
      </Container>
    </NavbarBS>
  );
};

export default Navbar;
