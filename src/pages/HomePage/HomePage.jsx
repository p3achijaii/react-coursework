import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Shield, Clock } from "lucide-react";

import Button from "../../components/ui/Button";

import propertiesData from "../../assets/properties.json";

import styles from "./HomePage.module.css";

function HomePage() {
  const featuredProperties = propertiesData.properties.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <img
            src="public/hero_background.png"
            alt="Modern home exterior"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroTextContainer}>
            <h1 className={styles.heroTitle}>
              Find your place <br />
              <span className={styles.hightlight}>to call home.</span>
            </h1>

            <p className={styles.heroDescription}>
              Discover a curated collection of homes that blend comfort, style,
              and nature. Your dream sanctuary awaits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
