"use client";

import { useEffect, useState } from "react";
import styles from "./site-header.module.scss";

const navItems = [
  { id: "nyheter", label: "Nyheter" },
  { id: "om", label: "Om" },
  { id: "kontakt", label: "Kontakt" },
] as const;

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] =
    useState<(typeof navItems)[number]["id"] | undefined>(undefined);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 80);

      const isAtPageBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const sectionAtScrollPosition = isAtPageBottom
        ? navItems[navItems.length - 1]
        : [...navItems].reverse().find(({ id }) => {
          const section = document.getElementById(id);
          return section && section.getBoundingClientRect().top <= window.innerHeight * 0.35;
        });

      setActiveSection(sectionAtScrollPosition?.id);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const handleNavClick = (id: (typeof navItems)[number]["id"]) => {
    setActiveSection(id);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation} aria-label="Huvudmeny">
        {navItems.map(({ id, label }) => (
          <a
            key={id}
            className={`${styles.link} small ${activeSection === id ? styles.active : ""}`}
            href={`#${id}`}
            aria-current={activeSection === id ? "page" : undefined}
            onClick={() => handleNavClick(id)}
          >
            {label}
          </a>
        ))}
      </nav>
      <a href="#top" aria-label="Till sidans början">
        <img
          className={styles.logo}
          src={isScrolled ? "/images/symbol_rgb.svg" : "/images/logo_rgb.svg"}
          alt=""
        />
      </a>
      <div className={styles.secondaryNavigation}>
        <span className="small"><a href="https://confirmsubscription.com/h/y/8FFD88D22477A41A" target="_new">Nyhetsbrev</a></span>
        <span className="small"><a href="https://www.instagram.com/tankearenaforkultur/" target="_new"> Instagram</a></span>
      </div>
    </header >
  );
}
