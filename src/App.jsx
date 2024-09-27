import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from "./components/Layout/Layout"
import './App.css'

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage")
);
const MovieReviews = lazy(() => import("./components/MovieReviews/MovieReviews"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}