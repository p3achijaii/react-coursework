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
import ImageLightbox from "../../components/ImageLightBox";
import styles from "./PropertyDetail.module.css";

function PropertyDetail() {
  const { id } = useParams(); // Get property ID from URL
  const [property, setProperty] = useState(null); // Store property data
  const [currentTab, setCurrentTab] = useState("details"); // Track active tab

  const [lightboxOpen, setLightboxOpen] = useState(false); // Image lightbox state
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Current lightbox image

  const [showFullDescription, setShowFullDescription] = useState(false); // Toggle description

  const openLightbox = (index) => {
    setCurrentImageIndex(index); // Set current image
    setLightboxOpen(true); // Open lightbox
  };

  const [isMobile, setIsMobile] = useState(false); // Detect mobile screen

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768); // Update mobile state
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  // Fetch property data from JSON
  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.properties.find((p) => p.id === id); // Find property by ID
        setProperty(found);
      })
      .catch((err) => console.error("Failed to load property:", err));
  }, [id]);

  // Show fallback if property not found
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
        <div className={styles.hero} onClick={() => openLightbox(0)}>
          <img
            src={property.picture[0]}
            alt={`Property at ${property.location}`}
            className={styles.heroImage} // Main hero image
          />
          <div className={styles.heroOverlay} /> {/* Dark overlay */}
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
                    {property.location} {/* Property location */}
                  </div>
                </div>
                <div className={styles.priceContainer}>
                  <div className={styles.price}>
                    £{property.price.toLocaleString()} {/* Formatted price */}
                  </div>
                  <div className={styles.typeTag}>
                    {property.type}{" "}
                    {property.tenure ? `• ${property.tenure}` : ""}{" "}
                    {/* Type & tenure */}
                  </div>
                </div>
              </div>

              {/* STATS */}
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

              {/* DATE ADDED */}
              {property.added && (
                <div className={styles.dateAdded}>
                  <Calendar className={styles.calendarIcon} />
                  Listed on{" "}
                  {`${String(property.added.day).padStart(2, "0")}/${
                    {
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
                    }[property.added.month]
                  }/${property.added.year}`}
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
                    {/* About This Home */}
                    <div className={styles.cardInner}>
                      <h2 className={styles.sectionTitle}>About This Home</h2>
                      <p
                        className={`${styles.description} ${
                          isMobile && !showFullDescription
                            ? styles.collapsedMobile
                            : ""
                        }`}
                        dangerouslySetInnerHTML={{
                          __html:
                            property.description || "No description available",
                        }}
                      />
                      {property.description && (
                        <button
                          className={styles.readMoreBtn}
                          onClick={() =>
                            setShowFullDescription((prev) => !prev)
                          }
                        >
                          {showFullDescription ? "Show Less" : "Read More"}
                        </button>
                      )}
                    </div>

                    {/* Features & Amenities */}
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
                            {feature} {/* Feature label */}
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
                              className={styles.galleryImage} // Gallery image
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* FLOORPLAN TAB */}
                {currentTab === "floorplan" && property.floorplan && (
                  <div className={styles.cardInner}>
                    <h2 className={styles.sectionTitle}>Floorplan</h2>
                    <div className={styles.floorplanWrapper}>
                      <img
                        src={property.floorplan}
                        alt={`Floorplan of ${property.title}`}
                        className={styles.floorplanImage} // Floorplan image
                        onClick={() => openLightbox(property.picture.length)}
                      />
                    </div>
                  </div>
                )}

                {/* LOCATION TAB */}
                {currentTab === "location" && (
                  <div className={styles.locationSection}>
                    {property.mapUrl ? (
                      <iframe
                        src={property.mapUrl}
                        width="100%"
                        height="400"
                        style={{ border: 0, borderRadius: "12px" }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Property location map"
                      />
                    ) : (
                      <p>Map data unavailable</p>
                    )}

                    <p className={styles.address}>{property.location}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className={styles.sidebar}>
            {property.agent && (
              <div className={styles.agentCard}>
                <div className={styles.agentHeader}>
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    className={styles.agentImage} // Agent profile image
                  />
                  <div>
                    <h3 className={styles.agentName}>{property.agent.name}</h3>
                    <p className={styles.agentRole}>Listing Agent</p>
                  </div>
                </div>

                {/* Contact buttons */}
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

                {/* Tour request form */}
                <div className={styles.formContainer}>
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

      {/* LIGHTBOX */}
      <ImageLightbox
        isOpen={lightboxOpen} // Open/close state
        onClose={() => setLightboxOpen(false)} // Close lightbox
        images={[
          ...property.picture,
          ...(property.floorplan ? [property.floorplan] : []),
        ]} // All images including floorplan
        currentIndex={currentImageIndex} // Current image index
        onIndexChange={setCurrentImageIndex} // Update index when navigating
      />
    </div>
  );
}

export default PropertyDetail;
