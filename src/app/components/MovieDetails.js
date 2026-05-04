import styles from "./MovieDetails.module.css";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const formatRuntime = (mins) => {
  if (!mins) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0) {
    return `${h}h ${m}m`;
  } else {
    return `${m}m`;
  }
};

export default function MovieDetails({ movie, onClose }) {
  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : null;

  const year = movie.release_date ? movie.release_date.slice(0, 4) : null;
  const rating =
    typeof movie.vote_average === "number" && movie.vote_average > 0
      ? movie.vote_average.toFixed(1)
      : null;
  const runtimeLabel = formatRuntime(movie.runtime);

  const metaParts = [
    year,
    rating ? `★ ${rating}` : null,
    runtimeLabel,
  ].filter(Boolean);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <header className={styles.header}>
          <h2 className={styles.title}>{movie.title}</h2>
          {metaParts.length > 0 && (
            <p className={styles.meta}>
              {metaParts.map((part, i) => (
                <span key={i} className={styles.metaItem}>
                  {i > 0 && <span className={styles.dot}>•</span>}
                  <span>{part}</span>
                </span>
              ))}
            </p>
          )}
        </header>

        <div className={styles.body}>
          <p className={styles.description}>
            {movie.overview || "No description available."}
          </p>
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} poster`}
              className={styles.poster}
            />
          ) : (
            <div className={styles.posterPlaceholder}>No poster</div>
          )}
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.backButton} onClick={onClose}>
            Back
          </button>
          <button type="button" className={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
