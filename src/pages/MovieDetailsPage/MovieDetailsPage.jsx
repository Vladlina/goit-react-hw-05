import css from "./MovieDetailsPage.module.css";
import { useEffect, useRef, useState } from "react";
import { getFilmDetails } from "../../api";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";

export default function MovieDetailsPage() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const goBackLink = useRef(location.state ?? "/movies");

  useEffect(() => {
    const getFilms = async () => {
      try {
        setLoader(true);
        const newDetail = await getFilmDetails(movieId);
        setDetails(newDetail);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getFilms();
  }, [movieId]);

  if (!details) {
    return;
  }
  const { poster_path, title, overview, release_date, vote_average, genres } =
    details;

  return (
    <>
      {loader && <Loader />}
      {error && <Error />}
      {details && (
        <div className={css.container}>
          <NavLink className={css.link} to={goBackLink.current}>
            Go back
          </NavLink>
          <div className={css.wrapper}>
            <img
              className={css.img}
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt={title}
            />
            <div className={css.list}>
              <ul>
                <li>
                  <h2 className={css.title}>
                    {title} ({release_date})
                  </h2>
                </li>
                <li>
                  <p className={css.text}>
                    User Score: {vote_average.toFixed(1)} %
                  </p>
                </li>
                <li>
                  <p className={css.text}>Overview: </p>
                  <p>{overview}</p>
                </li>
                <li className={css.genres}>
                  <p className={css.text}>Genres:</p>
                  <ul className={css.genresList}>
                    {genres.map((genre) => (
                      <li key={genre.id}>{genre.name} </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <h2>Additional information</h2>
          <ul>
            <li>
              <NavLink className={css.navLink} to="cast">
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink className={css.navLink} to="reviews">
                Reviews
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      )}
    </>
  );
}