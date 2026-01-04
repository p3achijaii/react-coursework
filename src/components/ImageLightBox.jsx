import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../components/ImageLightBox.module.css";

function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        onIndexChange((currentIndex - 1 + images.length) % images.length);
      if (e.key === "ArrowRight")
        onIndexChange((currentIndex + 1) % images.length);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* CLOSE BUTTON */}
      <button className={styles.closeBtn} onClick={onClose}>
        <X size={32} />
      </button>

      {/* PREVIOUS */}
      <button
        className={`${styles.navBtn} ${styles.prevBtn}`}
        onClick={(e) => {
          e.stopPropagation();
          onIndexChange((currentIndex - 1 + images.length) % images.length);
        }}
      >
        <ChevronLeft size={32} />
      </button>

      {/* NEXT */}
      <button
        className={`${styles.navBtn} ${styles.nextBtn}`}
        onClick={(e) => {
          e.stopPropagation();
          onIndexChange((currentIndex + 1) % images.length);
        }}
      >
        <ChevronRight size={32} />
      </button>

      {/* IMAGE */}
      <div
        className={styles.imageContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className={styles.image}
        />
      </div>

      {/* COUNTER */}
      <div className={styles.counter}>
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

export default ImageLightbox;
