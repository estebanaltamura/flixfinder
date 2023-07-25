import "./Item.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

export const Item = ({ content, index }) => {
  const img = useRef();
  const card = useRef();
  const { itemListType } = useParams();

  const imageErrorHandler = () => {
    img.current.src = "https://i.postimg.cc/BZNQgg6T/noImage.jpg";
  };

  const onLoadHandler = () => {
    card.current.classList.add("show");
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
              alt="..."
              onError={imageErrorHandler}
              onLoad={onLoadHandler}
            />
            <div className="card-body cardBodyStyles">
              <h5 className="card-title cardStyles">
                {content.original_title}
              </h5>
              <p className="textStyles card-text ">{content.overview}</p>
            </div>
            <Link
              className="detailsButton"
              to={`/${itemListType}/${content.id}`}
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
              alt="..."
              onError={imageErrorHandler}
              onLoad={onLoadHandler}
            />
            <div className="card-body cardBodyStyles">
              <h5 className="card-title cardStyles">
                {content.original_title}
              </h5>
              <p className="textStyles card-text ">{content.overview}</p>
            </div>
            <Link
              className="detailsButton"
              to={`/${itemListType}/${content.id}`}
            >
              See Details
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
