import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../components/ImageLightBox.module.css";

function ImageLightBox({
  isOpen, // Whether the lightbox is visible
  onClose, // Function to close the lightbox
  images, // Array of image URLs
  currentIndex, // Currently displayed image index
  onIndexChange, // Function to change currentIndex
}) {
  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose(); // Close on Escape
      if (e.key === "ArrowLeft")
        // Previous image on left arrow
        onIndexChange((currentIndex - 1 + images.length) % images.length);
      if (e.key === "ArrowRight")
        // Next image on right arrow
        onIndexChange((currentIndex + 1) % images.length);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown); // Add listener when open
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown); // Cleanup listener
      document.body.style.overflow = "unset"; // Restore scrolling
    };
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange]);

  if (!isOpen) return null; // Don't render if closed

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* CLOSE BUTTON */}
      <button className={styles.closeBtn} onClick={onClose}>
        <X size={32} />
      </button>

      {/* PREVIOUS IMAGE BUTTON */}
      <button
        className={`${styles.navBtn} ${styles.prevBtn}`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing overlay
          onIndexChange((currentIndex - 1 + images.length) % images.length);
        }}
      >
        <ChevronLeft size={32} />
      </button>

      {/* NEXT IMAGE BUTTON */}
      <button
        className={`${styles.navBtn} ${styles.nextBtn}`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing overlay
          onIndexChange((currentIndex + 1) % images.length);
        }}
      >
        <ChevronRight size={32} />
      </button>

      {/* IMAGE DISPLAY */}
      <div
        className={styles.imageContainer}
        onClick={(e) => e.stopPropagation()} // Prevent closing on image click
      >
        <img
          key={currentIndex} // Force re-render on index change
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className={styles.image}
        />
      </div>

      {/* IMAGE COUNTER */}
      <div className={styles.counter}>
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

export default ImageLightBox;
