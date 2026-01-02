import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Shield, Clock, ArrowRight } from "lucide-react";

import Button from "../../components/ui/Button";
import { cn } from "../../components/utils";

import heroImage from "../../assets/hero_background.png";
import PropertyCard from "../../components/PropertyCard";
import styles from "./HomePage.module.css";

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.inView);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => observer.disconnect();
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
      <section ref={featuresRef} className={styles.featuresSection}>
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

      {/* FEATURED PROPERTIES */}
      <section className={styles.propertiesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Featured Homes</h2>
              <p className={styles.sectionSubtitle}>
                Explore our most exclusive listings, selected for their unique
                character and exceptional value.
              </p>
            </div>

            <Link to="/find-property" className={styles.viewAllLink}>
              View all properties <ArrowRight className={styles.arrowIcon} />
            </Link>
          </div>

          <div className={styles.propertiesGrid}>
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className={styles.mobileCta}>
            <Link to="/find-property">
              <Button size="lg" className={styles.ctaMobileBtn}>
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBlob1} />
        <div className={styles.ctaBlob2} />

        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to find your dream home?</h2>

          <p className={styles.ctaText}>
            Join thousands of happy homeowners who found their perfect match
            with HoneyHomes.
          </p>

          <Link to="/find-property">
            <Button size="lg" className={styles.ctaBtn}>
              Start Your Search
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
