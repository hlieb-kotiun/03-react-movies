import { useEffect, useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import s from "./App.module.css";
import { fetchMovies } from "../../services/movieService";

function App() {
  const [query, setQuery] = useState<string>("batman");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchMovies(query);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [query]);
  return (
    <div className={s.app}>
      <SearchBar onSubmit={() => {}} />
      <MovieGrid onSelect={() => {}} movies={[]} />
    </div>
  );
}

export default App;
