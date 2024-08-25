'use client'
import BigTitle from '@/components/shared/BigTitle'
import ProjectCards from '@/components/shared/ProjectCards'
interface AllProject {
  project?: any
  isLoading?: boolean
  codeLang?: any
}
const Projects = ({project, isLoading, codeLang}: AllProject) => {
  const sortedProjects = project.sort((a: any, b: any) => a.placement - b.placement)
  return (
    <section className='py-24 bg-site-darkcolor2 h-max' id='projects'>
      <BigTitle title='Projects' />
      <div className='container mx-auto grid justify-items-center gap-8'>
        {!isLoading &&
          sortedProjects.map((project: any) => (
            <ProjectCards key={project.id} project={project} codeLang={codeLang} />
          ))}
      </div>
    </section>
  )
}

export default Projects
