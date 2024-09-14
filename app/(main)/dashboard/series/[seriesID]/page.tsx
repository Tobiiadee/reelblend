/** @format */

import { getSeriesDetails } from "@/lib/services/tmdb-services";
import DashboardSeriesDetails from "@/modules/common/components/dashboard-series-details";
import SeriesDashboardVideo from "@/modules/common/components/series-dashboard-video";
import React from "react";



export default async function SeriesDashboard({
  params,
}: {
  params: { seriesID: string };
}) {
  const { seriesID } = params;

  const seriesDetails = await getSeriesDetails(seriesID);

  // console.log(seriesDetails);
  

  return (
    <div className='w-full relative flex flex-col space-y-24 mb-10 -mt-6'>
      <SeriesDashboardVideo />
      <DashboardSeriesDetails details={seriesDetails}/>
    </div>
  );
}

// export async function generateStaticParams() {
//   const ids = await getSeriesIds();

//   return ids?.map((id) => ({ movieId: id }));
// }

// export const getStaticProps = async () => {
//   const movieDetails = getMovieDetails();
// };
