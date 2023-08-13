import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MobileMenu } from "./menus/MobileMenu";
import { SearchBarMobile } from "./searchBars/SearchBarMobile";
import { DesktopMenu } from "./menus/DesktopMenu";
import "./Header.css";

export const Header = () => {
  const [ currentWidth, setCurrentWidth] = useState(window.innerWidth);  
  const [ isHeaderSearchMode, setIsHeaderSearchMode ] = useState(false);
  const [ showHeader, setShowHeader ] = useState(null)
  const url = useLocation()

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
    const urlInParts = url.pathname.split("/")
    if(urlInParts.includes("login") || urlInParts.includes("registerAccount")){
      setShowHeader(false)      
    }     
    else setShowHeader(true)  
  }, [url]);

  useEffect(() => {
    const setWidth = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener("resize", setWidth);

    return () => window.removeEventListener("resize", setWidth);
  }, []);

  return (
    showHeader &&     
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
