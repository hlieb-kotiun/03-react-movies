import axios from "axios";
import type { Movie } from "../types/movie";

const token = import.meta.env.VITE_TMDB_TOKEN;

interface Response {
  results: Movie[];
}

export const fetchMovies = async (
  query: string,
): Promise<Movie[] | undefined> => {
  try {
    const response = await axios.get<Response>(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          query,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response);

    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
