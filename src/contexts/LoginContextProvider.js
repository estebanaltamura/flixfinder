import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  const [ token, setToken ] = useState(null);

  useEffect(()=>{
    const token = localStorage.getItem("token");    
    token !== null && setToken(token)    
  },[])

  return (
    <LoginContext.Provider value={{ token, setToken }}>
      {props.children}
    </LoginContext.Provider>
  );
};
