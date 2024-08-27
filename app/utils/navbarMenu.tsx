import {AiOutlineHome, AiOutlineProject, AiOutlineMail} from 'react-icons/ai'
import {HiOutlineInformationCircle} from 'react-icons/hi'

export const NAVBAR_MENU = [
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
  // {
  //   path: '#contact',
  //   title: 'Contact Me',
  //   icon: <AiOutlineMail size={24} />,
  // },
]
