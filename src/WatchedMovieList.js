import { useMovies } from "./contexts/MoviesContext";
import WatchedMovie from "./WatchedMovie";

function WatchedMovieList() {
  const { watched, handleDeleteWatched } = useMovies();

  return (
    <ul className="list">
      {watched?.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={handleDeleteWatched}
        />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
