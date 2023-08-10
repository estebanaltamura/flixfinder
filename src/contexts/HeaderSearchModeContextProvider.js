import { createContext, useState } from "react";

export const HeaderSearchModeContext = createContext();

export const HeaderSearchModeContextProvider = (props) => {
  const [headerSearchMode, setHeaderSearchMode] = useState(false);

  return (
    <HeaderSearchModeContext.Provider
      value={{ headerSearchMode, setHeaderSearchMode }}
    >
      {props.children}
    </HeaderSearchModeContext.Provider>
  );
};
