import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../context/LoginContextProvider";
import { headerSearchModeContext } from "../../context/headerSearchModeContext";
import { BsSearch } from "react-icons/bs";
import { Navbar, Container, Nav } from "react-bootstrap";

export const MobileMenu = () => {
  const { isLogged, setIsLogged } = useContext(loginContext);
  const { setHeaderSearchMode } = useContext(headerSearchModeContext);
  const history = useNavigate();

  const logoutHandler = () => {
    sessionStorage.removeItem("token");
    setIsLogged(false);
    history("/");
  };

  return (
    <Navbar className="navMenu" bg="dark" variant="dark" expand="lg">
      <Container className="containerMenu">
        <Navbar.Toggle
          className="toggleMenu"
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="tvSeries">TV-Series</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {isLogged && (
          <BsSearch
            className="searchIcon"
            onClick={() => setHeaderSearchMode(true)}
          />
        )}
        {isLogged && (
          <span className="loginHeaderLabel" onClick={logoutHandler}>
            LogOut
          </span>
        )}
      </Container>
    </Navbar>
  );
};
