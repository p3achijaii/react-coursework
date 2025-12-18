import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home } from "lucide-react";
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
              <span stlye={{ fontSize: "1.5rem" }}>🍯</span>
            </div>
            <span className={styles.logoText}>HoneyHomes</span>
          </Link>

          {/* DESKTOP NAVIGATION */}
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
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={styles.mobileMenuBtn}
            >
              {isOpen ? "x" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
    </nav>
  );
}

export default Navbar;
