import React from 'react'

export default function VideoTags({name}: {name: string}) {
  return (
    <div className='w-max border-2 rounded-2xl flex items-center justify-center px-3 py-1'>
      <p className='capitalize text-sm font-medium'>{name}</p>
    </div>
  )
}
