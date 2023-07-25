import { useState, useEffect } from "react";
import { MobileMenu } from "./menues/MobileMenu";
import { SearchBarMobile } from "./searchBars/SearchBarMobile";
import { DesktopMenu } from "./menues/DesktopMenu";
import "./Header.css";

export const Header = () => {  
  const [currentWidth, setCurrentWidth]             = useState(window.innerWidth);
  const [ isHeaderSearchMode, setIsHeaderSearchMode] = useState (false)

  const searchModeHandler = (event)=>{
    //console.log(event.target.classList.value="searchIcon")
    //event.target.classList.value="searchIcon" && setIsHeaderSearchMode(true)
    //event.target.classList.value="closeSearchIcon" && setIsHeaderSearchMode(false)
  }

  useEffect(() => {
    const setWidth = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener("resize", setWidth);

    return () => window.removeEventListener("resize", setWidth);
  }, []);

  return (<header isHeaderSearchMode={isHeaderSearchMode} onClick={searchModeHandler}>
            {currentWidth < 768 ? 
              
                  isHeaderSearchMode === true     ?
                    <SearchBarMobile />
                                                  :
                    <MobileMenu />
                 
                                : 
              <DesktopMenu />
            }
          </header>);
};
