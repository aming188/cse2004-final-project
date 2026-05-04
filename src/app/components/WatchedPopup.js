"use client";

import { useState } from "react";
import styles from "./WatchedPopup.module.css";

export default function WatchedPopup({ movie, onClose, onSubmit }) {
  const [liked, setLiked] = useState(null);
  const [rating, setRating] = useState(5);

  if (!movie) return null;

  const handleSubmit = () => {
    onSubmit?.({ movieId: movie.id, liked, rating });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <header className={styles.header}>
          <p className={styles.eyebrow}>You watched</p>
          <h2 className={styles.title}>{movie.title}</h2>
        </header>

        <section className={styles.section}>
          <p className={styles.label}>Did you like it?</p>
          <div className={styles.choices}>
            <button
              type="button"
              className={`${styles.choice} ${
                liked === true ? styles.likeActive : ""
              }`}
              onClick={() => setLiked(true)}
              aria-pressed={liked === true}
            >
              <span className={styles.choiceIcon}>👍</span>
              <span>Liked it</span>
            </button>
            <button
              type="button"
              className={`${styles.choice} ${
                liked === false ? styles.dislikeActive : ""
              }`}
              onClick={() => setLiked(false)}
              aria-pressed={liked === false}
            >
              <span className={styles.choiceIcon}>👎</span>
              <span>Didn&apos;t like it</span>
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.ratingHeader}>
            <p className={styles.label}>Your rating</p>
            <span className={styles.scaleValue}>{rating} / 10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className={styles.slider}
            aria-label="Rate from 1 to 10"
          />
          <div className={styles.scaleEnds}>
            <span>1</span>
            <span>10</span>
          </div>
        </section>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
