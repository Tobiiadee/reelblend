/** @format */

import { getMovieDetails, getMovieIds } from "@/lib/services/tmdb-services";
import DashboardMovieDetails from "@/modules/common/components/dashboard-movie-details";
import MovieDashboardVideo from "@/modules/common/components/movie-dashboard-video";
import React from "react";


// interface MovieDashboardProps {
//   params: {
//     movieId: string;
//   };
//   searchParams: {
//     title?: string;
//   };
// }



export default async function MovieDashboard({
  params,
}: {
  params: { movieID: string };
}) {
  const { movieID } = params;

  const movieDetails = await getMovieDetails(movieID);

  // console.log(movieDetails);
  

  return (
    <div className='w-full relative flex flex-col space-y-24 mb-10 -mt-6'>
      <MovieDashboardVideo details={movieDetails}/>
      <DashboardMovieDetails details={movieDetails}/>
    </div>
  );
}

export async function generateStaticParams() {
  const ids = await getMovieIds();

  return ids?.map((id) => ({ movieId: id }));
}

// export const getStaticProps = async () => {
//   const movieDetails = getMovieDetails();
// };
