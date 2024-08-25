import {useActiveSection} from '@/app/hooks/linkDetection'
import Link from 'next/link'
import React from 'react'
import {AiOutlineHome, AiOutlineMail, AiOutlineProject} from 'react-icons/ai'
import {HiOutlineInformationCircle} from 'react-icons/hi'

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
const MobileBar = () => {

  const activeSection = useActiveSection(NAVBAR_MENU.map((menu) => menu.path.substring(1)))
  
  return (
    <div className='fixed md:hidden container items-center z-30 bottom-3 text-white flex justify-center'>
      <div className='border-state-yellow border-[2px] shadow-inner shadow-state-yellow bg-site-darkcolor4/80 flex justify-evenly w-3/4 rounded-3xl select-none'>
        {NAVBAR_MENU.map((menu, key) => (
          <Link
            key={key}
            href={menu.path}
            className={`py-4 uppercase font-medium inline-block transition-all duration-300 ease-in-out cursor-pointer ${
              activeSection === menu.path.substring(1) ? 'text-state-yellow' : ''
            }`}
          >
            {menu.icon}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileBar
