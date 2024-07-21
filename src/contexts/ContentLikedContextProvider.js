import { createContext, useState } from 'react';

export const ContentLikedContext = createContext();

export const ContentLikedContextProvider = ({ children }) => {
  const [contentLiked, setContentLiked] = useState(null);
  return (
    <ContentLikedContext.Provider value={{ contentLiked, setContentLiked }}>
      {children}
    </ContentLikedContext.Provider>
  );
};
