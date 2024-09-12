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
  [key: string]: any; 
}

interface tmdbSeriesResultResponse {
  page: number;
  results: tmdbSeriesResponse[];
  total_pages: number;
  total_results: number;
}
