/** @format */
import axios from "axios";

export function requestOptions(params: DynamicObject, type: string) {
  const options = {
    method: "GET",
    url: process.env.NEXT_PUBLIC_API_BASE_URL as string,
    params: params,
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_API_KEY as string, // Authorization
      "x-rapidapi-host": process.env.NEXT_PUBLIC_API_HOST as string,
      Type: type,
    },
  };
  return options;
}

export async function getMoviesByYear(
  year: string,
  page: string
): Promise<MoviesRequestResponse | undefined> {
  const options = requestOptions({ year, page }, "get-movies-byyear");

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieImageById(
  movieid: string
): Promise<ImageByIdRequestResponse | undefined> {
  const options = requestOptions({ movieid }, "get-movies-images-by-imdb");

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
