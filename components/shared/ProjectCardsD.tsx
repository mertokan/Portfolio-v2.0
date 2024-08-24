'use client'

import {FaExternalLinkAlt, FaGithub} from 'react-icons/fa'
import classNames from 'classnames'
import Button from './Button'
import Link from 'next/link'
import Image from 'next/image'

interface ProjectProps {
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void
  project: any
  codeLang: any
}

const ProjectCardsD = ({project, onClick, codeLang}: ProjectProps) => {
  const formattedCreatedAt = new Date(project.createdAt).toLocaleString('en-US', {
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  const formattedUpdatedAt = new Date(project.updatedAt).toLocaleString('en-US', {
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  return (
    <div
      key={project.id}
      className={classNames(
        'text-white border rounded-md group xl:even:flex-row-reverse xl:flex-row flex-col h-max xl:h-80 relative overflow-hidden w-full grid grid-cols-6 grid-rows-4 gap-2 p-5',
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

      {/* Placement */}
      {project.placement && (
        <div
          className='absolute bg-state-yellow text-neutral-8 font-semibold w-32 text-center py-1 select-none z-10
        group-odd:rotate-45 group-odd:-right-12 group-odd:top-0
        group-even:-rotate-45 group-even:-left-12 group-even:top-0'
        >
          <p>{project.placement}</p>
        </div>
      )}

      {/* Image */}
      <div className='rounded-2xl overflow-hidden select-none w-full h-full flex row-span-2 col-start-1 row-start-2'>
        <Link href={`${project.live}`} target='_blank' className='w-full relative'>
          <Image
            fill
            src={project.image}
            alt='project image'
            className='w-full h-full object-cover'
          />
        </Link>
      </div>
      {/* Title */}
      <h1 className='text-center self-center font-medium text-lg col-span-4 col-start-2 row-start-1'>
        {project.title}
      </h1>
      {/* Description */}
      <p className='col-span-2 row-span-2 col-start-2 row-start-2'>{project.description}</p>

      {/* Dates */}
      <div className='col-span-2 col-start-4 row-start-4 flex flex-col self-center'>
        <p>CreatedAt: {formattedCreatedAt}</p>
        <p>UpdatedAt: {formattedUpdatedAt}</p>
      </div>
      {/* Code Languages */}
      <div className='flex justify-evenly h-full flex-wrap gap-y-3 col-span-2 row-span-2 col-start-4 row-start-2'>
        {project.codeLangsIDs.map((langId: number) => {
          const lang = codeLang.find((item: any) => item.id === langId)
          return (
            lang && (
              <span
                key={lang.id}
                className='px-3 py-1 border rounded-md border-state-yellow shadow-md shadow-state-yellow/30 !bg-transparent h-max text-state-yellow font-medium'
              >
                {lang.title}
              </span>
            )
          )
        })}
      </div>
      {/* Project Links */}
      <div className='flex justify-around col-span-2 col-start-2 row-start-4 flex-wrap xlg:gap-4 lg:gap-1 self-center'>
        <Button as='a' href={project.github} target='_blank' variant='projectButton' size='xsmall'>
          <FaGithub className='block' />
          Github
        </Button>
        <Button as='a' href={project.live} target='_blank' variant='projectButton' size='xsmall'>
          Live
          <FaExternalLinkAlt className='block' />
        </Button>
      </div>
      {/* Delete Button */}
      <div className='row-span-2 col-start-6 row-start-2 w-full h-full'>
        <Button variant={'dashboardButton'} onClick={onClick} className='w-full h-full'>
          Delete
        </Button>
      </div>
    </div>
  )
}

export default ProjectCardsD
