'use server'

export async function getAllAbout(): Promise<any[]> {
  // Get all about entries
  const res = await fetch(process.env.API_URL + '/api/about')
  const about = await res.json()
  return about
}

export async function aboutAction(currentState: any, formData: FormData): Promise<string> {
  // Get data off form
  const smallTitle = formData.get('smallTitle')
  const position = formData.get('position')
  const description = formData.get('description')

  // Send to our api route
  try {
    const res = await fetch(process.env.API_URL + '/api/about', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({smallTitle, position, description}),
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
export async function updateAction(formData: FormData): Promise<string> {
  const id = formData.get('id')
  const smallTitle = formData.get('smallTitle')
  const position = formData.get('position')
  const description = formData.get('description')


  const apiUrl = `${process.env.API_URL}/api/about?id=${id}`
  // console.log('API URL:', apiUrl)

  // Send to our API route
  try {
    const res = await fetch(apiUrl, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({smallTitle, position, description}),
    })

    const text = await res.text()
   

    if (res.ok) {
      // Successfully updated
      return 'Success'
    } else {
      // Show error message
      return text
    }
  } catch (error) {
    console.error('Error during fetch:', error)
    return 'An error occurred while updating the entry'
  }
}

export async function deleteAction(formData: FormData): Promise<string> {
  const id = formData.get('id')
  const apiUrl = `${process.env.API_URL}/api/about?id=${id}`
  // Send to our API route
  try {
    const res = await fetch(apiUrl, {
      method: 'DELETE',
    })

    if (res.ok) {
      // Redirect to dashboard
      return 'Success'
    } else {
      const json = await res.json()
      // Show error message
      return json.error
    }
  } catch (error) {
    console.error('Error during fetch:', error)
    return 'An error occurred while deleting the entry'
  }
}
