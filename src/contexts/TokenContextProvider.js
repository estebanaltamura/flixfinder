import { createContext, useState, useEffect, useContext } from "react";
import { ContentLikedContext } from "./ContentLikedContextProvider";
import { useGetContentLiked } from "../services/internal/useGetContentLiked";

export const TokenContext = createContext();

export const TokenContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const { setContentLiked } = useContext(ContentLikedContext);
  const { getContentLikedServer } = useGetContentLiked();

  const initialContextsValue = async (token) => {
    const getContentLikedFromServerData = await getContentLikedServer(token);
    localStorage.setItem(
      "contentLiked",
      JSON.stringify(getContentLikedFromServerData),
    );
    setContentLiked(getContentLikedFromServerData);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const contentLiked = JSON.parse(localStorage.getItem("contentLiked"));

    if (token !== null && contentLiked !== null) {
      setToken(token);
      setContentLiked(contentLiked);
    }

    if (token !== null && contentLiked === null) {
      setToken(token);
      initialContextsValue(token);
    }

    if (token === null && contentLiked !== null) {
      localStorage.removeItem("contentLiked");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
};
