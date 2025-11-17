import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelectMovie }: MovieGridProps) {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => onSelectMovie(movie)}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : "https://via.placeholder.com/300x450"
            }
            alt={movie.title}
          />
        </li>
      ))}
    </ul>
  );
}
