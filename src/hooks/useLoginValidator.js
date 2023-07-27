import { useState } from "react";

export const useLoginValidator = () => {  
  const [userNameAlert, setUserNameAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  

  const areValidEntries = (event) => {    
    const userName = event.target.username.value;
    const password = event.target.password.value;

    if (userName == "" && password == "") {      
      return false;
    }

    if (userName == "") {      
      return false;
    }

    const twoDotsRegExp = /\.{2,}/;
    if (twoDotsRegExp.test(userName)) {     
      return false;
    }

    const dotAtStart = /^\.{1}/;
    const dotAtEnd = /\.{1}@{1}/;
    if (dotAtStart.test(userName) || dotAtEnd.test(userName)) {     
      return false;
    }

    const multiplesAt = /@.*@/;
    if (multiplesAt.test(userName)) {     
      return false;
    }

    const regExpUserName =
      /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    if (!regExpUserName.test(userName)) {      
      return false;
    } 

    if (password == "") {      
      return false;
    }   
    
    else {      
      return true;
    }   
  };

  const setAlerts = (event) => {
    const userName = event.target.username.value;
    const password = event.target.password.value;

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
    } 

    if (password == "") {
      setPasswordAlert("Ingrese su password");
      return;
    }   
    
    else {
      setUserNameAlert("");
      return;
    }    
  };  

  const resetAlerts = () => {
    setUserNameAlert("");
    setPasswordAlert("");
  };

  return { userNameAlert, passwordAlert, areValidEntries, setAlerts, resetAlerts };
};
