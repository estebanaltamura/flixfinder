import { createContext, useState } from "react";

export const loginContext = createContext();

export const LoginContextProvider = (props) => {
  const isThereToken = sessionStorage.getItem("token") ? true : false;

  const [isLogged, setIsLogged] = useState(isThereToken);

  return (
    <loginContext.Provider value={{ isLogged, setIsLogged }}>
      {props.children}
    </loginContext.Provider>
  );
};
