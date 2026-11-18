"use client";

import { useEffect, useRef, useState } from "react";
import type { NewsItemContent } from "@/lib/content";
import NewsCard from "./news-card";
import styles from "./news-carousel.module.scss";

type NewsCarouselProps = {
  news: NewsItemContent[];
  today: string;
};

export default function NewsCarousel({ news, today }: NewsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const canScroll = news.length > 2;
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(canScroll);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !canScroll) return;

    const update = () => {
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      setCanGoBack(scroller.scrollLeft > 1);
      setCanGoForward(scroller.scrollLeft < maxScroll - 1);
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    return () => {
      scroller.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [canScroll, news.length]);

  const scrollByCard = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollerLeft = scroller.getBoundingClientRect().left;
    const cards = [...scroller.querySelectorAll("article")];
    const target =
      direction === 1
        ? cards.find((card) => card.getBoundingClientRect().left > scrollerLeft + 2)
        : [...cards]
            .reverse()
            .find((card) => card.getBoundingClientRect().left < scrollerLeft - 2);

    if (!target) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({
      left: scroller.scrollLeft + target.getBoundingClientRect().left - scrollerLeft,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Nyheter</h2>
        {canScroll && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Föregående nyheter"
              disabled={!canGoBack}
              onClick={() => scrollByCard(-1)}
            >
              <Arrow direction="back" />
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Nästa nyheter"
              disabled={!canGoForward}
              onClick={() => scrollByCard(1)}
            >
              <Arrow direction="forward" />
            </button>
          </div>
        )}
      </div>
      <div
        ref={scrollerRef}
        className={`${styles.reports} ${canScroll ? styles.scrollable : ""}`}
        id="nyheter-lista"
      >
        {news.map((item, index) => (
          <NewsCard
            key={`${item.type}-${item.url}-${index}`}
            item={item}
            today={today}
          />
        ))}
      </div>
    </>
  );
}

function Arrow({ direction }: { direction: "back" | "forward" }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d={direction === "back" ? "M19 7 L10 16 L19 25" : "M13 7 L22 16 L13 25"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
      />
    </svg>
  );
}
