import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../contexts/LoginContextProvider"
import { MobileMenu } from "./menus/MobileMenu";
import { SearchBarMobile } from "./searchBars/SearchBarMobile";
import { DesktopMenu } from "./menus/DesktopMenu";
import "./Header.css";

export const Header = () => {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const { isLogged } = useContext(LoginContext);
  const [isHeaderSearchMode, setIsHeaderSearchMode] = useState(false);

  const searchModeHandler = (event) => {
    //console.log("deberia cerrar search mode", "id: ", event.target.id, "parent id: ", event.target.parentElement.id, "clases : ", event.target.classList.value)

    if (
      event.target.id === "searchIcon" ||
      event.target.parentElement.id === "searchIcon"
    ) {
      setIsHeaderSearchMode(true);
    } 

    if (
      event.target.id === "closeSearchIconMobile" ||
      event.target.parentElement.id === "closeSearchIconMobile" ||
      event.target.id === "closeButtonSearchBarMobileContainer"
    ) {      
      setIsHeaderSearchMode(false);
    }
  };

  const onSubmitHandler = ()=>{
    setIsHeaderSearchMode(false);
  }

  useEffect(() => {
    const setWidth = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener("resize", setWidth);

    return () => window.removeEventListener("resize", setWidth);
  }, []);

  return (
    isLogged &&
    <header onClick={searchModeHandler} onSubmit={onSubmitHandler}>
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
