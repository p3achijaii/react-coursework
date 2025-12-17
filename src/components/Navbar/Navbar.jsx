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
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Home className={styles.icon} />
          </div>
          <span className={styles.logoText}>HoneyHomes</span>
        </Link>
      </div>

      <div className={styles.link}>
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={
              location.pathname === link.href
                ? styles.linkActivate
                : styles.link
            }
          >
            {link.label}
          </Link>
        ))}

        <Link to="/contact" className={styles.contactBtn}>
          Contact Us
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
