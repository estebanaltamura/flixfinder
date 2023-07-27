import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";
import { useLoginValidator } from "../../hooks/useLoginValidator";
import { useLogin } from "../../hooks/useLogin";
import { useCreateAccount } from "../../hooks/useCreateAccount";
import { BiSolidLock } from "react-icons/bi";
import { GoPersonFill } from "react-icons/go";
import { HiOutlineUser } from "react-icons/hi";
import "./LoginAndRegisterForm.css";

export const LoginAndRegisterForm = () => {
  const { isLogged } = useContext(LoginContext);

  const [
    linkToRedirectToLoginOrRegisterAccountText,
    setLinkToRedirectToLoginOrRegisterAccountText,
  ] = useState(null);
  const [textSubmitButton, setTextSubmitButton] = useState(null);

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

  const loginRegisterFormSubmitClickHandler = (event) => {
    event.preventDefault();
    const urlInParts = url.pathname.split("/");

    const userName = event.target.username.value;
    const password = event.target.password.value;
    const userNameHandled = userName.trim().toLowerCase()
        

    if (areValidEntries(event) && urlInParts.includes("login")) {
      getToken(userNameHandled, password);
    } else setAlerts(event);

    if (areValidEntries(event) && urlInParts.includes("registerAccount")) {
      createAccount(userNameHandled, password);
    } else setAlerts(event);
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
      setLinkToRedirectToLoginOrRegisterAccountText("Create an account");
      setTextSubmitButton("Login");
    }

    if (urlInParts.includes("registerAccount")) {
      setLinkToRedirectToLoginOrRegisterAccountText(
        "Already have an account? Login here"
      );
      setTextSubmitButton("Create account");
    }

    isLogged && history("/movies");
  }, []);

  return (
    <>
      {!isLogged && (
        <div className="form-container" onClick={resetAlertWhenFocusInInput}>
          <div className="formMainIconContainer">
            <HiOutlineUser className="formMainIcon" />
          </div>
          <form
            action="/action_page.php"
            onSubmit={loginRegisterFormSubmitClickHandler}
          >
            <div
              className={
                userNameAlert === ""
                  ? "inputContainer inputContainerUserName"
                  : "inputContainer inputContainerUserName shake"
              }
            >
              <div className="inputIconContainer">
                <GoPersonFill className="inputIcon" />
              </div>
              <input
                type="text"
                name="username"
                autoComplete="off"
                placeholder="Insert a valid e-mail"
              />
            </div>
            <span className="inputAlerts">{userNameAlert}</span>

            <div
              className={
                passwordAlert === "" ? "inputContainer" : "inputContainer shake"
              }
            >
              <div className="inputIconContainer">
                <BiSolidLock className="inputIcon" />
              </div>
              <input
                type="password"
                name="password"
                autoComplete="off"
                placeholder="Password"
              />
            </div>
            <span className="inputAlerts">{passwordAlert}</span>

            <button type="submit" className="submitButton">
              {textSubmitButton}
            </button>
          </form>
          <a className="createAccountLink" onClick={redirectToLoginOrRegister}>
            {linkToRedirectToLoginOrRegisterAccountText}
          </a>
        </div>
      )}
    </>
  );
};
