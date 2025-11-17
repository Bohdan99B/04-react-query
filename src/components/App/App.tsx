import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import ReactPaginate from "react-paginate";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

import toast from "react-hot-toast";
import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  useEffect(() => {
    const load = async () => {
      if (!query) return;

      try {
        setLoading(true);
        setError("");

        const data = await fetchMovies({ query, page });

        setMovies(data.results);
        setTotalPages(data.total_pages);

        if (data.results.length === 0) {
          toast("No movies found for your request");
        }
      } catch {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [query, page]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className={css.container}>
      {}
      <div className={css.topBar}>
        <div className={css.logo}>Powered by TMDB</div>
        <SearchBar onSearch={handleSearch} />
      </div>

      {}
      <div className={css.divider} />

      {}
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {}
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelectMovie={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
