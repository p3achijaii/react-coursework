import React, { useMemo } from "react";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { properties } from "../../public/properties.json";
import styles from "./SearchFilters.module.css";

function SearchFilters({ filters, setFilters }) {
  const propertyTypes = useMemo(() => {
    const types = new Set(properties.map((p) => p.type));
    return Array.from(types);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      type: "",
      minPrice: "",
      maxPrice: "",
      beds: "",
      postcode: "",
      dateAdded: "",
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Find a Property</h2>
    </div>
  );
}
