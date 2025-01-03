import { useMovies } from "./contexts/MoviesContext";

import NavBar from "./NavBar";
import Logo from "./Logo";
import SearchMovie from "./SearchMovie";
import NumResults from "./NumResults";
import Main from "./Main";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedMovieList from "./WatchedMovieList";
import WatchedSummary from "./WatchedSummary";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";

export default function App() {
  const { isLoading, error, selectedId } = useMovies();

  return (
    <>
      <NavBar>
        <Logo />
        <SearchMovie />
        <NumResults />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails />
          ) : (
            <>
              <WatchedSummary />
              <WatchedMovieList />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
