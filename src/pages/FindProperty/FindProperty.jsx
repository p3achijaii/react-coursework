import React, { useMemo, useState } from "react";
import { SearchFilters } from "../../components/SearchFilters";
import { PropertyCard } from "../../components/PropertyCard";
import { FavoritesSidebar } from "../../components/FavoritesSidebar";
import { properties } from "../../../public/properties.json";
import styles from "./FindProperty.module.css";

function FindProperty() {
  const [filter, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    beds: "",
    postcode: "",
    dateAdded: "",
  });

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.type && property.type !== filters.type) return false;
    });
  });
}

export default FindProperty;
