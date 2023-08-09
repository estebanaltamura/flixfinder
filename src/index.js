import React from "react";
import ReactDOM from "react-dom/client";
import { LoginContextProvider } from "./contexts/LoginContextProvider";
import { IsLoadingContextProvider } from "./contexts/IsLoadingContextProvider";
import { ContentLikedContextProvider } from "./contexts/ContentLikedContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IsLoadingContextProvider>
      <LoginContextProvider>
        <ContentLikedContextProvider>
          <App />
        </ContentLikedContextProvider>
      </LoginContextProvider>
    </IsLoadingContextProvider>
  </React.StrictMode>
);
