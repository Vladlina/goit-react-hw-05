import { useEffect, useState } from "react";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import css from "./MoviesPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { getSearchMovies } from "../../api";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [notFoundError, setNotFoundError] = useState(false);
  const [params, setParams] = useSearchParams();

  const queryParams = params.get("query") ?? "";

  const onSubmitForm = (event) => {
    event.preventDefault();
    setMovies([]);
    setPage(1);
    const form = event.target;
    const queryMovies = form.elements.movies.value.trim();
    setParams({ query: queryMovies });

    if (queryMovies === "") {
      toast.error("Please, enter your request!");
      return;
    }
    setError(false);
    form.reset();
  };

  useEffect(() => {
    if (!queryParams) {
      return;
    }

    const getMovies = async () => {
      try {
        setError(false);
        setLoader(true);
        setNotFoundError(false);

        const newMovies = await getSearchMovies(queryParams, page);

        setMovies(newMovies.results);

        if (newMovies.length === 0) {
          setNotFoundError(true);
        }
        // setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getMovies();
  }, [queryParams, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <form className={css.container} onSubmit={onSubmitForm}>
        <input
          className={css.input}
          name="movies"
          type="text"
          autoComplete="off"
          placeholder="Search movies"
          autoFocus
        />
        <button className={css.btn} type="submit">
          Search
        </button>
        <Toaster />
      </form>
      {loader && <Loader />}
      {error && <Error />}
      {notFoundError && <p>Not found! Please, try to make another request!</p>}
      {movies.length > 0 && <MovieList value={movies} />}
      {movies.length > 0 && !loader && (
        <LoadMoreBtn onClick={handleLoadMore} page={page} />
      )}
    </>
  );
}