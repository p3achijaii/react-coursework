import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";
import styles from "./WhyHoneyhomes.module.css";

function WhyHoneyhomes() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Why Choose HoneyHomes?</h1>
          <p className={styles.heroSubtitle}>
            We're not just selling houses. We're helping you find the place
            where your life happens.
          </p>
        </div>
      </section>

      {/* SECTION 1 */}
    </div>
  );
}

export default WhyHoneyhomes;
