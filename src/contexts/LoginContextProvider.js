import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  const isThereToken = localStorage.getItem("token") ? true : false;

  const [isLogged, setIsLogged] = useState(isThereToken);

  return (
    <LoginContext.Provider value={{ isLogged, setIsLogged }}>
      {props.children}
    </LoginContext.Provider>
  );
};
