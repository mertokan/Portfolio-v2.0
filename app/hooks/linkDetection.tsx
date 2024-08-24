import {useEffect, useState} from 'react'

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          },
          {threshold: 0.6}
        )
        observer.observe(section)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sectionIds])

  return activeSection
}
