import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{movie.title}</h2>

        {}
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
            className={css.backdropImg}
          />
        )}

        <p>{movie.overview}</p>

        {/* release_date */}
        {movie.release_date && (
          <p>
            <strong>Release date:</strong> {movie.release_date}
          </p>
        )}

        <button onClick={onClose} className={css.closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
}