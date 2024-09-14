/** @format */

type DynamicObject = {
  [key: string]: any;
};

interface MovieReturnType {
  title: string;
  imdb_id: string;
  year: string;
}

interface MoviesRequestResponse {
  tv_results: MovieReturnType[];
  results: number;
  Total_results: string;
  status: string;
  status_message: string;
}

interface ImageByIdRequestResponse {
  title: string;
  IMDB: string;
  poster: string;
  fanart: string;
  status: string;
  status_message: string;
}

type tmdbMovieResponse = {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  original_title: string;
  overview: string;
  original_language: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  [key: string]: any; // Allow additional unknown fields
};

interface tmdbResultResponse {
  page: number;
  results: tmdbMovieResponse[];
  total_pages: number;
  total_results: number;
}

type tmdbSeriesResponse = {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  original_name: string;
  overview: string;
  original_language: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  number_of_seasons: number;
  [key: string]: any;
};

interface tmdbSeriesResultResponse {
  page: number;
  results: tmdbSeriesResponse[];
  total_pages: number;
  total_results: number;
}

interface tmdbMovieDetialsType {
  [key: string]: any;
  backdrop_path: string;
  id: number;
  imdb_id: string;
  homepage: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: [{ id: number; name: string }];
}

interface DetailsProps {
  details: tmdbMovieDetialsType;
}

interface tmdbSeriesDetailsType {
  id: number;
  backdrop_path: string;
  episode_run_time: number[];
  first_air_date: string;
  genre: [{ id: number; name: string }];
  homepage: string;
  language: string;
  last_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  seasons: any[];
  vote_average: number;
  vote_count: number;
  tagline: string;
}


interface SearchResultsType {
  page: number;
  results: {id: number, name: string}[]
}