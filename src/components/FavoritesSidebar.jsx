import React, { useState } from "react";
import { Heart, X, Trash2 } from "lucide-react";
import { useFavorite } from "../contexts/FavoritesContext";
import { formatPrice } from "./utils";
import { cn } from "./utils";
import styles from "./FavoritesSidebar.module.css";

function FavoritesSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const { favorites, addFavorite, removeFavorite, clearFavorites } =
    useFavorites();

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    try {
      const data = e.dataTransfer.getData("application/json");
      if (data) {
        addFavorite(JSON.parse(data));
      }
    } catch (err) {
      console.error("Invalid drop data", err);
    }
  };

  const handleClearAll = () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove all favourites?"
    );
    if (confirmed) {
      clearFavorites();
    }
  };

  return (
    <div className={cn(styles.sidebar, isOpen && styles.sidebarOpen)}>
      {/* TOGGLE */}
      <button onClick={() => setIsOpen(!isOpen)} className={styles.toggleBtn}>
        {isOpen ? <X size={24} /> : <Heart size={24} />}
      </button>

      {/* HEADER */}
      <div className={styles.header}>
        <h3 className={styles.title}>Favourites</h3>
        <span className={styles.count}>{favorites.length}</span>

        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            className={styles.clearBtn}
            title="Remove All"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default FavoritesSidebar;
