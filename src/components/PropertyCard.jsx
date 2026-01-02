import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Bed, Heart, FileText } from "lucide-react";
import { useFavorites } from "../contexts/FavoritesContext";
import { formatPrice, cn } from "../components/utils";
import styles from "../components/PropertyCard.module.css";

function PropertyCard({ property, draggable = true }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const isFavourite = isFavorite(property.id);

  const handleDragStart = (e) => {
    if (!draggable) return;
    e.dataTransfer.setData("application/json", JSON.stringify(property));
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavourite) {
      removeFavorite(property.id);
    } else {
      addFavorite(property);
    }
  };

  return (
    <div draggable={draggable} onDragStart={handleDragStart}>
      <Link to={`/property/${property.id}`} className={styles.card}>
        {/* IMAGE */}
        <div className={styles.imageContainer}>
          <img
            src={`/${property.picture}`}
            alt={`${property.type} in ${property.location}`}
            className={styles.image}
          />
          <div className={styles.overlay} />

          <span className={styles.tag}>{property.type}</span>

          {/* HEART */}
          <button
            className={styles.favoriteBtn}
            onClick={handleFavouriteClick}
            aria-label="Toggle favourite"
          >
            <Heart
              size={18}
              className={cn(
                styles.heartIcon,
                isFavourite && styles.heartIconActive
              )}
              fill={isFavourite ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.address}>
              <MapPin className={styles.mapIcon} />
              {property.location}
            </div>
            <div className={styles.price}>{formatPrice(property.price)}</div>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <Bed className={styles.featureIcon} />
              {property.bedrooms} Beds
            </div>

            <div className={styles.feature}>
              <FileText className={styles.featureIcon} />
              {property.tenure}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PropertyCard;
