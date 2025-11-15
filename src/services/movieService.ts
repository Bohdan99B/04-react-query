import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Пошук фільмів
 * @param query
 * @param page
 * @returns
 */
export async function fetchMovies(query: string, page = 1): Promise<MoviesResponse> {
  if (!TMDB_TOKEN) {
    throw new Error("TMDB token is missing. Please add it to your .env file.");
  }

  const response = await axios.get<MoviesResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  return response.data;
}
