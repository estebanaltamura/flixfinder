import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  const [ isLogged, setIsLogged ] = useState(null);

  useEffect(()=>{
    const isThereToken = localStorage.getItem("token") ? true : false;
    setIsLogged(isThereToken)
  },[])

  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged }}>
      {props.children}
    </LoginContext.Provider>
  );
};
