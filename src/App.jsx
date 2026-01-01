import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import FindProperty from "./pages/FindProperty/FindProperty.jsx";
import MarketProperty from "./pages/MarketProperty/MarketProperty.jsx";
import WhyHoneyHomes from "./pages/WhyHoneyhomes/WhyHoneyhomes.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Footer from "./pages/Footer/Footer.jsx";
import FavoritesProvider from "./contexts/FavoritesContext.jsx";
import ScrollToTop from "./components/ui/ScrollToTop.jsx";

import "./App.css";

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className={styles.app}>
          <ScrollToTop />
          <Navbar />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/find-property" element={<FindProperty />} />
              <Route path="/market-property" element={<MarketProperty />} />
              <Route path="/why-honeyhomes" element={<WhyHoneyHomes />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
