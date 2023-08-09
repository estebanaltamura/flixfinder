import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { useLoginValidator } from "../../hooks/useLoginValidator";
import { useLogin } from "../../hooks/useLogin";
import { useCreateAccount } from "../../hooks/useCreateAccount";
import { useFormElementsBehavior } from "../../hooks/useFormElementsBehavior";
import mailIcon from '../../assets/mailIcon.svg'
import passwordIcon from '../../assets/passwordIcon.svg'
import userIcon from '../../assets/userIcon.svg'
import "./LoginAndRegisterForm.css";
import { AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

export const LoginAndRegisterForm = () => {
  const { token } = useContext(LoginContext);
  const [section, setSection ] = useState(null) 
  const [ showPassword, setShowPassword ] = useState(false)

  const {
    userNameAlert,
    passwordAlert,
    areValidEntries,
    setAlerts,
    resetAlerts,
        } = useLoginValidator();

  const {
    setStylesElementsWaiting,
    setStylesElementsLoginRejected,
    setStylesElementsRegisterRejected
        } = useFormElementsBehavior()

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
    const userNameHandled = userName.trim().toLowerCase()
    const password = event.target.password.value;
    
    if(!areValidEntries(event)){
      setAlerts(event);
    }
    
    else if (urlInParts.includes("login")) {      
      setStylesElementsWaiting(userNameInput.current, passwordInput.current, submitButton.current)

      const wasSuccessfullTheLogin = await getToken(userNameHandled, password);

      if(wasSuccessfullTheLogin){        
        history("/movies");
      }      
      else{
        setStylesElementsLoginRejected(userNameInput.current, passwordInput.current, submitButton.current)        
      }
    }    

    else if (urlInParts.includes("registerAccount")) {
      setStylesElementsWaiting(userNameInput.current, passwordInput.current, submitButton.current)   

      const wasSuccessfullTheLogin = await createAccount(userNameHandled, password);
      if(wasSuccessfullTheLogin){
        history("/login");
      }
      else{
        setStylesElementsRegisterRejected(userNameInput.current, passwordInput.current, submitButton.current)        
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

  const showpasswordClickHandler = ()=>{
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    const urlInParts = url.pathname.split("/");
    
    if (urlInParts.includes("login")) {
      setSection("login")
    }

    if (urlInParts.includes("registerAccount")) {
      setSection("registerAccount")
    }        
  }, [url]);

  useEffect(()=>{token && history("/movies");},[])

  return (
    <>
      {!token && (
        <div className="form-container" onClick={resetAlertWhenFocusInInput}>
          <div className={section === "login" ? "formMainIconContainer" : "formMainIconContainer formMainIconContainerRegisterAccount"} >
            <img src={userIcon} />
          </div>
          <h3 className="formTitle">{section === "login" ? "Good to see you again!" : "Create your account"}</h3>
          <form
            action="/action_page.php"
            onSubmit={loginRegisterFormSubmitClickHandler}
            className="loginAndRegisterForm"
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
                type={showPassword ? "text" :  "password"}
                name="password"
                ref={passwordInput}
                className="inputForm"
                autoComplete="off"
                placeholder="Password"
              />
              <>
                {
                  showPassword ?<AiFillEyeInvisible className="showPasswordIcon" onClick={showpasswordClickHandler} /> : <AiFillEye className="showPasswordIcon" onClick={showpasswordClickHandler}/> 
                }
              </>
            </div>
            <span className="inputAlerts">{passwordAlert}</span>

            <button 
              type="submit" 
              className={section === "login" ? "submitButton" : "submitButton submitButtonRegisterAccount"}
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
