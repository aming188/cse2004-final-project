import MovieCard from "./MovieCard";
import styles from "./MovieGrid.module.css";

export default function MovieGrid({ movies = [], error }) {
  if (error) {
    return <p className={styles.message}>{error}</p>;
  }

  if (!movies.length) {
    return <p className={styles.message}>Apply filters to see movies.</p>;
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
