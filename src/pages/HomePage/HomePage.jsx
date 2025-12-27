import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Shield, Clock, ArrowRight } from "lucide-react";

import Button from "../../components/ui/Button";

import heroImage from "../../assets/hero_background.png";
import styles from "./HomePage.module.css";
import { cn } from "../../components/utils";

function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const featuresRef = useRef(null);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }
        return res.json();
      })
      .then((data) => {
        setFeaturedProperties(data.properties.slice(0, 3));
      })
      .catch((err) => {
        console.error("Failed to load properties:", err);
      });
  }, []);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <img
            src={heroImage}
            alt="Modern home exterior"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroTextContainer}>
            <h1 className={styles.heroTitle}>
              Find your place <br />
              <span className={styles.highlight}>to call home.</span>
            </h1>

            <p className={styles.heroDescription}>
              Discover a curated collection of homes that blend comfort, style,
              and nature. Your dream sanctuary awaits.
            </p>

            <div className={styles.heroButtons}>
              <Link to="/find-property">
                <Button size="lg" className={styles.heroBtn}>
                  Browse Properties
                </Button>
              </Link>

              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className={cn(styles.heroBtn, styles.outlineBtn)}
                >
                  Contact an Agent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            {[
              {
                icon: Star,
                title: "Curated Selection",
                desc: "We handpick every property to ensure it meets our high standards of quality and design.",
              },
              {
                icon: Shield,
                title: "Trusted Agents",
                desc: "Work with experienced professionals who prioritise your needs and peace of mind.",
              },
              {
                icon: Clock,
                title: "Seamless Process",
                desc: "From viewing to closing, we make the journey to your new home smooth and stress-free.",
              },
            ].map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <feature.icon className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
