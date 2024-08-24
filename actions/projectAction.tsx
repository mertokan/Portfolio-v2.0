'use server'

const apiUrl = `${process.env.API_URL}/api/codeLang`
export async function getAllCodeLang(): Promise<any[]> {
  // Get all Code Language entries
  const res = await fetch(apiUrl)
  const codeLang = await res.json()
  return codeLang
}

export async function createCodeLang(formData: FormData): Promise<string> {
  // Get data off form

  const title = formData.get('title')

  // Send to our api route
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title}),
    })

    const json = await res.json()

    if (res.ok) {
      return 'Success'
    } else {
      // Show error message
      return json.error
    }
  } catch (error) {
    console.error('Error during fetch:', error)
    return 'An error occurred while uploading the file'
  }
}

export const deleteCodeLang = async (formData: FormData): Promise<string> => {
  const id = formData.get('id')
  const apiUrl = `${process.env.API_URL}/api/codeLang?id=${id}`
  try {
    const res = await fetch(apiUrl, {
      method: 'DELETE',
    })

    const json = await res.json()

    if (res.ok) {
      return 'Success'
    } else {
      // Show error message
      return json.error
    }
  } catch (error) {
    console.error('Error during fetch:', error)
    return 'An error occurred while deleting the file'
  }
}

export async function getAllProject(): Promise<any[]> {
  const apiUrl = `${process.env.API_URL}/api/project`
  // Get all Code Language entries
  const res = await fetch(apiUrl)
  const project = await res.json()
  return project
}

export async function createProject(formData: FormData) {
  const apiUrl = `${process.env.API_URL}/api/project`

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const liveLink = formData.get('liveLink') as string
  const githubLink = formData.get('githubLink') as string
  const codeLangIds = formData.getAll('codeLang') as string[]
  const image = formData.get('image') as string
  const iDev = formData.get('iDev') === 'on' ? true : false
  const placement = parseInt(formData.get('placement') as string, 10)


  // const arrayBuffer = image ? await image.arrayBuffer() : null
  // const imageData = arrayBuffer ? Buffer.from(arrayBuffer).toString('base64') : ''

  // Zorunlu alanların kontrolü
  if (
    !title ||
    !description ||
    codeLangIds.length === 0 ||
    !image ||
    !liveLink ||
    !githubLink ||
    isNaN(placement)
  ) {
    throw new Error('Please enter all fields')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        liveLink,
        githubLink,
        codeLangIds,
        image,
        placement,
        iDev,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create project')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating project:', error)
    throw new Error('An error occurred while creating the project')
  }
}

export async function deleteProjectAction(formData: FormData) {
  const id = formData.get('id')
  const apiUrl = `${process.env.API_URL}/api/project?id=${id}`
  try {
    const res = await fetch(apiUrl, {
      method: 'DELETE',
    })

    const json = await res.json()

    if (res.ok) {
      return 'Success'
    } else {
      // Show error message
      return json.error
    }
  } catch (error) {
    console.error('Error during fetch:', error)
    return 'An error occurred while deleting the file'
  }
}
