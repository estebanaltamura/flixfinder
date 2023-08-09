import { useState, useEffect } from "react";
import { MobileMenu } from "./menus/MobileMenu";
import { SearchBarMobile } from "./searchBars/SearchBarMobile";
import { DesktopMenu } from "./menus/DesktopMenu";
import "./Header.css";

export const Header = () => {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);  
  const [isHeaderSearchMode, setIsHeaderSearchMode] = useState(false);

  const searchModeHandler = (event) => {
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
    <header onClick={searchModeHandler} onSubmit={onSubmitHandler}>
      {currentWidth < 1200 ? (
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
