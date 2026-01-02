import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Bed, Heart, FileText } from "lucide-react";

import { formatPrice } from "../components/utils";
import { cn } from "../components/utils";
import styles from "../components/PropertyCard.module.css";

function PropertyCard({
  property,
  draggable = true,
  isFavourite = false,
  onToggleFavourirte,
}) {
  const handleDragStart = (e) => {
    if (!draggable) return;

    e.dataTransfer.setData("application/json", JSON.stringify(property));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavourite?.(property);
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

          {/* PROPERTY TYPE */}
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

          {/* BOTTOM ROW */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <Bed className={styles.featureIcon} />
              <span className={styles.featureText}>
                {property.bedrooms} Beds
              </span>
            </div>

            <div className={styles.feature}>
              <FileText className={styles.featureIcon} />
              <span className={styles.featureText}>{property.tenure}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PropertyCard;
