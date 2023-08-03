import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { useLoginValidator } from "../../hooks/useLoginValidator";
import { useLogin } from "../../hooks/useLogin";
import { useCreateAccount } from "../../hooks/useCreateAccount";
import mailIcon from '../../assets/mailIcon.svg'
import passwordIcon from '../../assets/passwordIcon.svg'
import userIcon from '../../assets/userIcon.svg'
import "./LoginAndRegisterForm.css";

export const LoginAndRegisterForm = () => {
  const { isLogged } = useContext(LoginContext);
  const [section, setSection ] = useState(null) 

  const {
    userNameAlert,
    passwordAlert,
    areValidEntries,
    setAlerts,
    resetAlerts,
  } = useLoginValidator();

  const { getToken } = useLogin();
  const { createAccount } = useCreateAccount();

  const history = useNavigate();
  const url = useLocation();

  const userNameInput = useRef()
  const passwordInput = useRef()
  const submitButton = useRef()


  const loginRegisterFormSubmitClickHandler = async(event) => {
    event.preventDefault();
    const urlInParts = url.pathname.split("/");

    const userName = event.target.username.value;
    const password = event.target.password.value;
    const userNameHandled = userName.trim().toLowerCase()
    
    if(!areValidEntries(event)){
      setAlerts(event);
    }
    
    else if (urlInParts.includes("login")) {
      submitButton.current.classList.add("waiting")
      submitButton.current.textContent = "WAITING..."
      userNameInput.current.disabled= true
      passwordInput.current.disabled= true
      submitButton.current.disabled= true
      const wasSuccessfullTheLogin = await getToken(userNameHandled, password);
      if(wasSuccessfullTheLogin){
        history("/movies");
      }
      else{
        userNameInput.current.disabled= false
        passwordInput.current.disabled= false
        submitButton.current.disabled= false
        submitButton.current.classList.remove("waiting")
        userNameInput.current.value=""
        passwordInput.current.value=""
        submitButton.current.textContent="LOGIN"
      }
    }    

    else if (urlInParts.includes("registerAccount")) {
      submitButton.current.classList.add("waiting")
      submitButton.current.textContent = "WAITING..."
      userNameInput.current.disabled= true
      passwordInput.current.disabled= true
      submitButton.current.disabled= true
      const wasSuccessfullTheLogin = await createAccount(userNameHandled, password);
      if(wasSuccessfullTheLogin){
        history("/login");
      }
      else{
        userNameInput.current.disabled= false
        passwordInput.current.disabled= false
        submitButton.current.disabled= false
        submitButton.current.classList.remove("waiting")
        userNameInput.current.value=""
        passwordInput.current.value=""
        submitButton.current.textContent="CREATE ACCOUNT"
      }
      
    } 
  };

  const redirectToLoginOrRegister = () => {
    const urlInParts = url.pathname.split("/");   

    if (urlInParts.includes("login")) {
      history("/registerAccount");
    }
    if (urlInParts.includes("registerAccount")) {
      history("/login");
    }
  };

  const resetAlertWhenFocusInInput = (event) => {
    event.target.nodeName === "INPUT" && resetAlerts();
  };

  useEffect(() => {
    const urlInParts = url.pathname.split("/");
    
    if (urlInParts.includes("login")) {
      setSection("login")
    }

    if (urlInParts.includes("registerAccount")) {
      setSection("registerAccount")
    }        
  }, [url]);

  useEffect(()=>{isLogged && history("/movies");},[])

  return (
    <>
      {!isLogged && (
        <div className="form-container" onClick={resetAlertWhenFocusInInput}>
          <div className="formMainIconContainer">
            <img src={userIcon} />
          </div>
          <h3 className="formTitle">{section === "login" ? "Good to see you again!" : "Insert user name and password to create an account"}</h3>
          <form
            action="/action_page.php"
            onSubmit={loginRegisterFormSubmitClickHandler}
          >
            <div
              className={
                userNameAlert === "" ? "inputContainer" : "inputContainer shake"                 
              }
            >
              <div className="inputIconContainer">
                <img src={mailIcon} className="inputIcon"/>                
              </div>
              <input
                type="text"
                name="username"
                ref={userNameInput}
                className="inputForm inputFormUserName"
                autoComplete="off"
                placeholder="E-mail"
              />
            </div>
            <span className="inputAlerts">{userNameAlert}</span>

            <div
              className={
                passwordAlert === "" ? "inputContainer" : "inputContainer shake"
              }
            >
              <div className="inputIconContainer">
                <img src={passwordIcon} className="inputIcon"/>              
              </div>
              <input
                type="password"
                name="password"
                ref={passwordInput}
                className="inputForm"
                autoComplete="off"
                placeholder="Password"
              />
            </div>
            <span className="inputAlerts">{passwordAlert}</span>

            <button 
              type="submit" 
              className="submitButton"
              ref={submitButton}>
                {section === "login" ? "LOGIN" : "CREATE ACCOUNT"}
            </button>
          </form>
          <a className="createAccountLink" onClick={redirectToLoginOrRegister}>
            {section === "login" ? "Create an account" : "Already have an account?"}
          </a>
        </div>
      )}
    </>
  );
};
