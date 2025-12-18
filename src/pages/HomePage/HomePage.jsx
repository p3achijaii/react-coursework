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
      </section>
    </div>
  );
}

export default HomePage;
