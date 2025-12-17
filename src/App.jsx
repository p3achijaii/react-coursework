import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/HomePage.jsx";
import Property from "./Property.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [favourites, setFavourites] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Navbar favourites={favourites} theme={theme} setTheme={setTheme} />
      <Routes>
        <Route
          path="/"
          element={
            <Home favourites={favourites} setFavourites={setFavourites} />
          }
        />
        <Route
          path="/property/:id"
          element={
            <Property favourites={favourites} setFavourites={setFavourites} />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
