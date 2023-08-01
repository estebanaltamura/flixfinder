import "./Item.css";
import { Link } from "react-router-dom";
import { useRef } from "react";

export const Item = ({ content, index }) => {
  const img = useRef();
  const card = useRef();  

  const imageErrorHandler = () => {
    img.current.src = "https://i.postimg.cc/BZNQgg6T/noImage.jpg";
  }; 

  return (
    <>
      {index < 4 ? (
        <div
          className="col col-xs-12 col-md-6 col-xl-4 col-xxl-3 itemBody"
          ref={card}
        >
          <div className="card" style={{ width: "18rem" }}>
            <img
              ref={img}
              src={`https://image.tmdb.org/t/p/original${content.poster_path}`}
              className="card-img-top cardImg"
              id={index}
              alt="..."
              onError={imageErrorHandler}              
            />
            <div className="card-body cardBodyStyles">
              <h5 className="card-title cardStyles">
                {content.original_title}
              </h5>
              <p className="textStyles card-text ">{content.overview}</p>
            </div>
            <Link
              className="detailsButton"
              to={`/contentDetails/${content.id}`}
            >
              See Details
            </Link>
          </div>
        </div>
      ) : (
        <div
          className="col col-xs-12 col-md-6 col-xl-4 col-xxl-3 itemBody"
          ref={card}
        >
          <div className="card" style={{ width: "18rem" }}>
            <img
              ref={img}
              src={`https://image.tmdb.org/t/p/original${content.poster_path}`}
              className="card-img-top cardImg"
              id={index}
              alt="..."
              onError={imageErrorHandler}              
            />
            <div className="card-body cardBodyStyles">
              <h5 className="card-title cardStyles">
                {content.original_title}
              </h5>
              <p className="textStyles card-text ">{content.overview}</p>
            </div>
            <Link
              className="detailsButton"
              to={`/contentDetails/${content.id}`}
            >
              See Details
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
