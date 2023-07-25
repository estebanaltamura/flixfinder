import "./LoginForm.css";
import { React, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../context/LoginContextProvider";
import { useLoginValidator } from "../useLoginValidator";

export const LoginForm = () => {
  const { isLogged } = useContext(loginContext);

  const { userNameAlert, passwordAlert, validateInputs, resetAlerts } = useLoginValidator();
  const history = useNavigate();

  useEffect(() => {
    console.log("redereo login")
    isLogged && history("/movies");
  },[]);

  return (
    <>
      {!isLogged && (
       
          <div className="form-container">
            <form action="/action_page.php" onSubmit={validateInputs}>
              <span className="subtitle">USERNAME:</span>
              <input type="text" name="username" onKeyUp={resetAlerts} />
              <span className="inputAlerts">{userNameAlert}</span>
              <span className="subtitle">PASSWORD:</span>
              <input type="password" name="password" onKeyUp={resetAlerts} />
              <span className="inputAlerts">{passwordAlert}</span>
              <button type="submit" className="submit-btn">
                SIGN IN
              </button>
            </form>
          </div>
       
      )}
    </>
  );
};
