'use client'

import {FaGithub, FaLinkedin, FaTwitter} from 'react-icons/fa'
import {Skeleton} from '../ui/skeleton'
import Particle from '../shared/Particle'
import Symbol from '../shared/Symbol'

interface AllAbout {
  about?: any
  isLoading?: boolean
}

export default function Banner({about, isLoading}: AllAbout) {
  return (
    <section className='relative h-screen' id='home'>
      <div className='absolute -z-10'>
        <Particle />
      </div>
      <div className='h-screen absolute w-full flex flex-col items-center justify-center container'>
        <h1 className='text-6xl font-semibold mb-5 text-center'>
          Hi, I am <span className='text-state-yellow'>Mert Okan</span>
        </h1>
        {isLoading ? (
          <Skeleton className='h-4 w-56 mb-6 ' />
        ) : (
          <p className='text-lg font-light mb-6 text-neutral-3 text-center'>{about?.smallTitle}</p>
        )}
        <div className='flex justify-center items-center gap-3'>
          <Symbol to='https://www.linkedin.com/in/mert-okan/' target='_blank'>
            <FaLinkedin />
          </Symbol>
          <Symbol to='https://twitter.com/mert_okan_12' target='_blank'>
            <FaTwitter />
          </Symbol>
          <Symbol to='https://github.com/mertokan' target='_blank'>
            <FaGithub />
          </Symbol>
        </div>
      </div>
    </section>
  )
}
