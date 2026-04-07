import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import s from "./App.module.css";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App(): React.ReactElement {
  const [movies, setMovie] = useState<Movie[] | undefined>([]);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onClose = (): void => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (q: string): Promise<void> => {
    setMovie([]);
    try {
      setIsError(false);
      setIsLoading(true);
      const res = await fetchMovies(q);
      if (res?.length === 0) {
        toast("No movies found for your request.");
      }
      setMovie(res);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (movie: Movie): void => {
    setCurrentMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <div className={s.app}>
      {isLoading ? (
        <Loader />
      ) : !isError ? (
        <SearchBar onSubmit={handleSubmit} />
      ) : (
        <ErrorMessage />
      )}
      <MovieGrid onSelect={handleImageClick} movies={movies || []} />
      {isModalOpen && <MovieModal onClose={onClose} movie={currentMovie} />}
    </div>
  );
}

export default App;
