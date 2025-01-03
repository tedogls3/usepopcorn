import { createContext, useContext } from "react";
import { useEffect, useState } from "react";

export const KEY = "af15e6fd";

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [watched, setWatched] = useState([]);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId !== id ? id : null));
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?s=${query}&apikey=${KEY}
          `,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            console.error(err);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return () => controller.abort();
    },
    [query]
  );

  return (
    <MoviesContext.Provider
      value={{
        KEY,
        query,
        setQuery,
        selectedId,
        movies,
        isLoading,
        error,
        watched,
        handleSelectMovie,
        handleAddWatched,
        handleDeleteWatched,
        handleCloseMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

function useMovies() {
  const context = useContext(MoviesContext);

  if (context === undefined)
    throw new Error("MoviesContext was used outside of MoviesProvider");

  return context;
}

export { MoviesProvider, useMovies };
