import React from 'react'
import { Button } from '../ui/button'
import { Ellipsis, Heart, Play, Share2 } from 'lucide-react'
import { Text } from './text'

export default function VideoActions() {
  return (
    <div className='flex items-center space-x-4'>
      <Button variant={"default"} className='w-36 rounded-2xl py-5 flex items-center space-x-6'>
        <Play size={16} strokeWidth={1.5}/>
        <Text variant={"p"}>Watch</Text>
      </Button>

      <div className='cursor-pointer group w-10 aspect-square border-2 border-[#f84531] flex items-center justify-center rounded-full'>
        <Heart size={18} color='#f84531' strokeWidth={1.5} fill='#f84531' className='group-active:scale-90 transition-all duration-200'/>
      </div>

      <div className='cursor-pointer group w-10 aspect-square border-2 flex items-center justify-center rounded-full'>
        <Share2 size={20} strokeWidth={1.5} className='group-active:scale-90 transition-all duration-200'/>
      </div>

      <div className='cursor-pointer group w-10 aspect-square border-2 flex items-center justify-center rounded-full'>
        <Ellipsis size={20} strokeWidth={1.5} className='group-active:scale-90 transition-all duration-200'/>
      </div>
    </div>
  )
}
