import React from 'react'

interface BigTitleProps {
  title: string
}

const BigTitle = ({title}: BigTitleProps) => {
  return (
    <div className='container mb-[4.5rem] relative mx-auto'>
      <div className='text-center relative mb-10 -mt-[5px]'>
        <h4
          className='uppercase text-2xl font-medium text-state-yellow relative z-10
        before:content-[""] before:absolute before:bg-site-darkcolor5 before:w-44 before:h-[2px] before:-bottom-4 before:left-2/4 before:-translate-x-2/4
        after:content-[""] after:absolute after:bg-state-yellow after:w-20 after:h-[2px] after:-bottom-4 after:left-2/4 after:-translate-x-2/4'
        >
          {'<'}
          {title}
          {'>'}
        </h4>
        <h2 className='uppercase select-none absolute top-0 left-2/4 -translate-x-2/4 text-5xl lg:text-[90px] font-bold m-0 md:-mt-8 text-site-darkcolor1/50 w-full'>
          {'<'}
          {title}
          {'/>'}
        </h2>
      </div>
    </div>
  )
}

export default BigTitle
