import React from 'react'
import Thumbnail from './thumbnail'
import Details from './details'
import RelatedMovies from './related-movies'

export default function DashboardVideoDetails() {
  return (
    <div className='w-full flex flex-col md:grid grid-cols-[1fr_2fr_1fr]'>
      <Thumbnail/>
      <Details/>
      <RelatedMovies/>
    </div>
  )
}
