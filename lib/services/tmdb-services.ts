/** @format */

import axios, { AxiosError, AxiosResponse } from "axios";

const tmdbinstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
});

export const getAllMovies = async (): Promise<tmdbResultResponse | undefined> => {
  try {
    const response = await tmdbinstance.get("/discover/movie");
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};

export const getAllMoviesPage = async (page: number): Promise<tmdbResultResponse | undefined> => {
  try {
    const response = await tmdbinstance.get(`/discover/movie?page=${page}`);
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};
export const getAllSeriesPage = async (page: number): Promise<tmdbSeriesResultResponse | undefined> => {
  try {
    const response = await tmdbinstance.get(`/discover/tv?page=${page}`);
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};
export const getAllMoviesPrevPage = async (page: number): Promise<tmdbResultResponse | undefined> => {
  try {
    const response = await tmdbinstance.get(`/discover/movie?page=${page - 1}`);
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};
export const getAllMoviesNextPage = async (page: number): Promise<tmdbResultResponse | undefined> => {
  try {
    const response = await tmdbinstance.get(`/discover/movie&page=${page + 1}`);
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};


export const getTrendingMovies = async (): Promise<tmdbResultResponse | undefined>  => {
  try {
    const response = await tmdbinstance.get("/trending/movie/day?language=en-US");
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};
export const getTopRatedMovies = async (): Promise<tmdbResultResponse | undefined>  => {
  try {
    const response = await tmdbinstance.get("/movie/top_rated?language=en-US&page=1");
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};
export const getNowPlayingMovies = async (): Promise<tmdbResultResponse | undefined>  => {
  try {
    const response = await tmdbinstance.get("/movie/now_playing?language=en-US&page=1");
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};

export const getUpcomingMovies = async (): Promise<tmdbResultResponse | undefined>  => {
  try {
    const response = await tmdbinstance.get("/movie/upcoming?language=en-US&page=1");
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};

export const getAllSeries = async (): Promise<tmdbSeriesResultResponse | undefined>  => {
  try {
    const response = await tmdbinstance.get("/discover/tv");
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};

export const getTrendingSeries = async (): Promise<tmdbSeriesResultResponse | undefined>  => {
  try {
    const response = await tmdbinstance.get("/tv/popular?language=en-US&page=1");
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};
export const getTopRatedSeries = async (): Promise<tmdbSeriesResultResponse | undefined>  => {
  try {
    const response = await tmdbinstance.get("/tv/top_rated?language=en-US&page=1");
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};
export const getUpcomingSeries = async (): Promise<tmdbSeriesResultResponse | undefined>  => {
  try {
    const response = await tmdbinstance.get("/tv/on_the_air?language=en-US&page=1");
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};
export const getNowPlayingSeries = async (): Promise<tmdbSeriesResultResponse | undefined>  => {
  try {
    const response = await tmdbinstance.get("/tv/airing_today?language=en-US&page=1");
    const result = response.data;
    return result;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
};


