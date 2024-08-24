'use client'
import {aboutAction, deleteAction, getAllAbout, updateAction} from '@/actions/aboutAction'
import {Button} from '@/components/ui/button'
import {Toaster} from '@/components/ui/sonner'
import {useEffect, useRef, useState} from 'react'
import {useFormState} from 'react-dom'
import {toast} from 'sonner'

export default function About() {
  const [createErr, createFormAction] = useFormState(aboutAction, undefined)
  const [updateErr, updateFormAction] = useFormState<any>(updateAction, undefined)
  const [deleteErr, deleteFormAction] = useFormState<any>(deleteAction, undefined)
  const [allAbout, setAllAbout] = useState<any[]>([])
  const [isEditing, setIsEditing] = useState<any>({})
  const [isChanged, setIsChanged] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  async function fetchAbout() {
    const about = await getAllAbout()
    setAllAbout(about)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAbout()
  }, [])

  const smallTitleRef = useRef<HTMLInputElement>(null)
  const positionRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing.smallTitle) smallTitleRef.current?.focus()
    if (isEditing.position) positionRef.current?.focus()
    if (isEditing.description) descriptionRef.current?.focus()
  }, [isEditing])

  const handleInputChange = (id: number, field: string, value: string) => {
    setAllAbout((prevAllAbout) =>
      prevAllAbout.map((item) => (item.id === id ? {...item, [field]: value} : item))
    )
    setIsChanged(true)
  }

  const handleEditClick = (id: number, field: string) => {
    setIsEditing({...isEditing, [`${id}-${field}`]: true})
  }

  const handleCreateAbout = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    if (createErr) {
      toast.error(createErr)
    } else {
      setIsLoading(true)
      const res = await createFormAction(formData)
    }

    fetchAbout()
  }

  const handleUpdateSubmit = async (e: React.FormEvent, id: number) => {
    e.preventDefault()
    if (isChanged) {
      const formData = new FormData()
      const updatedItem = allAbout.find((item) => item.id === id)
      if (updatedItem) {
        formData.append('id', id.toString())
        formData.append('smallTitle', updatedItem.smallTitle)
        formData.append('position', updatedItem.position)
        formData.append('description', updatedItem.description)
      }
      await updateAction(formData)
      setIsChanged(false)
    }
  }

  const handleDelete = async (id: number) => {
    const formData = new FormData()
    const confirmDelete = window.confirm('Are you sure you want to delete this item?')
    if (confirmDelete) {
      formData.append('id', id.toString())
      try {
        await deleteAction(formData)
      } catch (error) {
        console.error('Error during delete:', error)
      }
      setAllAbout((prevAllAbout) => prevAllAbout.filter((item) => item.id !== id))
    }
  }

  {
    if (isLoading) {
      return <div>Loading...</div>
    } else {
      if (allAbout.length === 0) {
        return (
          <div>
            <form
              onSubmit={(e) => handleCreateAbout(e)}
              //  action={createFormAction}
            >
              <label htmlFor='smallTitle' className='flex flex-col'>
                <span>Small Title</span>
                <input className='text-black' type='text' name='smallTitle' id='smallTitle' />
              </label>
              <label htmlFor='position' className='flex flex-col'>
                <span>Position</span>
                <input className='text-black' type='text' name='position' id='position' />
              </label>
              <label htmlFor='description' className='flex flex-col'>
                <span>Description</span>
                <textarea className='text-black' name='description' id='description' />
              </label>
              <button
                type='submit'
                className='mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Load About
              </button>
            </form>

            <Toaster richColors />
          </div>
        )
      } else if (allAbout.length === 1) {
        return (
          <>
            {allAbout.map((about) => (
              <form
                key={about.id.toString()}
                onSubmit={(e) => handleUpdateSubmit(e, about.id)}
                className='flex flex-col container mx-auto mt-32 bg-site-darkcolor1 p-8 rounded-lg gap-4'
              >
                <div>
                  <label className='text-2xl font-bold'>Small Title</label>
                  {isEditing[`${about.id}-smallTitle`] ? (
                    <input
                      type='text'
                      ref={smallTitleRef}
                      autoFocus
                      value={about.smallTitle}
                      onChange={(e) => handleInputChange(about.id, 'smallTitle', e.target.value)}
                      onBlur={() => setIsEditing({...isEditing, [`${about.id}-smallTitle`]: false})}
                      required
                      id='smallTitle'
                      className='text-black w-full'
                    />
                  ) : (
                    <h2 className='' onClick={() => handleEditClick(about.id, 'smallTitle')}>
                      {about.smallTitle}
                    </h2>
                  )}
                </div>

                <div>
                  <label className='text-2xl font-bold'>Position</label>
                  {isEditing[`${about.id}-position`] ? (
                    <input
                      type='text'
                      ref={positionRef}
                      required
                      value={about.position}
                      onChange={(e) => handleInputChange(about.id, 'position', e.target.value)}
                      autoFocus
                      onBlur={() => setIsEditing({...isEditing, [`${about.id}-position`]: false})}
                      id='position'
                      className='text-black w-full'
                    />
                  ) : (
                    <p className='' onClick={() => handleEditClick(about.id, 'position')}>
                      {about.position}
                    </p>
                  )}
                </div>

                <div>
                  <label className='text-2xl font-bold'>Description</label>
                  {isEditing[`${about.id}-description`] ? (
                    <textarea
                      ref={descriptionRef}
                      required
                      value={about.description}
                      autoFocus
                      rows={15}
                      onChange={(e) => handleInputChange(about.id, 'description', e.target.value)}
                      onBlur={() =>
                        setIsEditing({...isEditing, [`${about.id}-description`]: false})
                      }
                      id='description'
                      className='w-full text-black'
                    />
                  ) : (
                    <p onClick={() => handleEditClick(about.id, 'description')}>
                      {about.description}
                    </p>
                  )}
                </div>

                <button
                  type='submit'
                  className={`mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    isChanged ? '' : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!isChanged}
                >
                  Güncelle
                </button>
              </form>
            ))}
          </>
        )
      } else {
        return (
          <div className='flex flex-col gap-5'>
            {allAbout.map((about) => (
              <div
                key={about.id}
                className='flex flex-col container mx-auto  bg-site-darkcolor1 p-8 rounded-lg gap-4'
              >
                <label className='font-bold'>
                  Small Title
                  <p className='font-normal'>{about.smallTitle}</p>
                </label>
                <label className='font-bold'>
                  Position
                  <p className='font-normal'>{about.position}</p>
                </label>
                <label className='font-bold'>
                  Description
                  <p className='font-normal'>{about.description}</p>
                </label>
                <Button variant={'destructive'} onClick={() => handleDelete(about.id)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )
      }
    }
  }
}
