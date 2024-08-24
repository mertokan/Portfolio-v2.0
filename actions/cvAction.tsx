'use server'

import {redirect} from 'next/navigation'

export async function cvAction(currentState: any, formData: FormData): Promise<string> {
  // Get data off form
  const cv: File | null = formData.get('file') as File | null

  // Check if file is provided
  if (!cv) {
    return 'No file provided'
  }

  const arrayBuffer = await cv.arrayBuffer()
  const cvData = Buffer.from(arrayBuffer).toString('base64')

  const language = formData.get('language')

  // Send to our api route
  try {
    const res = await fetch(process.env.API_URL + '/api/cv', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({cvData, language}),
    })

    const json = await res.json()

    if (res.ok) {
      // Redirect to dashboard
      redirect('/dashboard')
    } else {
      // Show error message
      return json.error
    }
  } catch (error) {
    console.error('Error during fetch:', error)
    return 'An error occurred while uploading the file'
  }
}
