import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/find-property", label: "Find Property" },
    { href: "/market-property", label: "Market Your Property" },
    { href: "/why-honeyhomes", label: "Why HoneyHomes" },
  ];

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.container}>
        <div className={styles.content}>
          {/* LOGO */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoText}>🍯HoneyHomes</span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className={styles.desktopNav}>
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={
                  location.pathname === link.href
                    ? styles.linkActive
                    : styles.linkInactive
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsOpen(!IsOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={
                  location.pathname === link.href
                    ? styles.mobileLinkActive
                    : styles.mobileLinkActive
                }
              >
                {link.label}
              </Link>
            ))}

            <div className={styles.mobileCta}>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={$(styles.fullWidthBtn)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
