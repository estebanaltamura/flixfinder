import { useContext, useRef } from "react";
import { loginContext } from "../../../context/LoginContextProvider";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import './MobileMenu.css'



export const MobileMenu = () => {
  const { isLogged, setIsLogged } = useContext(loginContext);  
  const history = useNavigate();
  const togglerButtonRef = useRef()

  const logoutHandler = () => {
    sessionStorage.removeItem("token");
    setIsLogged(false);
    history("/login");
  };
  

  const onBlurHandler = ()=>{    
    if(!togglerButtonRef.current.classList.value.includes("collapsed")){
      togglerButtonRef.current.click()      
    }
  }

  return (

    <nav className="navbar navbar-expand-lg bg-body-tertiary menuMobileContainer" onBlur={onBlurHandler}>
      <div className="container-fluid">
    
        <button ref={togglerButtonRef} className="navbar-toggler togglerButtonContainer" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <RxHamburgerMenu className="hamburgerIcon" />
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
        
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>   

          </ul>            
        </div>
          
        {isLogged && (
          <BsSearch
            className="searchIcon"            
          />
        )}
          
        {isLogged && (
          <span className="loginHeaderLabel" onClick={logoutHandler}>
            LogOut
          </span>
        )} 

      </div>
    </nav>
    
  );
};


