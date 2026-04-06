"use client";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import styles from "./page.module.css";
import React, { useState } from 'react';
import { getRestaurantsByCity } from "./api/yelp";
import {Card} from "@repo/ui/card";

export type Restaurants = {
  id: string;
  name: string;
  rating: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  location: {
    address1: string;
    address2: string|null;
    address3: string|null;
    city: string;
    country: string;
    state: string;
    zip_code: string|null;
    display_address: string[];
  }
}

export default function Home() {

  const [city, setCity] = useState("");
  const [restaurants, setRestaurants] = useState<Restaurants[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buttonClicked = async () => {
    if (city === "") {
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await getRestaurantsByCity(city);
      setRestaurants(data.businesses);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch restaurants");
      setRestaurants(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>
            Enter City
          </li>
          <li>See restaurant results</li>
        </ol>

        <div className={styles.ctas}>
          <Input value={city} className={styles.primary} onChange={(e) => {setCity(e.target.value)}}/>
        </div>
        <Button appName="web" className={styles.secondary} onClick={buttonClicked} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>

        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        
        {restaurants.length > 0 &&
            restaurants.map((restaurant) => (
                <Card
                    title={restaurant.name}
                    address={restaurant.location.display_address.join(', ')}
                    coordinates={[restaurant.coordinates.latitude, restaurant.coordinates.longitude]}
                    rating={restaurant.rating}
                >
                </Card>
            ))
        }
      </main>
    </div>
  );
}
