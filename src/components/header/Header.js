import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../contexts/LoginContextProvider"
import { MobileMenu } from "./menues/MobileMenu";
import { SearchBarMobile } from "./searchBars/SearchBarMobile";
import { DesktopMenu } from "./menues/DesktopMenu";
import "./Header.css";

export const Header = () => {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const { isLogged } = useContext(LoginContext);
  const [isHeaderSearchMode, setIsHeaderSearchMode] = useState(false);

  const searchModeHandler = (event) => {
    if (
      event.target.id === "searchIcon" ||
      event.target.parentElement.id === "searchIcon"
    ) {
      setIsHeaderSearchMode(true);
    }

    if (
      event.target.id === "closeSearchIcon" ||
      event.target.parentElement.id === "closeSearchIcon" ||
      event.target.id === "closeButtonSearchBarMobileContainer"
    ) {
      setIsHeaderSearchMode(false);
    }
  };

  useEffect(() => {
    const setWidth = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener("resize", setWidth);

    return () => window.removeEventListener("resize", setWidth);
  }, []);

  return (
    isLogged &&
    <header onClick={searchModeHandler}>
      {currentWidth < 992 ? (
        isHeaderSearchMode === true ? (
          <SearchBarMobile />
        ) : (
          <MobileMenu />
        )
      ) : (
        <DesktopMenu />
      )}
    </header>
  );
};
