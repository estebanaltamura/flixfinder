import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { LoginContext } from "../../../contexts/LoginContextProvider";
import { SearchBarDesktop } from "../searchBars/SearchBarDesktop";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../../../assets/logo.png'
import './DesktopMenu.css'

export const DesktopMenu = () => {
  const { isLogged, setIsLogged } = useContext(LoginContext);

  const history = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    history("/");
  };

  return (
    <Navbar className="navMenu" bg="dark" variant="dark" expand="lg">      
      {
        isLogged && 
        <Container>          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto menuItemsDesktop">
              <img src={logo} className="logoDesktop" />
              <NavLink  to="/movies" className="menuOptionsDesktop">Movies</NavLink>
              <NavLink  to="/tvSeries" className="menuOptionsDesktop">TV-Series</NavLink>
              
            </Nav>
            
          </Navbar.Collapse>
            {isLogged && (
                <span className="loginHeaderLabelDesktop" onClick={logoutHandler}>
                  LogOut
                </span>
              )}
          {isLogged && <SearchBarDesktop />}
        </Container>
      }
    </Navbar>
  );
};
