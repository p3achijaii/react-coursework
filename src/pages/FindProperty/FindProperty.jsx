import React, { useEffect, useMemo, useState } from "react";
import SearchFilters from "../../components/SearchFilters";
import PropertyCard from "../../components/PropertyCard";
import FavoritesSidebar from "../../components/FavoritesSidebar";
import styles from "./FindProperty.module.css";

function FindProperty() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    beds: "",
    postcode: "",
    dateAdded: "",
  });

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => setProperties(data.properties))
      .catch((err) => console.error("Failed to load properties:", err));
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.type && property.type !== filters.type) return false;

      if (filters.minPrice && property.price < Number(filters.minPrice))
        return false;

      if (filters.maxPrice && property.price > Number(filters.maxPrice))
        return false;

      if (filters.beds && property.bedrooms < Number(filters.beds))
        return false;

      if (
        filters.postcode &&
        !property.location
          .toLowerCase()
          .includes(filters.postcode.toLowerCase())
      )
        return false;

      if (filters.dateAdded) {
        const addedDate = new Date(
          `${property.added.month} ${property.added.day}, ${property.added.year}`
        );

        const daysAgo =
          (Date.now() - addedDate.getTime()) / (1000 * 60 * 60 * 24);

        if (daysAgo > Number(filters.dateAdded)) return false;
      }

      return true;
    });
  }, [filters, properties]);

  return (
    <div className={styles.page}>
      <FavoritesSidebar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Search results</h1>
          <p className={styles.subtitle}>
            Find your perfect home in London’s best neighborhoods
          </p>
        </div>

        <div className={styles.content}>
          {/* Filters */}
          <aside>
            <SearchFilters filters={filters} setFilters={setFilters} />
          </aside>

          {/* Results */}
          <main>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsCount}>
                {filteredProperties.length} Properties found
              </h2>
            </div>

            {filteredProperties.length > 0 ? (
              <div className={styles.resultsGrid}>
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <h3 className={styles.emptyTitle}>No properties found</h3>
                <p>Try adjusting your search filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default FindProperty;
