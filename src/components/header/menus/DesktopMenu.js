import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { LoginContext } from "../../../contexts/LoginContextProvider";
import { ContentLikedContext } from "../../../contexts/ContentLikedContextProvider";
import { SearchBarDesktop } from "../searchBars/SearchBarDesktop";
import { Container } from "react-bootstrap";
import logo from '../../../assets/logo.png'
import './DesktopMenu.css'

export const DesktopMenu = () => {
  const { token, setToken } = useContext(LoginContext);
  const { setContentLiked } = useContext(ContentLikedContext)
  const history = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("contentLiked");       
    setToken(null);
    setContentLiked(null);
  };

  const loginHandler = ()=>{
    history("/login");
  }
  
  return (
    <Container>
      <div className="desktopItemsMenuContainer">
        <div className="locoContainer">
          <img src={logo} className="logoDesktop" />
        </div>
        <NavLink  to="/movies" className="menuItem1 menuOptionsDesktop">Movies</NavLink>
        <NavLink  to="/tvSeries" className="menuItem2 menuOptionsDesktop">TV-Series</NavLink>
        {
          token && <NavLink  to="/favorites" className="menuItem2 menuOptionsDesktop">Favorites</NavLink>
        }
        
        {token ? 
          <span className="loginHeaderLabelDesktop" onClick={logoutHandler}>Logout</span>
                  :
          <span className="loginHeaderLabelDesktop" onClick={loginHandler}>Login</span>
        }
        
        <SearchBarDesktop />
      </div>
    </Container> 
  );
};