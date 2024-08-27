'use client'
import {useEffect, useState} from 'react'
import {getAllAbout} from '@/actions/aboutAction'
import {getAllCodeLang, getAllProject} from '@/actions/projectAction'
import MobileBar from '@/components/shared/MobileBar'
import Banner from '@/components/section/Banner'
import About from '@/components/section/About'
import Projects from '@/components/section/Projects'

export default function Home() {
  const [allAbout, setAllAbout] = useState<any>({})
  const [allProject, setAllProject] = useState<any[]>([])
  const [allCodeLang, setAllCodeLang] = useState<any[]>([])
  const [isLoadingA, setIsLoadingA] = useState(false)
  const [isLoadingP, setIsLoadingP] = useState(false)

  async function fetchAbout() {
    setIsLoadingA(true)
    try {
      const about = await getAllAbout()
      setAllAbout(about[0])
    } catch (error) {
      console.error('Error fetching about data:', error)
    } finally {
      setIsLoadingA(false)
    }
  }

  async function fetchProject() {
    setIsLoadingP(true)
    try {
      const pLang = await getAllCodeLang()
      const aProject = await getAllProject()
      setAllCodeLang(pLang)
      setAllProject(aProject)
    } catch (error) {
      console.error('Error fetching about data:', error)
    } finally {
      setIsLoadingP(false)
    }
  }
  useEffect(() => {
    fetchAbout()
    fetchProject()
  }, [])

  return (
    <>
      <Banner about={allAbout} isLoading={isLoadingA} />
      <About about={allAbout} isLoading={isLoadingA} />
      <Projects project={allProject} isLoading={isLoadingP} codeLang={allCodeLang} />
      <MobileBar />
    </>
  )
}
