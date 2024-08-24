'use server'

import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'

export async function signupAction(currentState: any, formData: FormData): Promise<string> {
  //Get data off form
  const name = formData.get('name')
  const username = formData.get('username')
  const password = formData.get('password')

  //Send to our api route

  const res = await fetch(process.env.API_URL + '/api/signup', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name, username, password}),
  })
  const json = await res.json()

  //Redirect to login page

  if (res.ok) {
    //redirect to login page
    redirect('/dashboard/login')
  } else {
    //show error message
    return json.error
  }
}

export async function loginAction(currentState: any, formData: FormData): Promise<string> {
  //Get data off form
  const username = formData.get('username')
  const password = formData.get('password')

  //Send to our api route

  const res = await fetch(process.env.API_URL + '/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password}),
  })
  const json = await res.json()

  cookies().set('accessToken', json.token, {
    secure: false,
    sameSite: 'strict',
    expires: Date.now() + 3600 * 1000, //1 hour
    path: '/',
  })

  //Redirect to login page
  if (res.ok) {
    //redirect to login page
    redirect('/dashboard/protected')
  } else {
    //show error message
    return json.error
  }
}
