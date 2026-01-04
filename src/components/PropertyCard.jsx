import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Heart, Maximize, Home } from "lucide-react";
import { useFavorites } from "../contexts/FavoritesContext";
import { formatPrice, cn } from "../components/utils";
import styles from "../components/PropertyCard.module.css";

function PropertyCard({ property, draggable = true }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites(); // Favorites context
  const isFavourite = isFavorite(property.id); // Check if property is favorite

  // Handle drag start for drag-and-drop functionality
  const handleDragStart = (e) => {
    if (!draggable) return;
    e.dataTransfer.setData("application/json", JSON.stringify(property));
    e.dataTransfer.effectAllowed = "copy";
  };

  // Toggle favorite state when heart is clicked
  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavourite) removeFavorite(property.id);
    else addFavorite(property);
  };

  return (
    <div draggable={draggable} onDragStart={handleDragStart}>
      <div className={styles.card}>
        {/* IMAGE SECTION */}
        <div className={styles.imageContainer}>
          <img
            src={property.picture[0]} // Property image
            alt={`${property.type} in ${property.location}`}
            className={styles.image}
          />
          <div className={styles.overlay} /> {/* Overlay effect */}
          <span className={styles.tag}>{property.type}</span>{" "}
          {/* Property type tag */}
          {/* HEART FAVORITE BUTTON */}
          <button
            className={styles.favoriteBtn}
            onClick={handleFavouriteClick}
            aria-label="Toggle favourite"
          >
            <Heart
              size={18}
              className={cn(
                styles.heartIcon,
                isFavourite && styles.heartIconActive // Active state
              )}
              fill={isFavourite ? "currentColor" : "none"} // Filled if favorite
            />
          </button>
        </div>

        {/* CONTENT SECTION */}
        <div className={styles.content}>
          {/* HEADER WITH LOCATION AND PRICE */}
          <div className={styles.header}>
            <div className={styles.address}>
              <MapPin className={styles.mapIcon} />
              {property.location}
            </div>
            <div className={styles.price}>{formatPrice(property.price)}</div>
          </div>

          {/* PROPERTY FEATURES */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <Bed className={styles.featureIcon} />
              {property.bedrooms} Beds
            </div>
            <div className={styles.feature}>
              <Bath className={styles.featureIcon} />
              {property.bathrooms} Bathrooms
            </div>
            <div className={styles.feature}>
              <Maximize className={styles.featureIcon} />
              {property.sqft} Sq Ft
            </div>
          </div>

          {/* VIEW DETAILS BUTTON */}
          <div className={styles.viewButtonWrapper}>
            <Link
              to={`/property/${property.id}`} // Link to property detail page
              className={styles.viewButtonFull}
            >
              <Home size={16} className={styles.viewButtonIcon} />
              <span>View Details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
