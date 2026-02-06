import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>(API_URL, {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
};
