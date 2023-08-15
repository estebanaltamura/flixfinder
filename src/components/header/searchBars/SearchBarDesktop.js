import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "./SearchBarDesktop.css";

export const SearchBarDesktop = () => {
  const inputElement = useRef(null);
  const [ contentType, setContentType ] = useState("")
  const [ placeHoldertext, setPlaceholderText ] = useState("")
  const history = useNavigate();
  const url = useLocation()
   
  const searchSubmitHandler = (e) => {
    e.preventDefault();   
    const query = inputElement.current.value  
    
    if(query !== ""){
      history(`/searchResults/${contentType}/${query}`) 
      inputElement.current.value = "";  
      inputElement.current.blur()
    }    
  };   

  useEffect(()=>{
    const urlInParts = url.pathname.split("/") 
    
    console.log(urlInParts)
    
    if(((urlInParts.includes("searchResults") || urlInParts.includes("contentDetails")) && urlInParts.includes("movie")) || urlInParts.includes("movies")){      
        setContentType("movie")
        setPlaceholderText("Search movies")
    } 

    if(((urlInParts.includes("searchResults") || urlInParts.includes("contentDetails")) && urlInParts.includes("tv")) || urlInParts.includes("tvSeries")){
        setContentType("tv")
        setPlaceholderText("Search tv-series")
    }
    
    if(urlInParts.includes("favorites")){
      setContentType("movie")
      setPlaceholderText("Search movies")
    }        
  },[url])  

  useEffect(()=>{
    console.log(contentType)
  },[])
    
  return (
    <div className="searchBarDesktopContainer">  
      <form onSubmit={searchSubmitHandler} autoComplete="off"> 
        <input
          ref={inputElement}
          name="input"
          placeholder={placeHoldertext}
          className="searchInputDesktop"          
        ></input>
      </form>
      <BsSearch className="searchIconDesktop" onClick={searchSubmitHandler} />
    </div>
  );
};
