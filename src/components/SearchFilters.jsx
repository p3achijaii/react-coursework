import React, { useState } from "react";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import styles from "./SearchFilters.module.css";

function SearchFilters({ filters, setFilters }) {
  const [newFilters, setNewFilters] = useState(filters); // Local state for inputs

  // Handle changes in inputs and selects
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative values for certain numeric fields
    if (
      (name === "minPrice" || name === "maxPrice" || name === "beds") &&
      Number(value) < 0
    ) {
      return;
    }

    setNewFilters((prev) => ({
      ...prev,
      [name]: value, // Update specific field
    }));
  };

  // Apply filters to parent component
  const handleSearch = (e) => {
    setFilters(newFilters);
  };

  // Reset all filters to default
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

      <div className={styles.grid}>
        {/* Property Type Select */}
        <Select
          label="Property Type"
          name="type"
          value={newFilters.type}
          onChange={handleChange}
          options={[
            { value: "", label: "Any" },
            { value: "House", label: "House" },
            { value: "Flat", label: "Flat" },
            { value: "Villa", label: "Villa" },
            { value: "Cottage", label: "Cottage" },
          ]}
        />

        {/* Price Range Inputs */}
        <div className={styles.priceRange}>
          <Input
            label="Min Price"
            name="minPrice"
            type="number"
            min="0"
            placeholder="£0"
            value={newFilters.minPrice}
            onChange={handleChange}
          />

          <Input
            label="Max Price"
            name="maxPrice"
            type="number"
            min="0"
            placeholder="£1,000,000+"
            value={newFilters.maxPrice}
            onChange={handleChange}
          />
        </div>

        {/* Bedrooms and Postcode Inputs */}
        <div className={styles.priceRange}>
          <Input
            label="Min Bedroom"
            name="beds"
            type="number"
            min="0"
            placeholder="1"
            value={newFilters.beds}
            onChange={handleChange}
          />

          <Input
            label="Postcode / Area"
            name="postcode"
            placeholder="e.g. BR5"
            value={newFilters.postcode}
            onChange={handleChange}
          />
        </div>

        {/* Date Added Select */}
        <Select
          label="Date Added"
          name="dateAdded"
          value={newFilters.dateAdded}
          onChange={handleChange}
          options={[
            { value: "", label: "Anytime" },
            { value: "7", label: "Last 7 days" },
            { value: "14", label: "Last 14 days" },
            { value: "30", label: "Last 30 days" },
          ]}
        />

        {/* Buttons for Reset and Search */}
        <div className={styles.buttonGroup}>
          <Button
            variant="ghost"
            onClick={handleReset}
            className={styles.resetBtn}
          >
            Reset
          </Button>
          <Button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;
