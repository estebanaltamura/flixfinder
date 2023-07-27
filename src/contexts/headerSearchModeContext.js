import { createContext, useState } from "react";

export const headerSearchModeContext = createContext();

export const HeaderSearchModeContext = (props) => {
  const [headerSearchMode, setHeaderSearchMode] = useState(false);

  return (
    <headerSearchModeContext.Provider
      value={{ headerSearchMode, setHeaderSearchMode }}
    >
      {props.children}
    </headerSearchModeContext.Provider>
  );
};
