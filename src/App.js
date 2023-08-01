
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Login } from "./pages/login/Login";
import { RegisterAccount } from "./pages/createAccount/RegisterAccount";
import { MoviesAndTvSeriesDashboard } from "./pages/moviesAndTvSeriesDashboard/MoviesAndTvSeriesDashboard";
import { SearchResults } from "./pages/searchResults/SearchResults";
import { ContentDetails } from "./pages/contentDetails/ContentDetails";
import { Footer } from "./components/footer/Footer";
import "./App.css";


function App() { 
  return (
    <>
      <BrowserRouter>        
          <Header />          
          <Routes>
            <Route path="*"                                   element={<Navigate to="/login" />} />           
            <Route path="/login"                              element={<Login />} />
            <Route path="/registerAccount"                    element={<RegisterAccount />} />
            <Route path="/movies"                             element={<MoviesAndTvSeriesDashboard key="moviesDashboard"    />} />
            <Route path="/tvSeries"                           element={<MoviesAndTvSeriesDashboard key="tvSeriesDashboard" />} />
            <Route path="/searchResults/:typeContent/:query"  element={<SearchResults />} />
            <Route path="/contentDetails/:contentId"          element={<ContentDetails />} />          
          </Routes>
          <Footer />        
      </BrowserRouter>
    </>
  );
}

export default App;
