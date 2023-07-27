import { useContext, useRef } from "react";
import { LoginContext } from "../../../contexts/LoginContextProvider";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from '../../../assets/logo.png'


import "./MobileMenu.css";

export const MobileMenu = () => {
  const { isLogged, setIsLogged } = useContext(LoginContext);
  const history = useNavigate();
  const togglerButtonRef = useRef();

  const logoutHandler = () => {
    sessionStorage.removeItem("token");
    setIsLogged(false);
    history("/login");
  };

  const onBlurHandler = () => {
    const isOpen = !togglerButtonRef.current.classList.value.includes("collapsed")
    
    if (isOpen) {
      const isCollapsing = document.getElementById("navbarSupportedContent").classList.value.includes("collapsing")
      if(!isCollapsing){
        togglerButtonRef.current.click();
      } 
      else {
        const timeOut = setTimeout(()=>{
          togglerButtonRef.current.click();
          clearTimeout(timeOut)
        },300)
      }     
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary menuMobileContainer navMenu"
      onBlur={onBlurHandler}
    >      
      {
        isLogged &&
        <div className="container-fluid">
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
  
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 menuOptionsMobileContainer">
              
              <li className="nav-item">
                <a className="nav-link active menuOptionMobile" aria-current="page" href="/movies">
                  Movies
                </a>
              </li>
  
              <li className="nav-item">
                <a className="nav-link menuOptionMobile" href="/tvSeries">
                  TV-Series
                </a>
              </li>
  
            </ul>
          </div>
  
          {isLogged && <BsSearch className="searchIcon" id="searchIcon" />}
  
          {isLogged && (
            <span className="loginHeaderLabel" onClick={logoutHandler}>
              LogOut
            </span>
          )}
        </div>
      }
    </nav>
  );
};
