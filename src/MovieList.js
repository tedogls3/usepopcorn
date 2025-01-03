import Movie from "./Movie";
import { useMovies } from "./contexts/MoviesContext";

function MovieList() {
  const { movies, handleSelectMovie } = useMovies();
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={handleSelectMovie}
        />
      ))}
    </ul>
  );
}

export default MovieList;
