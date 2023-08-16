import { useContext, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { TokenContext } from "../../../contexts/TokenContextProvider";
import { ContentLikedContext } from "../../../contexts/ContentLikedContextProvider";
import { BsSearch } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import "./MobileMenu.css";

export const MobileMenu = () => {
  const { token, setToken } = useContext(TokenContext);
  const { setContentLiked } = useContext(ContentLikedContext);
  const history = useNavigate();
  const togglerButtonRef = useRef();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("contentLiked");
    setToken(null);
    setContentLiked(null);
  };

  const logInHandler = () => {
    history("/login");
  };

  const onBlurHandler = () => {
    const isOpen =
      !togglerButtonRef.current.classList.value.includes("collapsed");

    if (isOpen) {
      const isCollapsing = document
        .getElementById("navbarSupportedContent")
        .classList.value.includes("collapsing");
      if (!isCollapsing) {
        togglerButtonRef.current.click();
      } else {
        const timeOut = setTimeout(() => {
          togglerButtonRef.current.click();
          clearTimeout(timeOut);
        }, 300);
      }
    }
  };

  return (
    <nav
      className="navbar navbar-expand-xl bg-body-tertiary menuMobileContainer"
      onBlur={onBlurHandler}
    >
      <div className="container-fluid dropdownMenu">
        <button
          ref={togglerButtonRef}
          className="navbar-toggler togglerButtonContainer"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <RxHamburgerMenu className="hamburgerIcon" />
        </button>

        <div
          className="collapse navbar-collapse navBarDesplegable"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 menuOptionsMobileContainer">
            <li className="nav-item">
              <NavLink
                className="nav-link active menuOptionMobile"
                aria-current="page"
                to="/movies"
              >
                Movies
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link menuOptionMobile" to="/tvSeries">
                TV-Series
              </NavLink>
            </li>
            {token && (
              <li className="nav-item">
                <NavLink className="nav-link menuOptionMobile" to="/favorites">
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <BsSearch className="searchIconMobile" id="searchIcon" />

        {token ? (
          <span className="loginHeaderLabelMobile" onClick={logoutHandler}>
            Logout
          </span>
        ) : (
          <span className="loginHeaderLabelMobile" onClick={logInHandler}>
            Login
          </span>
        )}
      </div>
    </nav>
  );
};
