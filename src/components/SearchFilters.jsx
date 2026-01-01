import React from "react";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import styles from "./SearchFilters.module.css";

function SearchFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      (name === "minPrice" || name === "maxPrice" || name === "beds") &&
      Number(value) < 0
    ) {
      return;
    }

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

      <div className={styles.grid}>
        <Select
          label="Property Type"
          name="type"
          value={filters.type}
          onChange={handleChange}
          options={[
            { value: "", label: "Any" },
            { value: "House", label: "House" },
            { value: "Flat", label: "Flat" },
            { value: "Villa", label: "Villa" },
            { value: "Cottage", label: "Cottage" },
          ]}
        />

        <div className={styles.priceRange}>
          <Input
            label="Min Price"
            name="minPrice"
            type="number"
            min="0"
            placeholder="£0"
            value={filters.minPrice}
            onChange={handleChange}
          />

          <Input
            label="Max Price"
            name="maxPrice"
            type="number"
            min="0"
            placeholder="£1,000,000+"
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </div>

        <div className={styles.priceRange}>
          <Input
            label="Min Bedroom"
            name="beds"
            type="number"
            min="0"
            placeholder="1"
            value={filters.beds}
            onChange={handleChange}
          />

          <Input
            label="Postcode / Area"
            name="postcode"
            placeholder="e.g. BR5"
            value={filters.postcode}
            onChange={handleChange}
          />
        </div>

        <Select
          label="Date Added"
          name="dateAdded"
          value={filters.dateAdded}
          onChange={handleChange}
          options={[
            { value: "", label: "Anytime" },
            { value: "7", label: "Last 7 days" },
            { value: "14", label: "Last 14 days" },
            { value: "30", label: "Last 30 days" },
          ]}
        />

        <div className={styles.buttonGroup}>
          <Button
            variant="ghost"
            onClick={handleReset}
            className={styles.resetBtn}
          >
            Reset
          </Button>
          <Button className={styles.searchBtn}>Search</Button>
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;
