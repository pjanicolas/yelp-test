import { type JSX } from "react";
import styles from "./card.module.css";

export function Card({
  className,
  title,
  address,
  coordinates,
  rating,
}: {
  className?: string;
  title: string;
  address: string;
  coordinates: number[];
  rating: number;
  children: React.ReactNode;
  href: string;
}): JSX.Element {
  const mapsUrl = `https://www.google.com/maps/search/${coordinates[0]},${coordinates[1]}`;

  return (
    <div className={`${styles.card} ${className || ""}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.rating}>
          <span className={styles.star}>★</span>
          <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
        </div>
      </div>
        
      
      <div className={styles.footer}>
        <p className={styles.address}>{address}</p>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.coordinates}>
          📍 {coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}
        </a>
      </div>
    </div>
  );
}
