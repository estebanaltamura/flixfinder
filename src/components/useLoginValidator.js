import { useState } from "react";
import { useGetToken } from "./useGetToken";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./useLoginValidator.css";

export const useLoginValidator = (e) => {
  const MySwal = withReactContent(Swal);

  const [userNameAlert, setUserNameAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  const { getToken } = useGetToken();

  const setAlerts = (userName, password) => {
    if (userName == "" && password == "") {
      setUserNameAlert("Ingrese un correo electronico");
      setPasswordAlert("Ingrese su password");
      return;
    }

    if (userName == "") {
      setUserNameAlert("Ingrese un correo electronico");
      return;
    }

    const twoDotsRegExp = /\.{2,}/;
    if (twoDotsRegExp.test(userName)) {
      setUserNameAlert("No puede haber dos puntos (..) seguidos");
      return;
    }

    const dotAtStart = /^\.{1}/;
    const dotAtEnd = /\.{1}@{1}/;
    if (dotAtStart.test(userName) || dotAtEnd.test(userName)) {
      setUserNameAlert(
        "La direccion no puede empezar ni preceder al @ con un punto (.)"
      );
      return;
    }

    const multiplesAt = /@.*@/;
    if (multiplesAt.test(userName)) {
      setUserNameAlert("No puede haber mas de un @");
      return;
    }

    const regExpUserName =
      /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    if (!regExpUserName.test(userName)) {
      setUserNameAlert("Ingresar una direccion de email valida");
      return;
    } else {
      setUserNameAlert("");
    }

    if (password == "") {
      setPasswordAlert("Ingrese su password");
      return;
    }

    if (userName !== "challenge@alkemy.org" || password !== "react") {
      MySwal(
        <div className="alertContainer">
          <h1>Nombre de usario y/o contraseña incorrectos</h1>
        </div>
      );
      return;
    }

    return true;
  };

  const validateInputs = (e) => {
    e.preventDefault();
    const userName = e.target.username.value;
    const password = e.target.password.value;

    setAlerts(userName, password);
    setAlerts(userName, password) && getToken(userName, password);
  };

  const resetAlerts = () => {
    setUserNameAlert("");
    setPasswordAlert("");
  };

  return { userNameAlert, passwordAlert, validateInputs, resetAlerts };
};
