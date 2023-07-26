import "./LoginForm.css";
import { React, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../context/LoginContextProvider";
import { useLoginValidator } from "../useLoginValidator";
import { BiSolidLock } from "react-icons/bi";

import { GoPersonFill } from "react-icons/go";
import { HiOutlineUser } from "react-icons/hi";






export const LoginForm = () => {
  const { isLogged } = useContext(loginContext);

  const { userNameAlert, passwordAlert, validateInputs, resetAlerts } = useLoginValidator();
  const history = useNavigate();

  const createAccountLinkClickHandler = (event)=>{
    event.preventDefault()
    history("./createAccount")
  }

  useEffect(() => {
    console.log("redereo login")
    isLogged && history("/movies");
  },[]);

  return (
    <>
      {!isLogged && (
          
          <div className="form-container">
            <div className="formMainIconContainer"><HiOutlineUser className="formMainIcon" /></div>
            <form action="/action_page.php" onSubmit={validateInputs}>        
              
              <div className="inputContainer inputContainerUserName">
                <div className="inputIconContainer"><GoPersonFill className="inputIcon" /></div>
                <input type="text" name="username" onKeyUp={resetAlerts} autoComplete="off" placeholder="User name" />
              </div>      
              <span className="inputAlerts">{userNameAlert}</span>       
              
              <div className="inputContainer">
                <div className="inputIconContainer"><BiSolidLock className="inputIcon" /></div>
                <input type="password" name="password" onKeyUp={resetAlerts} autoComplete="off" placeholder="Password" />
              </div>       
              <span className="inputAlerts">{passwordAlert}</span>
              
              <button type="submit" className="submit-btn">
                LOGIN
              </button>              
            </form>
            <a className="createAccountLink" onClick={createAccountLinkClickHandler}>Create an account</a>
          </div>
       
      )}
    </>
  );
};
