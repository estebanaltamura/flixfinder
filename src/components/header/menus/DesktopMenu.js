import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { TokenContext } from "../../../contexts/TokenContextProvider";
import { ContentLikedContext } from "../../../contexts/ContentLikedContextProvider";
import { SearchBarDesktop } from "../searchBars/SearchBarDesktop";
import { Container } from "react-bootstrap";
import logo from "../../../assets/logo.png";
import "./DesktopMenu.css";

export const DesktopMenu = () => {
  const { token, setToken } = useContext(TokenContext);
  const { setContentLiked } = useContext(ContentLikedContext);
  const history = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("contentLiked");
    setToken(null);
    setContentLiked(null);
  };

  const loginHandler = () => {
    history("/login");
  };

  return (
    <>
      <div className="logoContainer">
        <img src={logo} className="logoDesktop" />
      </div>

      {token ? (
        <span className="loginHeaderLabelDesktop" onClick={logoutHandler}>
          Logout
        </span>
      ) : (
        <span className="loginHeaderLabelDesktop" onClick={loginHandler}>
          Login
        </span>
      )}

      <Container>
        <div className="desktopItemsMenuContainer">
          <NavLink to="/movies" className="menuItem1 menuOptionsDesktop">
            Movies
          </NavLink>
          <NavLink to="/tvSeries" className="menuItem2 menuOptionsDesktop">
            TV-Series
          </NavLink>
          {token && (
            <NavLink to="/favorites" className="menuItem3 menuOptionsDesktop">
              Favorites
            </NavLink>
          )}

          <SearchBarDesktop />
        </div>
      </Container>
    </>
  );
};
