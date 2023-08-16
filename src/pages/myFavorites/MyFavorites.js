import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IsLoadingContext } from "../../contexts/IsLoadingContextProvider";
import { ContentLikedContext } from "../../contexts/ContentLikedContextProvider";
import { TokenContext } from "../../contexts/TokenContextProvider";
import { Card } from "../../components/card/Card";
import { Spinner } from "../../components/spinner/Spinner";
import "./MyFavorites.css";

export const MyFavorites = () => {
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  const { contentLiked } = useContext(ContentLikedContext);
  const { token } = useContext(TokenContext);
  const history = useNavigate();

  const imagesLoadedCounter = useRef(0);

  const imgItemLoadHandler = (event) => {
    if (isLoading) {
      const lengthResults = contentLiked.contentLiked.allFavorites.length;
      const quantityImgsToLoadBeforeIsLoadingFalse =
        lengthResults >= 6 ? 6 : lengthResults;
      const imgClasses = event.target.classList.value;

      if (
        imgClasses.includes("cardImg") &&
        event.target.id <= quantityImgsToLoadBeforeIsLoadingFalse
      ) {
        imagesLoadedCounter.current += 1;
      }

      if (
        imagesLoadedCounter.current === quantityImgsToLoadBeforeIsLoadingFalse
      ) {
        imagesLoadedCounter.current = 0;
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (contentLiked !== null) {
      contentLiked.contentLiked.allFavorites.length === 0 &&
        setIsLoading(false);
    }
  }, [contentLiked]);

  useEffect(() => {
    token === null && history("/movies");
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Spinner />
      {contentLiked !== null && (
        <>
          {contentLiked.contentLiked.allFavorites.length === 0 && (
            <div
              className={
                isLoading === true
                  ? "hidden"
                  : "container containerMoviesAndTvSeriesDashboard"
              }
            >
              <h3 className="alertText">{`No results`}</h3>
            </div>
          )}

          {contentLiked.contentLiked.allFavorites.length > 0 && (
            <div
              className={
                isLoading === true
                  ? "hidden"
                  : "container containerMoviesAndTvSeriesDashboard"
              }
              onLoad={imgItemLoadHandler}
            >
              <div className="row rowStyles">
                {[...contentLiked.contentLiked.allFavorites]
                  .reverse()
                  .map((content, index) => {
                    return (
                      <Card
                        content={content}
                        URLcontentType={"favorites"}
                        key={index}
                        index={index + 1}
                      />
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};