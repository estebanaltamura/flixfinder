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
    <Container>
      <div className="desktopItemsMenuContainer">
        <div className="locoContainer">
          <img src={logo} className="logoDesktop" />
        </div>
        <NavLink  to="/movies" className="menuItem1 menuOptions">Movies</NavLink>
        <NavLink  to="/tvSeries" className="menuItem2 menuOptions">TV-Series</NavLink>
        {isLogged && (
          <span className="loginHeaderLabelDesktop" onClick={logoutHandler}>Logout</span>
        )}
        {isLogged && <SearchBarDesktop />}
      </div>
    </Container> 
  );
};