'use client'

import {
  createCodeLang,
  createProject,
  deleteCodeLang,
  getAllCodeLang,
  getAllProject,
  deleteProjectAction,
} from '@/actions/projectAction'
import {Button} from '@/components/ui/button'
import {Toaster} from '@/components/ui/sonner'
import {useEffect, useState} from 'react'
import {useFormState} from 'react-dom'
import {toast} from 'sonner'
import {Checkbox} from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import InputS from '@/components/shared/InputS'
import ProjectCardsD from '@/components/shared/ProjectCardsD'
import {UploadButton} from '@/app/utils/uploadthing'
export default function Project() {
  const [createProjectErr, createFormProject] = useFormState<any>(createProject, undefined)
  const [createLangErr, createFormCodeLang] = useFormState<any>(createCodeLang, undefined)
  const [codeLang, setCodeLang] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [image, setImage] = useState<string>('')
  const [getAllProjects, setAllProjects] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [codeLangInput, setCodeLangInput] = useState('')

  async function fetchCodeLang() {
    setIsLoading(true)
    try {
      const codeLang = await getAllCodeLang()
      setCodeLang(codeLang)
    } catch (error) {
      console.error('Error fetching code languages:', error)
    } finally {
      setIsLoading(false)
    }
  }
  async function fetchProjects() {
    setIsLoading(true)
    try {
      const project = await getAllProject()
      setAllProjects(project)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setIsLoading(false)
    }
  }
  async function fetchAll() {
    setIsLoading(true)
    try {
      const codeLang = await getAllCodeLang()
      const project = await getAllProject()
      setAllProjects(project)
      setCodeLang(codeLang)
    } catch (error) {
      console.error('Error fetching all data:', error)
    } finally {
      setIsLoading(false)
      toast.info('Edit project placement before adding new project')
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const handleCodeLangCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const inputTitle = formData.get('title')
  

    try {
      if (!formData.get('title')) {
        return toast.error('Please enter all fields')
      }
      await createCodeLang(formData)
      setCodeLangInput('')
      toast.success('Language created successfully!')
      fetchCodeLang()
    } catch (error) {
      console.error('Error creating code language:', error)
      toast.error('Error creating code language')
    }
  }

  const handleDeleteCodeLang = async (id: number) => {
    const formData = new FormData()
    const confirmDelete = window.confirm('Are you sure you want to delete this item?')
    if (confirmDelete) {
      formData.append('id', id.toString())
      try {
        await deleteCodeLang(formData)
      } catch (error) {
        console.error('Error during delete:', error)
      }
      setCodeLang((prevAllCodeLang) => prevAllCodeLang.filter((item) => item.id !== id))
    }
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    if (image) {
      formData.append('image', image)

    }
    const promise = createProject(formData)

    toast.promise(promise, {
      loading: 'Loading...',
      success: 'Project created successfully!',
      error: 'Check your placement!',
    })
    try {
      await promise
      // await createProject(formData)
      setOpen(false)
      fetchProjects()
      setImage('')
      // toast.success('Project created successfully!')
    } catch (error) {
      console.log('Error creating project:', error)
    }
  }

  const handleDeleteProject = async (id: number) => {
    const formData = new FormData()
    const confirmDelete = window.confirm('Are you sure you want to delete this item?')
    if (confirmDelete) {
      formData.append('id', id.toString())
      try {
        await deleteProjectAction(formData)
        fetchProjects()
        toast.success('Project deleted successfully!')
      } catch (error) {
        console.error('Error during delete:', error)
      }
      setCodeLang((prevAllProject) => prevAllProject.filter((item) => item.id !== id))
    }
  }

  useEffect(() => {
    if (image) {
   
    }
  }, [image])
  return (
    <div className='flex gap-10'>
      <div className='flex flex-col flex-[60%]'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant='outline'>Add Project</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
              <DialogDescription>
                Add Project to your portfolio. You can add your project's details.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => handleAddProject(e)}>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='title' className='text-right'>
                    Title
                  </Label>
                  <Input
                    id='title'
                    placeholder='Portfolio-v2.0'
                    name='title'
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='githubLink' className='text-right'>
                    Github Link
                  </Label>
                  <Input
                    id='githubLink'
                    name='githubLink'
                    placeholder='https://github.com/mertokan/Portfolio-v2.0'
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='liveLink' className='text-right'>
                    Live Link
                  </Label>
                  <Input
                    id='liveLink'
                    name='liveLink'
                    placeholder='https://mertokan.vercel.app/'
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='username' className='text-right'>
                    Code Languages
                  </Label>
                  <div>
                    {codeLang
                      .sort((a, b) => a.title.localeCompare(b.title))
                      .map((lang) => (
                        <div className='flex' key={lang.id}>
                          <Checkbox id={lang.id} name='codeLang' value={lang.id.toString()} />
                          <Label htmlFor={lang.id.toString()} className='select-none'>
                            {lang.title}
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='description' className='text-right'>
                    Description
                  </Label>
                  <Textarea
                    id='description'
                    name='description'
                    placeholder='Description of the project'
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4 text-white'>
                  <Label htmlFor='image' className='text-right'>
                    Project Image
                  </Label>
                  <UploadButton
                    appearance={{
                      button:
                        'ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400',
                      container: 'w-max flex-row rounded-md border-cyan-300 bg-slate-800',
                      allowedContent:
                        'flex h-8 flex-col items-center justify-center px-2 text-white',
                    }}
                    endpoint='imageUploader'
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      // console.log('Files: ', res)
                      setImage(res[0].url)
                      toast.success('Image uploaded successfully')
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      toast.error('Error uploading image')
                    }}
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='placement' className='text-right'>
                    Placement
                  </Label>
                  <Input type='number' id='placement' name='placement' className='col-span-3' />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='iDev' className='text-right'>
                    In Development
                  </Label>
                  <Input type='checkbox' id='iDev' name='iDev' className='col-span-3' />
                </div>
              </div>
              <DialogFooter>
                <Button type='submit'>Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {
          <div className=' flex flex-col gap-5'>
            {getAllProjects.map((project) => {
              return (
                <ProjectCardsD
                  key={project.id}
                  project={project}
                  onClick={() => handleDeleteProject(project.id)}
                  codeLang={codeLang}
                />
              )
            })}
          </div>
        }
      </div>
      <div className='flex-auto flex flex-col gap-5'>
        <div>
          <form onSubmit={handleCodeLangCreate} className='grid grid-cols-2 gap-4'>
            <InputS
              id='title'
              placeholder='Title'
              label='Title'
              value={codeLangInput}
              onChange={(e) => setCodeLangInput(e.target.value)}
            />
            <Button variant={'outline'} type='submit' className='h-full'>
              Save
            </Button>
          </form>
        </div>
        <div className='flex flex-col gap-2'>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            codeLang
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((lang) => (
                <div key={lang.id} className='flex gap-5 items-center'>
                  <p className='text-xl'>{lang.title}</p>
                  <Button
                    onClick={() => handleDeleteCodeLang(lang.id)}
                    size={'sm'}
                    variant={'destructive'}
                  >
                    Delete
                  </Button>
                </div>
              ))
          )}
        </div>
        <Toaster richColors />
      </div>
    </div>
  )
}
