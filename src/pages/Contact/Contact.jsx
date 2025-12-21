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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
