"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import popcorn from "@/images/popcorn.jpg";
import Filters from "./components/Filters";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";
import Watchlist from "./components/Watchlist";
import StatsPopup from "./components/StatsPopup";
import styles from "./page.module.css";

const WATCHLIST_STORAGE_KEY = "nextwatch:watchlist";
const STATS_STORAGE_KEY = "nextwatch:stats";

const EMPTY_STATS = {
  liked: { count: 0, totalStars: 0 },
  disliked: { count: 0, totalStars: 0 },
};

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState(null);
  const [stats, setStats] = useState(null);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setWatchlist(Array.isArray(parsed) ? parsed : []);
    } catch {
      setWatchlist([]);
    }

    try {
      const raw = window.localStorage.getItem(STATS_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : EMPTY_STATS;
      setStats({
        liked: {
          count: parsed?.liked?.count ?? 0,
          totalStars: parsed?.liked?.totalStars ?? 0,
        },
        disliked: {
          count: parsed?.disliked?.count ?? 0,
          totalStars: parsed?.disliked?.totalStars ?? 0,
        },
      });
    } catch {
      setStats(EMPTY_STATS);
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

  useEffect(() => {
    if (stats === null) return;
    try {
      window.localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch {
      console.log("Error setting localStorage item");
    }
  }, [stats]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/endpoint");
        const data = await res.json();
        if (cancelled) return;
        setMovies(res.ok ? data.results ?? [] : []);
        setError(res.ok ? null : data.error || `Request failed (${res.status})`);
      } catch (err) {
        if (cancelled) return;
        setError(err.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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

  const handleRemoveFromWatchlist = (movieId) => {
    setWatchlist((prev) => (prev ?? []).filter((m) => m.id !== movieId));
  };

  const handleMarkWatched = ({ movieId, liked, rating }) => {
    if (liked !== null) {
      setStats((prev) => {
        const current = prev ?? EMPTY_STATS;
        const key = liked ? "liked" : "disliked";
        return {
          ...current,
          [key]: {
            count: current[key].count + 1,
            totalStars: current[key].totalStars + rating,
          },
        };
      });
    }
    handleRemoveFromWatchlist(movieId);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerTop}>
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
            <button
              type="button"
              className={styles.statsButton}
              onClick={() => setShowStats(true)}
            >
              Stats
            </button>
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
        <Watchlist
          movies={watchlist ?? []}
          onRemove={handleRemoveFromWatchlist}
          onMarkWatched={handleMarkWatched}
        />
      </main>

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onSave={handleSaveToWatchlist}
        />
      )}

      {showStats && (
        <StatsPopup
          stats={stats ?? EMPTY_STATS}
          onClose={() => setShowStats(false)}
          onReset={() => setStats(EMPTY_STATS)}
        />
      )}
    </div>
  );
}
