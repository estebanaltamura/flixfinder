import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../context/LoginContextProvider";

export const useGetToken = (e) => {
  const history = useNavigate();
  const { setIsLogged } = useContext(loginContext);

  const getToken = (userName, password) => {
    axios
      .post("http://challenge-react.alkemy.org", { email: userName, password })
      .then((res) => {       
        sessionStorage.setItem("token", res.data.token);
        setIsLogged(true);
        history("/movies");
      });
  };

  return { getToken };
};
