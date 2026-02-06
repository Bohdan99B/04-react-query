import { useEffect, useRef, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import ReactPaginate from "react-paginate";

import { fetchMovies } from "../../services/movieService";
import type { MoviesResponse } from "../../services/movieService";
import type { Movie } from "../../types/movie";

import toast from "react-hot-toast";
import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useQuery<MoviesResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: Boolean(query),
    placeholderData: keepPreviousData,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  const lastToastKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!query || !data) return;

    if (data.results.length === 0) {
      const toastKey = `${query}-${page}-${data.page}`;
      if (lastToastKeyRef.current !== toastKey) {
        toast("No movies found for your request");
        lastToastKeyRef.current = toastKey;
      }
    } else {
      lastToastKeyRef.current = null;
    }
  }, [data, page, query]);

  const handleSubmit = (value: string) => {
    if (value === query) {
      setPage(1);
      refetch();
      return;
    }

    setQuery(value);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className={css.container}>
      {}
      <div className={css.topBar}>
        <div className={css.logo}>Powered by TMDB</div>
        <SearchBar onSubmit={handleSubmit} />
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
      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Failed to load movies" />}
      {query && !isLoading && !isError && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
