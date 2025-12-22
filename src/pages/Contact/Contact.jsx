import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

import Button from "../../components/ui/Button.jsx";
import Input from "../../components/ui/Input.jsx";

import styles from "./Contact.module.css";

function Contact() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* INFO SECTION */}
          <div className={styles.infoSection}>
            <h1 className={styles.title}>Get in Touch</h1>
            <p className={styles.text}>
              Have questions about buying, selling, or renting? Our team is here
              to help you every step of the way.
            </p>

            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className={styles.detailTitle}>Visit Us</h3>
                  <p className={styles.detailText}>
                    123 Oxford Street
                    <br />
                    London, W1D 1LT
                  </p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className={styles.detailTitle}>Call Us</h3>
                  <p className={styles.detailText}>020 7123 4567</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className={styles.detailTitle}>Email Us</h3>
                  <p className={styles.detailText}>hello@honeyhomes.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
