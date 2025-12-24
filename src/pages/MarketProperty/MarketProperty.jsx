import React from "react";
import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";
import Select from "../../components/ui/Select.jsx";
import styles from "./MarketProperty.module.css";

function MarketProperty() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* INFO SECTION */}
          <div className={styles.header}>
            <h1 className={styles.title}>Market Your Property</h1>
            <p className={styles.subtitle}>
              List your property with HoneyHomes and reach thousand of potential
              buyers.
            </p>
          </div>

          {/* FORM SECTION */}
          <form className={styles.form}>
            <h2 className={styles.sectionTitle}>Property Details</h2>

            <Input label="Property Address" placeholder="123 Example Street" />

            <div className={styles.row}>
              <Input label="City" placeholder="London" />
              <Input label="Postcode" placeholder="SW1A 1AA" />
            </div>

            <div className={styles.row}>
              <Select
                label="Property Type"
                options={[
                  { value: "apartment", label: "Apartment" },
                  { value: "cottage", label: "Cottage" },
                  { value: "flat", label: "Flat" },
                  { value: "house", label: "House" },
                ]}
              />
              <Input
                label="Expected Price (£)"
                type="number"
                placeholder="500000"
                min={0}
              />
            </div>

            <div className={styles.row}>
              <Input label="Bedrooms" type="number" placeholder="3" min={0} />
              <Input label="Bathrooms" type="number" placeholder="2" min={0} />
            </div>

            <div className={styles.textareaContainer}>
              <label className={StyleSheet.label}>Description</label>
              <textarea
                className={styles.textarea}
                placeholder="Tell us about your property..."
              />
            </div>

            {/* CONTACT SECTION */}
            <h2 className={styles.sectionTitle}>Contact Information</h2>

            <div className={styles.row}>
              <Input label="Full Name" placeholder="John Doe" />
              <Input label="Phone Number" placeholder="123 4567 8910" />

              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
              />

              <Button size="lg" className={styles.submitBtn}>
                Submit Listing Request
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MarketProperty;
