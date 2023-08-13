import React from "react";
import ReactDOM from "react-dom/client";
import { TokenContextProvider } from "./contexts/TokenContextProvider";
import { IsLoadingContextProvider } from "./contexts/IsLoadingContextProvider";
import { ContentLikedContextProvider } from "./contexts/ContentLikedContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IsLoadingContextProvider>
      <ContentLikedContextProvider>
        <TokenContextProvider>          
          <App />          
        </TokenContextProvider>
      </ContentLikedContextProvider>
    </IsLoadingContextProvider>
  </React.StrictMode>
);
