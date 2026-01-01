import React, { useState } from "react";
import { Heart, X, Trash2 } from "lucide-react";
import { useFavorites } from "../contexts/FavoritesContext";
import { formatPrice } from "../components/utils";
import { cn } from "../components/utils";
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
      "Are you sure you want to remove all favorites?"
    );
    if (confirmed) {
      clearFavorites();
    }
  };

  return (
    <div className={cn(styles.sidebar, isOpen && styles.sidebarOpen)}>
      {/* Toggle */}
      <button onClick={() => setIsOpen(!isOpen)} className={styles.toggleBtn}>
        {isOpen ? <X size={24} /> : <Heart size={24} />}
      </button>

      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Favorites</h3>
        <span className={styles.count}>{favorites.length}</span>

        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            className={styles.clearBtn}
            title="Remove all"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(styles.dropZone, isDragOver && styles.dropZoneActive)}
      >
        {favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <Heart size={48} className={styles.emptyIcon} />
            <p>Drag properties here to add them to favorites</p>
          </div>
        ) : (
          <div className={styles.list}>
            {favorites.map((property) => (
              <div key={property.id} className={styles.item}>
                <img
                  src={property.picture}
                  alt={property.location}
                  className={styles.itemImage}
                />

                <div className={styles.itemContent}>
                  <h4 className={styles.itemTitle}>{property.location}</h4>
                  <p className={styles.itemPrice}>
                    {formatPrice(property.price)}
                  </p>
                </div>

                <button
                  onClick={() => removeFavorite(property.id)}
                  className={styles.removeBtn}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesSidebar;
