import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../../context/LoginContextProvider";
import { SearchBarDesktop } from "../searchBars/SearchBarDesktop";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../../../assets/logo.png'
import './DesktopMenu.css'

export const DesktopMenu = () => {
  const { isLogged, setIsLogged } = useContext(loginContext);

  const history = useNavigate();

  const logoutHandler = () => {
    sessionStorage.removeItem("token");
    setIsLogged(false);
    history("/");
  };

  return (
    <Navbar className="navMenu" bg="dark" variant="dark" expand="lg">
      <img src={logo} className="logo" />
      {
        isLogged && 
        <Container className="containerMenu">
          <Navbar.Toggle
            className="toggleMenu"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/movies">Movies</Nav.Link>
              <Nav.Link href="/tvSeries">TV-Series</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {isLogged && (
            <span className="loginHeaderLabel" onClick={logoutHandler}>
              LogOut
            </span>
          )}
          {isLogged && <SearchBarDesktop />}
        </Container>
      }
    </Navbar>
  );
};