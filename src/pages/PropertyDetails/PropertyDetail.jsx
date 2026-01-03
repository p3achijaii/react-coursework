import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Bed, Calendar } from "lucide-react";
import Button from "../../components/ui/Button";
import styles from "./PropertyDetail.module.css";

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentTab, setCurrentTab] = useState("overview");

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.properties.find((p) => p.id === id);
        setProperty(found);
      })
      .catch((err) => console.error("Failed to load property:", err));
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Link to="/find-property">
            <Button>Back to Listings</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* HERO IMAGE */}
      {property.picture && property.picture.length > 0 && (
        <div className={styles.hero}>
          <img
            src={property.picture[0]}
            alt={`Property at ${property.location}`}
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.viewPhotosBtn}>
            <Button variant="secondary">View Photos</Button>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* MAIN CONTENT */}
          <div className={styles.mainContent}>
            {/* HEADER CARD */}
            <div className={styles.card}>
              <div className={styles.header}>
                <div>
                  <h1 className={styles.title}>{property.title}</h1>
                  <div className={styles.address}>
                    <MapPin className={styles.mapIcon} />
                    {property.location}
                  </div>
                </div>
                <div className={styles.priceContainer}>
                  <div className={styles.price}>
                    £{property.price.toLocaleString()}
                  </div>
                  <div className={styles.typeTag}>
                    {property.type}{" "}
                    {property.tenure ? `• ${property.tenure}` : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
