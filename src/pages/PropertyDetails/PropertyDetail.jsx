import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Check,
  Phone,
  Mail,
} from "lucide-react";
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

              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <Bed className={styles.statIcon} />
                  <span className={styles.statValue}>{property.bedrooms}</span>
                  <span className={styles.statLabel}>Bedrooms</span>
                </div>
                <div className={styles.statItem}>
                  <Bath className={styles.statIcon} />
                  <span className={styles.statValue}>{property.bathrooms}</span>
                  <span className={styles.statLabel}>Bathrooms</span>
                </div>
                <div className={styles.statItem}>
                  <Maximize className={styles.statIcon} />
                  <span className={styles.statValue}>{property.sqft}</span>
                  <span className={styles.statLabel}>Square Feet</span>
                </div>
              </div>

              {property.added && (
                <div className={styles.dateAdded}>
                  <Calendar className={styles.calendarIcon} />
                  Listed on{" "}
                  {(() => {
                    const monthMap = {
                      January: "01",
                      February: "02",
                      March: "03",
                      April: "04",
                      May: "05",
                      June: "06",
                      July: "07",
                      August: "08",
                      September: "09",
                      October: "10",
                      November: "11",
                      December: "12",
                    };

                    return `${String(property.added.day).padStart(2, "0")}/${
                      monthMap[property.added.month]
                    }/${property.added.year}`;
                  })()}
                </div>
              )}
            </div>

            {/* TABS */}
            <div className={styles.card}>
              <div className={styles.tabs}>
                <button
                  className={currentTab === "details" ? styles.activeTab : ""}
                  onClick={() => setCurrentTab("details")}
                >
                  Details
                </button>
                <button
                  className={currentTab === "floorplan" ? styles.activeTab : ""}
                  onClick={() => setCurrentTab("floorplan")}
                >
                  Floorplan
                </button>
                <button
                  className={currentTab === "location" ? styles.activeTab : ""}
                  onClick={() => setCurrentTab("location")}
                >
                  Location
                </button>
              </div>

              <div className={styles.tabContent}>
                {/* DETAILS TAB */}
                {currentTab === "details" && (
                  <>
                    {/* Description */}
                    <div className={styles.cardInner}>
                      <h2 className={styles.sectionTitle}>About This Home</h2>
                      <p
                        className={styles.description}
                        dangerouslySetInnerHTML={{
                          __html: property.description,
                        }}
                      />
                    </div>

                    {/* Features */}
                    <div className={styles.cardInner}>
                      <h2 className={styles.sectionTitle}>
                        Features & Amenities
                      </h2>
                      <div className={styles.featuresGrid}>
                        {property.features.map((feature, idx) => (
                          <div key={idx} className={styles.featureItem}>
                            <div className={styles.checkIconWrapper}>
                              <Check className={styles.checkIcon} />
                            </div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gallery */}
                    <div className={styles.cardInner}>
                      <h2 className={styles.sectionTitle}>Gallery</h2>
                      <div className={styles.galleryGrid}>
                        {property.picture.map((img, idx) => (
                          <div
                            key={idx}
                            className={styles.galleryItem}
                            onClick={() => openLightbox(idx)}
                          >
                            <img
                              src={img}
                              alt=""
                              className={styles.galleryImage}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* FLOORPLAN TAB */}
                {currentTab === "floorplan" && (
                  <div className={styles.placeholder}>
                    <p>Floorplan placeholder</p>
                  </div>
                )}
                {/* FLOORPLAN TAB */}
                {currentTab === "location" && (
                  <div className={styles.placeholder}>
                    <p>Map placeholder</p>
                    {/* <MapView lat={property.map.lat} lng={property.map.lng} /> */}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className={styles.sidebar}>
            {/* Agent Card */}
            {property.agent && (
              <div className={styles.agentCard}>
                <div className={styles.agentHeader}>
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className={styles.agentImage}
                  />
                  <div>
                    <h3 className={styles.agentName}>{property.agent.name}</h3>
                    <p className={styles.agentRole}>Listing Agent</p>
                  </div>
                </div>

                <div className={styles.contactButtons}>
                  <Button className={styles.contactBtn} size="lg">
                    <Phone className={styles.contactIcon} />
                    {property.agent.phone}
                  </Button>
                  <Button
                    variant="outline"
                    className={styles.contactBtn}
                    size="lg"
                  >
                    <Mail className={styles.contactIcon} />
                    Send Email
                  </Button>
                </div>

                <div className={styles.fromContainer}>
                  <h4 className={styles.formTitle}>Interested?</h4>
                  <p className={styles.formText}>
                    Schedule a tour with <b>{property.agent.name}</b> to see
                    this property in person.
                  </p>
                  <form className={styles.form}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={styles.formInput}
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className={styles.formInput}
                    />
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      className={styles.formInput}
                    />

                    <Button className={styles.submitBtn}>Request Tour</Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
