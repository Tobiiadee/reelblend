import Loader from '@/modules/common/ui/loader'
import React from 'react'

export default function Loading() {
  return (
    <div className='w-dvw h-dvh grid place-items-center bg-background'>
      <Loader />
    </div>
  )
}
