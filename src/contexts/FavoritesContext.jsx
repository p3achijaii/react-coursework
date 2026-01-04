import React, { useState, createContext, useContext, useEffect } from "react";

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // Load from local storage on first render
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Save to local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (property) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === property.id) ? prev : [...prev, property]
    );
  };

  const removeFavorite = (propertyId) => {
    setFavorites((prev) => prev.filter((p) => p.id !== propertyId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (propertyId) => favorites.some((p) => p.id === propertyId);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}

export default FavoritesProvider;
