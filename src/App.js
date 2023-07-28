
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { RegisterAccount } from "./pages/createAccount/RegisterAccount";
import { MoviesAndTvSeriesDashboard } from "./pages/moviesAndTvSeriesDashboard/MoviesAndTvSeriesDashboard";
import { SearchResults } from "./pages/searchResults/SearchResults";





import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { ItemDetails } from "./components/ItemDetails";


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
            {/* <Route path="/movies/:contentId"        element={<ItemDetails />} />
            <Route path="/tvSeries/:contentId"      element={<ItemDetails />} /> */}
            {/* <Route path="/movies/results/:query"    element={<Results />} />
            <Route path="/tvSeries/results/:query"  element={<Results />} /> */}
          </Routes>
          <Footer />        
      </BrowserRouter>
    </>
  );
}

export default App;
