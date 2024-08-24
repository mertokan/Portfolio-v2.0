'use client'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {cookies} from 'next/headers'
import {useRouter} from 'next/navigation'
import {getCookie} from '../utils/getCookie'

export default function Home() {
  return (
    <>
      <section className='bg-contain py-5 md:py-10'>
        <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0'>
          <div className='flex flex-col justify-center gap-8'>
            <h1 className=''>Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className=''></p>
            <button className='button w-full sm:w-fit'>
              <div className='flex flex-col'>
                <Link href='/dashboard/login'>Login</Link>
                <Link href='/dashboard/cv'>Cv</Link>
                <Link href='/dashboard/about'>About</Link>
                <Link href='/dashboard/project'>Project</Link>
              </div>
            </button>
          </div>

       
        </div>
        <div></div>
      </section>
    </>
  )
}
