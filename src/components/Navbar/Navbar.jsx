import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HouseHeart } from "lucide-react";
import Button from "../ui/Button";
import { cn } from "../utils";
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
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* LOGO */}
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <HouseHeart className={styles.icon} />
            </div>
            <span className={styles.logoText}>HoneyHomes</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className={styles.desktopNav}>
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  styles.link,
                  location.pathname === link.href
                    ? styles.linkActive
                    : styles.linkInactive
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact">
              <Button size="sm" variant="primary">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className={cn(styles.mobileMenuBtn, isOpen && styles.open)}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <div
        className={cn(
          styles.mobileMenu,
          isOpen ? styles.menuOpen : styles.menuClosed
        )}
      >
        <div className={styles.mobileMenuContent}>
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                styles.mobileLink,
                location.pathname === link.href
                  ? styles.mobileLinkActive
                  : styles.mobileLinkInactive
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileCta}>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <Button className={styles.fullWidthBtn}>Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
