import type React from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: () => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps): React.ReactElement => {
  const handleSubmit = (formData: FormData): void => {
    const query = formData.get("query");
    console.log(query);
    onSubmit();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form action={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />

          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};
export default SearchBar;
