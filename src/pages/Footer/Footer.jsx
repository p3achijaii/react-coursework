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

          {/* QUICK LINKS */}
          <div>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/" className={styles.link}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/find-property" className={styles.link}>
                  Find Property
                </Link>
              </li>
              <li>
                <Link to="/market-property" className={styles.link}>
                  Market Your Property
                </Link>
              </li>
              <li>
                <Link to="/why-honeyhomes" className={styles.link}>
                  Why HoneyHomes
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.link}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* POPULAR AREAS */}
          <div>
            <h3 className={styles.columnTitle}>Popular Areas</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/find-property" className={styles.link}>
                  Bromley Petts Wood
                </Link>
              </li>

              <li>
                <Link to="/find-property" className={styles.link}>
                  Canterbury Orpington
                </Link>
              </li>

              <li>
                <Link to="/find-property" className={styles.link}>
                  Leeds
                </Link>
              </li>

              <li>
                <Link to="/find-property" className={styles.link}>
                  Orpington
                </Link>
              </li>

              <li>
                <Link to="/find-property" className={styles.link}>
                  Petts Wood
                </Link>
              </li>

              <li>
                <Link to="/find-property" className={styles.link}>
                  Wilmslow
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT US */}
          <div>
            <h3 className={styles.columnTitle}>Contact Us</h3>
            <ul className={styles.linkList}>
              <li className={styles.contactItem}>
                <MapPin className={styles.contactIcon} />
                <span>
                  123 Oxford Street
                  <br />
                  London, W1D 1LT
                </span>
              </li>
              <li className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <span>123 4567 8910</span>
              </li>
              <li className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                <span>honeyhomes@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
