import React, { useState } from "react";
import { Heart, X, Trash2 } from "lucide-react";
import { useFavorites } from "../contexts/FavoritesContext";
import { formatPrice } from "../components/utils";
import { cn } from "../components/utils";
import styles from "./FavoritesSidebar.module.css";

const DEFAULT_IMAGE = "/images/default.png";

function FavoritesSidebar({ allProperties = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const { favorites, addFavorite, removeFavorite, clearFavorites } =
    useFavorites();

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    try {
      const data = e.dataTransfer.getData("application/json");
      if (data) {
        const dropped = JSON.parse(data);

        const property = allProperties.find((p) => p.id === dropped.id) || {
          id: dropped.id,
          picture: dropped.picture || [DEFAULT_IMAGE],
          location: dropped.location || "Unknown",
          price: dropped.price || 0,
          type: dropped.type || "",
          tenure: dropped.tenure || "",
        };

        if (!Array.isArray(property.picture)) {
          property.picture = [property.picture || DEFAULT_IMAGE];
        }

        addFavorite(property);
      }
    } catch (err) {
      console.error("Invalid drop data", err);
    }
  };

  // Clear all favorites
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all favourites?")) {
      clearFavorites();
    }
  };

  return (
    <div className={cn(styles.sidebar, isOpen && styles.sidebarOpen)}>
      {/* Toggle button */}
      <button onClick={() => setIsOpen(!isOpen)} className={styles.toggleBtn}>
        <Heart
          size={24}
          className={`${styles.icon} ${isOpen ? styles.hidden : ""}`}
        />
        <X
          size={24}
          className={`${styles.icon} ${isOpen ? "" : styles.hidden}`}
        />
      </button>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>Favourites</h3>
          <span className={styles.count}>{favorites.length}</span>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            className={styles.clearBtn}
            title="Remove all"
          >
            <Trash2 size={20} />
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
            <p>Drag properties here to add them to favourites</p>
          </div>
        ) : (
          <div className={styles.list}>
            {favorites.map((property) => (
              <div key={property.id} className={styles.item}>
                <img
                  src={
                    (property.picture && property.picture[0]) || DEFAULT_IMAGE
                  }
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
                  <Trash2 size={18} />
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
