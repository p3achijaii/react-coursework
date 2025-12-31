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
                  <p className={styles.detailText}>+44 20 1234 5678</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className={styles.detailTitle}>Email Us</h3>
                  <p className={styles.detailText}>honeyhomes@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM SECTION */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Send us a message</h2>

            <form className={styles.form}>
              <Input label="Full Name" placeholder="Your Name" />

              <Input
                label="Email Address"
                type="email"
                placeholder="Your Email"
              />

              <Input label="Subject" placeholder="Inquiry about..." />

              <div className={styles.textareaContainer}>
                <label className={styles.label}>Message</label>
                <textarea
                  className={styles.textarea}
                  placeholder="How can we help you?"
                />
              </div>

              <Button size="lg" className={styles.submitBtn}>
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
