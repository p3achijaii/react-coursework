import React from "react";
import { Link } from "react-router-dom";
import {
  HouseHeart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* BRAND */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <HouseHeart className={styles.icon} />
              </div>
              <span className={styles.logoText}>Honeyhomes</span>
            </Link>

            <p className={styles.description}>
              Helping you find the perfect place to call home. We curate the
              finest properties in London's most desirable neighborhoods.
            </p>

            <div className={styles.socialLinks}>
              <Facebook className={styles.socialIcon} size={20} />
              <Twitter className={styles.socialIcon} size={20} />
              <Instagram className={styles.socialIcon} size={20} />
              <Linkedin className={styles.socialIcon} size={20} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
