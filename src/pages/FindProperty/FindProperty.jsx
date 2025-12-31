import React, { useMemo, useState } from "react";
import { SearchFilters } from "../../components/SearchFilters";
import { PropertyCard } from "../../components/PropertyCard";
import { FavoritesSidebar } from "../../components/FavoritesSidebar";
import { properties } from "../../../public/properties.json";
import styles from "./FindProperty.module.css";

function FindProperty() {
  const [filters, setFilters] = useState({
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

      if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
        return false;
      }

      if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
        return false;
      }

      if (filters.beds && property.beds < parseInt(filters.beds)) {
        return false;
      }

      if (
        filters.postcode &&
        !property.postcode
          .toLowerCase()
          .includes(filters.postcode.toLowerCase())
      ) {
        return false;
      }

      if (filters.dateAdded) {
        const daysAgo =
          (new Date().getTime() - new Date(property.dateAdded).getTime()) /
          (1000 * 3600 * 24);

        if (daysAgo > parseInt(filters.dateAdded)) return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className={styles.page}>
      <FavoritesSidebar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Search results</h1>
          <p className={styles.subtitle}>
            Find your perfect home in London&apos;s best neighbourhoods
          </p>
        </div>

        <div className={styles.content}></div>
      </div>
    </div>
  );
}

export default FindProperty;
