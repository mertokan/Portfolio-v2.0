'use client'

import {FaExternalLinkAlt, FaGithub} from 'react-icons/fa'
import Button from './Button'
import Link from 'next/link'
import Image from 'next/image'
import {cn} from '@/lib/utils'

interface ProjectProps {
  project: any
  codeLang: any
}

const ProjectCards = ({project, codeLang}: ProjectProps) => {
  return (
    <div
      key={project.id}
      className={cn(
        'text-white border rounded-md group h-max xl:h-80 relative overflow-hidden w-full items-center grid lg:grid-cols-6 lg:grid-rows-4 xl:gap-2 p-5 grid-cols-3 grid-rows-6 gap-4',
        {'border-state-yellow': project.iDev === true, 'border-state-green': project.iDev === false}
      )}
    >
      {/* iDev */}
      {project.iDev && (
        <div
          className='absolute bg-state-yellow text-neutral-8 font-semibold w-64 text-center py-1 select-none z-10 
          group-odd:rotate-45 group-odd:-right-20 group-odd:top-10 
          group-even:-rotate-45 group-even:-left-20 group-even:top-7'
        >
          <p>In Development</p>
        </div>
      )}

      {/* Image */}
      <div
        className='rounded-2xl overflow-hidden select-none w-full h-full flex 
        col-span-3 row-span-2
      lg:group-odd:col-span-3 lg:group-odd:row-span-4
      lg:group-even:col-span-3 lg:group-even:row-span-4 lg:group-even:col-start-4 lg:group-even:row-start-1'
      >
        <Link href={`${project.live}`} target='_blank' className='w-full relative'>
          <Image
            fill
            src={project.image}
            loading='lazy'
            alt='project image'
            className='w-full h-full object-cover'
          />
        </Link>
      </div>
      {/* Title */}
      <h1
        className='text-center self-center font-medium text-lg
        col-span-3 row-start-3
        lg:group-odd:col-span-3 lg:group-odd:col-start-4 lg:group-odd:row-start-1
        lg:group-even:col-span-3 lg:group-even:col-start-1 lg:group-even:row-start-1'
      >
        {project.title}
      </h1>
      {/* Description */}
      <p
        className=' text-center
        col-span-3 row-start-4
      lg:group-odd:col-span-3 lg:group-odd:col-start-4 lg:group-odd:row-start-2 
      lg:group-even:col-span-3 lg:group-even:row-start-2'
      >
        {project.description}
      </p>

      {/* Code Languages */}
      <div
        className='flex justify-evenly items-center h-full flex-wrap gap-y-3 
        col-span-3 row-start-5
      lg:group-odd:col-span-3 lg:group-odd:col-start-4 lg:group-odd:row-start-3 
      lg:group-even:col-span-3 lg:group-even:row-start-3'
      >
        {project.codeLangsIDs.map((langId: number) => {
          const lang = codeLang.find((item: any) => item.id === langId)
          return (
            lang && (
              <span
                key={lang.id}
                className='px-3 py-1 border rounded-md border-state-yellow shadow-md shadow-state-yellow/30 !bg-transparent text-state-yellow font-medium'
              >
                {lang.title}
              </span>
            )
          )
        })}
      </div>
      {/* Project Links */}
      <div
        className='flex justify-around flex-wrap xlg:gap-4 lg:gap-1 self-center
        col-span-3 row-start-6
      lg:group-odd:col-span-3 lg:group-odd:col-start-4 lg:group-odd:row-start-4  
      lg:group-even:col-span-3 lg:group-even:row-start-4'
      >
        <Button as='a' href={project.github} target='_blank' variant='projectButton' size='xsmall'>
          <FaGithub className='block' />
          Github
        </Button>
        <Button as='a' href={project.live} target='_blank' variant='projectButton' size='xsmall'>
          Live
          <FaExternalLinkAlt className='block' />
        </Button>
      </div>
    </div>
  )
}

export default ProjectCards
