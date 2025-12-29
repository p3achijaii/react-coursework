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
    onToggleFavourirte?.(property);
  };
}

export default PropertyCard;
