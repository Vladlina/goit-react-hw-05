import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../../api";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

export default function MovieReviews() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getFilms = async () => {
      try {
        setLoader(true);
        const newReviews = await getReviews(movieId);

        setReviews(newReviews.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getFilms();
  }, [movieId]);

  return (
    <div>
      {loader && <Loader />}
      {error && <Error />}
      {reviews.length === 0 && (
        <p>Sorry. We dont have any reviews for this movie</p>
      )}
      {reviews && (
        <ul className={css.container}>
          {reviews.map((item) => (
            <li key={item.id}>
              <h2>Author: {item.author}</h2>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}