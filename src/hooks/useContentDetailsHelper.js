import { useState } from "react"

export const useContentDetailsHelper = ()=>{

  const [ titleText, setTitleText ] = useState(null)
  const [ genresText, setGenresText ] = useState(null)
  const [ releaseYear, setReleaseYear ] = useState(null)
  const [ rating, setRating ] = useState(null)
  const [ description, setDescription ] = useState(null)
  const [ imgSrc, setImgSrc ] = useState(null)

  
  const setCardContent = (content, contentType)=>{
    if(content.original_title !== undefined || content.name !== undefined){
      contentType === "movie" ? setTitleText(content.original_title) : setTitleText(content.name)
    }

    if(content.release_date !== undefined || content.first_air_date !== undefined){       
      const releaseDatehandled = contentType === "movie" ? content.release_date.slice(0,4) : content.first_air_date.slice(0,4)       
      releaseDatehandled > 1890 ? setReleaseYear(releaseDatehandled) : setReleaseYear("N/D")      
    }

    if(content.vote_average !== undefined){
      setRating(content.vote_average.toFixed(1))  
    }

    if(content.genres !== undefined){      
      const genresText = content.genres
                            .slice(0,3)
                            .map((genre)=> genre.name)
                            .join(" - ")
      setGenresText(genresText)
    }

    if(content.overview !== undefined){
      setDescription(content.overview)  
    } 

    if(content.poster_path !== undefined){
      setImgSrc(`https://image.tmdb.org/t/p/original${content.poster_path}`)  
    }    
  }

  const setTextDescriptionOverflowBehavior = (description, descriptionTextElement)=>{
    if(description !== null){
      const descriptionTextHeight = descriptionTextElement.offsetHeight
      if(descriptionTextHeight > 0){
        descriptionTextHeight === 200 && descriptionTextElement.classList.add("descriptionTextShort")
        descriptionTextHeight === 250 && descriptionTextElement.classList.add("descriptionTextLong")
      }       
    }    
  }


  return({
    setCardContent,
    setTextDescriptionOverflowBehavior,
    titleText,
    releaseYear,
    rating,
    genresText,
    description,
    imgSrc
  })
}