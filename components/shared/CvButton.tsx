import React, {useEffect, useState} from 'react'
import {getCv} from '@/app/utils/getCv'
interface CvButtonProps {
  handleDownload: () => void
  selectedLanguage: string
  handleLanguageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function CvButton() {
  const [cvData, setCvData] = useState<any[]>([])
  const [selectedCv, setSelectedCv] = useState<any>(cvData[0])
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')
  useEffect(() => {
    async function fetchCv() {
      const allCvs = await getCv()
      setCvData(allCvs)
    }
    fetchCv()
  }, [])

  useEffect(() => {
    if (cvData.length > 0) {
      const cv = cvData.find((cv) => cv.language === selectedLanguage)
      setSelectedCv(cv)
    }
  }, [selectedLanguage, cvData])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = `/api/downloadCv?id=${selectedCv.id}&language=${selectedLanguage}`
    link.download = `${selectedLanguage.toUpperCase()}-Mert-Okan.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value)
  }

  return (
    <div className='bg-state-yellow inline-flex items-center justify-center font-medium rounded-xl overflow-hidden max-w-64 group hover:shadow-lg hover:shadow-state-yellow/30 transition text-black'>
      <button className='flex-1  px-4 py-2 ' onClick={handleDownload}>
        <span>Download CV</span>
      </button>
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className='bg-transparent py-2 focus-visible:outline-none transition'
      >
        <option className='text-black bg-state-yellow/80 hover:bg-state-yellow/40 ' value='en'>
          EN
        </option>
        <option className='text-black bg-state-yellow/80 hover:bg-state-red' value='tr'>
          TR
        </option>
      </select>
    </div>
  )
}
