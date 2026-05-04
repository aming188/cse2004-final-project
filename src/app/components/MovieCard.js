import styles from "./MovieCard.module.css";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : null;

  return (
    <article className={styles.card}>
      <div className={styles.posterWrap}>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            className={styles.poster}
            loading="lazy"
          />
        ) : (
          <div className={styles.posterPlaceholder}>No poster</div>
        )}
      </div>
      <h3 className={styles.title}>{movie.title}</h3>
    </article>
  );
}
