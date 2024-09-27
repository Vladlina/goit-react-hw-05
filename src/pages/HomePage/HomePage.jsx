import { useState, useEffect } from "react";
import { trendingFilms } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    const getFilms = async () => {
      try {
        setLoader(true);
        const newFilm = await trendingFilms();
        setList(newFilm);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getFilms();
  }, []);

  return (
    <>
      {loader && <Loader />}
      {error && <Error />}
      {list.length > 0 && <MovieList value={list} />}
    </>
  );
}