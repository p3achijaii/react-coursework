import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";
import section1 from "../../assets/section1.png";
import section2 from "../../assets/section2.png";
import styles from "./WhyHoneyhomes.module.css";

function WhyHoneyhomes() {
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const [stats, setStats] = useState({
    homes: 0,
    satisfaction: 0,
    years: 0,
  });

  useEffect(() => {
    const animateValue = (key, end, duration = 1200) => {
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * end);

        setStats((prev) => ({ ...prev, [key]: value }));

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateValue("homes", 2500);
          animateValue("satisfaction", 90);
          animateValue("years", 20);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

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
                <Button variant="secondary">Speak to an Expert</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div>
              <div className={styles.statValue}>
                {stats.homes.toLocaleString()}+
              </div>
              <div className={styles.statLabel}>Homes Sold</div>
            </div>

            <div>
              <div className={styles.statValue}>{stats.satisfaction}%</div>
              <div className={styles.statLabel}>Client Satisfaction</div>
            </div>

            <div>
              <div className={styles.statValue}>{stats.years}+</div>
              <div className={styles.statLabel}>Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div>
              <h2 className={styles.contentTitle}>A Personal Approach</h2>
              <p className={styles.contentText}>
                We belive that real estate is a people business first. That's
                why we take the time to understand your unique needs,
                preferences, and goals. Whether you're buying your first
                apartment or selling a family estate, we're with you every step
                of the way.
              </p>

              <Link to="/find-property">
                <Button variant="secondary">Start Your Journey</Button>
              </Link>
            </div>

            <div className={styles.imageContainer}>
              <img
                src={section2}
                alt="Real estate agent meeting"
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WhyHoneyhomes;
