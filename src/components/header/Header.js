import { useContext } from "react";
import { headerSearchModeContext } from "../../context/headerSearchModeContext";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";
import { SearchBar } from "./SearchBar";

import "./Header.css";

export const Header = () => {
  const { headerSearchMode } = useContext(headerSearchModeContext);

  return (
    <>
      {window.innerWidth < 768 ? (
        <>{!headerSearchMode ? <MobileMenu /> : <SearchBar />}</>
      ) : (
        <DesktopMenu />
      )}
    </>
  );
};
