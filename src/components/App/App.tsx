import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie, MoviesResponse } from "../../types/movie";
import styles from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  
  const queryResult = useQuery<MoviesResponse, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5, // 5 хв кешу
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const data = queryResult.data;

  return (
    <div className={styles.wrapper}>
      {}
      <SearchBar onSubmit={handleSearch} />

      {}
      {data?.total_pages && data.total_pages > 1 && (
        <div className={styles.paginationWrapper}>
          <ReactPaginate
            pageCount={data.total_pages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={(event: { selected: number }) => setPage(event.selected + 1)}
            forcePage={page - 1}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            nextLabel="→"
            previousLabel="←"
          />
        </div>
      )}

      {}
      {queryResult.isLoading && <Loader />}
      {queryResult.isError && <ErrorMessage />}

      {}
      {!queryResult.isLoading && !queryResult.isError && data?.results.length ? (
        <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
      ) : null}

      {}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
