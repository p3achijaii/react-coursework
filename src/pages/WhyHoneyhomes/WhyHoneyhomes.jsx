import React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";
import section1 from "../../assets/section1.png";
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
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.imageContainer}>
              <img
                src={section1}
                alt="Happy family in new home"
                className={styles.image}
              />
            </div>

            <div>
              <h2 className={styles.contentTitle}>Expertise You Can Trust</h2>
              <p className={styles.contentText}>
                With over 20 years of experience in the London property market,
                our team brings unparalleled knowledge and insight to every
                transaction. We understand the nuances of each neighborhood,
                ensuring you find a home that perfectly matches your lifestyle.
              </p>

              <Link to="/contact">
                <Button>Speak to an Expert</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div>
              <div className={styles.statValue}>2,500+</div>
              <div className={styles.statLabel}>Homes Sold</div>
            </div>

            <div>
              <div className={styles.statValue}>98%</div>
              <div className={styles.statLabel}>Client Satisfaction</div>
            </div>

            <div>
              <div className={styles.statValue}>20+</div>
              <div className={styles.statLabel}>Years Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WhyHoneyhomes;
