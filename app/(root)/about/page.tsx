'use client'
import BigTitle from '@/components/shared/BigTitle'
import CvButton from '@/components/shared/CvButton'
import {Skeleton} from '@/components/ui/skeleton'
interface allAbout {
  about?: any
  isLoading?: boolean
}

const About = ({about, isLoading}: allAbout) => {

  const description = about[0]?.description || ''
  const formatDescription = description.replace(/\\n/g, '\n')

  return (
    //<!-- Start About Seciton -->
    <section id='about' className='h-max bg-site-darkcolor3 py-24'>
      <BigTitle title='about me' />
      <div className='container mx-auto mb-9'>
        <div className='flex flex-wrap justify-center gap-8'>
          <div className='max-w-[75%] text-neutral-3'>
            <h2 className='text-white text-4xl mb-3'>Hi There! I'm Mert Okan</h2>
            <h4 className='text-state-yellow text-2xl font-light mb-3'>{about[0]?.position}</h4>
            <div className=''>
              {isLoading ? (
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-2/4' />
                </div>
              ) : (
                <p className='whitespace-pre-line'>{formatDescription}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='text-white container mx-auto text-center'>
        <CvButton />
      </div>
    </section>
    //<!-- End About Seciton -->
  )
}

export default About
