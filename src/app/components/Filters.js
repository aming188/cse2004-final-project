"use client";

import { useState } from "react";
import styles from "./Filters.module.css";

const GENRES = [
  "Action", "Adventure", "Animation", "Comedy", "Crime",
  "Drama", "Family", "Fantasy", "Horror", "Mystery",
  "Romance", "Sci-Fi", "Thriller",
];

const RUNTIMES = [
  { label: "Any", value: "any" },
  { label: "< 90 min", value: "lt90" },
  { label: "90–120 min", value: "90-120" },
  { label: "120–150 min", value: "120-150" },
  { label: "> 150 min", value: "gt150" },
];

const MOODS = [
  "Cozy", "Intense", "Funny", "Romantic",
  "Mind-bending", "Heartwarming", "Dark", "Adventurous",
];

const YEARS = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 2025 - i);

export default function Filters({ onResults }) {
  const [genre, setGenre] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [runtime, setRuntime] = useState("any");
  const [mood, setMood] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fromYears = YEARS.filter((y) => !yearTo || y <= Number(yearTo));
  const toYears = YEARS.filter((y) => !yearFrom || y >= Number(yearFrom));

  const handleApply = async () => {
    setIsLoading(true);

    const params = new URLSearchParams();
    if (genre) params.set("genre", genre);
    if (yearFrom) params.set("yearFrom", yearFrom);
    if (yearTo) params.set("yearTo", yearTo);
    if (runtime && runtime !== "any") params.set("runtime", runtime);

    try {
      const res = await fetch(`/api/endpoint?${params.toString()}`);
      const data = await res.json();
      onResults?.({
        movies: res.ok ? data.results ?? [] : [],
        error: res.ok ? null : data.error || `Request failed (${res.status})`,
      });
    } catch (err) {
      onResults?.({ movies: [], error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.heading}>Filters</h2>

      <section className={styles.section}>
        <h3 className={styles.label}>Genre</h3>
        <div className={styles.chips}>
          {GENRES.map((g) => (
            <button
              key={g}
              type="button"
              className={`${styles.chip} ${genre === g ? styles.chipActive : ""}`}
              onClick={() => setGenre(g === genre ? "" : g)}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.label}>Year</h3>
        <div className={styles.yearRow}>
          <select
            className={styles.select}
            value={yearFrom}
            onChange={(e) => setYearFrom(e.target.value)}
            aria-label="From year"
          >
            <option value="">From</option>
            {fromYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <span className={styles.dash}>–</span>
          <select
            className={styles.select}
            value={yearTo}
            onChange={(e) => setYearTo(e.target.value)}
            aria-label="To year"
          >
            <option value="">To</option>
            {toYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.label}>Runtime</h3>
        <div className={styles.chips}>
          {RUNTIMES.map((r) => (
            <button
              key={r.value}
              type="button"
              className={`${styles.chip} ${runtime === r.value ? styles.chipActive : ""}`}
              onClick={() => setRuntime(r.value)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.label}>Mood</h3>
        <div className={styles.chips}>
          {MOODS.map((m) => (
            <button
              key={m}
              type="button"
              className={`${styles.chip} ${mood === m ? styles.chipActive : ""}`}
              onClick={() => setMood(m === mood ? "" : m)}
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      {/* Triggers the Movie API */}
      <button
        type="button"
        className={styles.applyButton}
        onClick={handleApply}
        disabled={isLoading}
      >
        {isLoading ? "Loading…" : "Apply Filters"}
      </button>
    </aside>
  );
}
