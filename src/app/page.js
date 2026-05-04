"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import popcorn from "@/images/popcorn.jpg";
import Filters from "./components/Filters";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";
import Watchlist from "./components/Watchlist";
import styles from "./page.module.css";

const WATCHLIST_STORAGE_KEY = "nextwatch:watchlist";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setWatchlist(Array.isArray(parsed) ? parsed : []);
    } catch {
      setWatchlist([]);
    }
  }, []);

  useEffect(() => {
    if (watchlist === null) return;
    try {
      window.localStorage.setItem(
        WATCHLIST_STORAGE_KEY,
        JSON.stringify(watchlist)
      );
    } catch {
      console.log("Error setting localStorage item");
    }
  }, [watchlist]);

  const handleResults = ({ movies, error }) => {
    setMovies(movies);
    setError(error);
  };

  const handleSaveToWatchlist = (movie) => {
    setWatchlist((prev) => {
      const list = prev ?? [];
      if (list.some((m) => m.id === movie.id)) return list;
      return [...list, movie];
    });
    setSelectedMovie(null);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.titleRow}>
            <Image
              src={popcorn}
              alt="NextWatch logo"
              className={styles.logo}
              width={44}
              height={44}
              priority
            />
            <h1 className={styles.title}>NextWatch</h1>
          </div>
          <p className={styles.description}>
            No more endless searching. Just great movies, found instantly.
          </p>
        </div>
      </header>

      <main className={styles.layout}>
        <Filters onResults={handleResults} />
        <MovieGrid
          movies={movies}
          error={error}
          onSelectMovie={setSelectedMovie}
        />
        <Watchlist movies={watchlist ?? []} />
      </main>

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onSave={handleSaveToWatchlist}
        />
      )}
    </div>
  );
}
