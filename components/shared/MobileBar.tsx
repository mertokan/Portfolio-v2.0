import {useActiveSectionMobile} from '@/app/hooks/linkDetection'
import {NAVBAR_MENU} from '@/app/utils/navbarMenu'
import Link from 'next/link'
import React from 'react'
import {AiOutlineHome, AiOutlineMail, AiOutlineProject} from 'react-icons/ai'
import {HiOutlineInformationCircle} from 'react-icons/hi'

const MobileBar = () => {
  const activeSection = useActiveSectionMobile(NAVBAR_MENU.map((menu) => menu.path.substring(1)))

  return (
    <div className='container fixed z-30 flex items-center justify-center text-white md:hidden bottom-3'>
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
