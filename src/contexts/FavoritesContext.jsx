import React, { useState, createContext, useContext, useEffect } from "react";

const FavoritesContext = createContext(); // Create context for favorites

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from local storage on initial render
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Save updated favorites to local storage whenever it changes
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a property to favorites if not already present
  const addFavorite = (property) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === property.id) ? prev : [...prev, property]
    );
  };

  // Remove a property from favorites by ID
  const removeFavorite = (propertyId) => {
    setFavorites((prev) => prev.filter((p) => p.id !== propertyId));
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  // Check if a property is in favorites
  const isFavorite = (propertyId) => favorites.some((p) => p.id === propertyId);

  return (
    <FavoritesContext.Provider
      value={{
        favorites, // Array of favorite properties
        addFavorite, // Function to add a favorite
        removeFavorite, // Function to remove a favorite
        clearFavorites, // Function to clear all favorites
        isFavorite, // Function to check if a property is favorited
      }}
    >
      {children} {/* Wrap children components with context */}
    </FavoritesContext.Provider>
  );
}

// Custom hook to access favorites context
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}

export default FavoritesProvider;
