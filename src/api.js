import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const authorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmQ4ODA1ZTQ0MWJlY2ZiMmY5ZTU3MDY4MjllNGQ1MiIsInN1YiI6IjY2MzRlMThkYWQ1OWI1MDEyNTZkZTc3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7M_pKa2O0tbMOJe0WVZhG3tw8FegIbZ3Y43BvSTNSE0";

export const trendingFilms = async () => {
  const response = axios.get("trending/movie/day", {
    headers: {
      Authorization: authorization,
    },
    params: { language: "en-US" },
  });

  return (await response).data.results;
};

export const getFilmDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, {
    headers: {
      Authorization: authorization,
    },
    params: {
      language: "en-US",
    },
  });

  return response.data;
};

export const getCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    headers: {
      Authorization: authorization,
    },
    params: {
      language: "en-US",
    },
  });

  return response.data;
};

export const getReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`, {
    headers: {
      Authorization: authorization,
    },
    params: {
      language: "en-US",
    },
  });

  return response.data;
};
export const getSearchMovies = async (query, page) => {
  const response = await axios.get("search/movie", {
    headers: {
      Authorization: authorization,
    },
    params: {
      language: "en-US",
      include_adult: "false",
      page,
      query,
    },
  });

  return response.data;
};
