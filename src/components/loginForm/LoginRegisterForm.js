import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginContext } from "../../context/LoginContextProvider";
import { useLoginValidator } from "../useLoginValidator";
import { BiSolidLock } from "react-icons/bi";

import { GoPersonFill } from "react-icons/go";
import { HiOutlineUser } from "react-icons/hi";
import "./LoginRegisterForm.css";






export const LoginRegisterForm = () => {
  
  const { isLogged } = useContext(loginContext);

  const { userNameAlert, passwordAlert, areValidEntries, setAlerts, resetAlerts } = useLoginValidator();
  const history = useNavigate();
  const url = useLocation()
  const [ linkToRedirectToLoginOrRegisterAccountText, setLinkToRedirectToLoginOrRegisterAccountText ] = useState(null)
  const [ textSubmitButton, setTextSubmitButton ] = useState(null)



  const redirectToLoginOrRegister = ()=>{    
    const urlInParts = url.pathname.split("/")

    if(urlInParts.includes("login")){      
      history("/registerAccount")
    }
    if(urlInParts.includes("registerAccount")){      
      history("/login")
    }    
  }

  const inputsClickHandler = (event)=>{
    if(event.target.nodeName === "INPUT"){
      resetAlerts()

      window.scrollTo({
        top: 100,
        left: 0
      })
    }
   
  }

  const loginRegisterFormSubmitClickHandler = (event)=>{
    event.preventDefault()
    const urlInParts = url.pathname.split("/")
    

    if(areValidEntries(event) && urlInParts.includes("login")){    
      console.log("todo ok para pedir token")  
      //pedir token
    }
    else setAlerts(event)

    if(areValidEntries(event) && urlInParts.includes("registerAccount")){   
      console.log("todo ok para pedir registro")    
      //pedir registrar usuario
    }
    else setAlerts(event)
    
  }

  useEffect(() => {    
  
    const urlInParts = url.pathname.split("/")

    if(urlInParts.includes("login")){      
      setLinkToRedirectToLoginOrRegisterAccountText("Create an account")
      setTextSubmitButton("Login")
    }

    if(urlInParts.includes("registerAccount")){      
      setLinkToRedirectToLoginOrRegisterAccountText("Already have an account? Login here")
      setTextSubmitButton("Create account")
    }
    
    isLogged && history("/movies");
  },[]);

  return (
    <>
      {!isLogged && (
          
          <div className="form-container" onClick={inputsClickHandler}>
            <div className="formMainIconContainer"><HiOutlineUser className="formMainIcon" /></div>
            <form action="/action_page.php" onSubmit={loginRegisterFormSubmitClickHandler}>        
              
              <div className="inputContainer inputContainerUserName">
                <div className="inputIconContainer"><GoPersonFill className="inputIcon" /></div>
                <input type="text" name="username" autoComplete="off" placeholder="User name" />
              </div>      
              <span className="inputAlerts">{userNameAlert}</span>       
              
              <div className="inputContainer">
                <div className="inputIconContainer"><BiSolidLock className="inputIcon" /></div>
                <input type="password" name="password" autoComplete="off" placeholder="Password" />
              </div>       
              <span className="inputAlerts">{passwordAlert}</span>
              
              <button type="submit" className="submitButton">
                {textSubmitButton}
              </button>              
            </form>
            <a className="createAccountLink" onClick={redirectToLoginOrRegister}>{linkToRedirectToLoginOrRegisterAccountText}</a>
          </div>
       
      )}
    </>
  );
};
