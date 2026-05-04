import styles from "./Watchlist.module.css";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w154";

export default function Watchlist({ movies = [] }) {
  return (
    <aside className={styles.watchlist}>
      <div className={styles.headingRow}>
        <h2 className={styles.heading}>Watchlist</h2>
        {movies.length > 0 && (
          <span className={styles.count}>{movies.length}</span>
        )}
      </div>

      {movies.length === 0 ? (
        <p className={styles.empty}>
          Save a movie from the popup to start your watchlist.
        </p>
      ) : (
        <ul className={styles.list}>
          {movies.map((movie) => {
            const poster = movie.poster_path
              ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
              : null;
            const year = movie.release_date
              ? movie.release_date.slice(0, 4)
              : null;

            return (
              <li key={movie.id} className={styles.row}>
                <div className={styles.thumbWrap}>
                  {poster ? (
                    <img
                      src={poster}
                      alt=""
                      className={styles.thumb}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.thumbPlaceholder} aria-hidden />
                  )}
                </div>
                <div className={styles.rowText}>
                  <span className={styles.rowTitle}>{movie.title}</span>
                  {year && <span className={styles.rowYear}>{year}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
