import { useRef } from "react";
import { useKey } from "./useKey";
import { useMovies } from "./contexts/MoviesContext";

function SearchMovie() {
  const { query, setQuery } = useMovies();

  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export default SearchMovie;
