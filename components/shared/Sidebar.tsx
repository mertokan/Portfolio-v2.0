'use client'
import Link from 'next/link'
import {AiOutlineHome, AiOutlineMail, AiOutlineProject} from 'react-icons/ai'
import {HiOutlineInformationCircle} from 'react-icons/hi'
import {useActiveSection} from '@/app/hooks/linkDetection'
import CvButton from './CvButton'
import Image from 'next/image'
import pp from '@/images/pp.jpg'

const NAVBAR_MENU = [
  {
    path: '#home',
    title: 'Home',
    icon: <AiOutlineHome size={24} />,
  },
  {
    path: '#about',
    title: 'About',
    icon: <HiOutlineInformationCircle size={24} />,
  },
  {
    path: '#projects',
    title: 'Projects',
    icon: <AiOutlineProject size={24} />,
  },
  {
    path: '#contact',
    title: 'Contact Me',
    icon: <AiOutlineMail size={24} />,
  },
]

export default function Sidebar() {
  const activeSection = useActiveSection(NAVBAR_MENU.map((menu) => menu.path.substring(1)))

  return (
    <aside className='hidden md:block st-style2 st-sticky-header fixed min-h-full top-0 flex-shrink-0 w-[300px] border-r border-site-darkcolor4 bg-site-darkcolor2 overflow-auto'>
      <div className='px-5 pt-10 flex flex-col min-h-full'>
        <div className='container mx-auto'>
          <div className='h-48 w-48 rounded-full border-[6px] border-white/10 m-auto relative'>
            <Image
              src='/assets/images/pp.jpg'
              fill
              alt='pp image'
              className='rounded-inherit h-full w-full object-cover object-photo'
            />
          </div>

          <div className='flex flex-col text-white'>
            <ul className='flex flex-col'>
              {NAVBAR_MENU.map((menu, key) => (
                <li key={key}>
                  <Link
                    href={menu.path}
                    className={`py-4 uppercase font-medium inline-block transition-all duration-300 ease-in-out cursor-pointer ${
                      activeSection === menu.path.substring(1) ? 'text-state-yellow' : ''
                    }`}
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <CvButton />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
