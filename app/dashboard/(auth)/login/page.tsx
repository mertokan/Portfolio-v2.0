'use client'

import {loginAction} from '@/actions/auth'
import {useFormState} from 'react-dom'

export default function Login() {
  const [err, formAction] = useFormState(loginAction, undefined)

  return (
    <div>
      <h1>Login</h1>
      <form action={formAction}>
        <label className='flex flex-col'>
          Username
          <input className='border ' type='text' name='username' />
        </label>
        <label className='flex flex-col'>
          Password
          <input className='border ' type='password' name='password' />
        </label>

        <button type='submit'>Login</button>
      </form>
      {err && <p>{err}</p>}
    </div>
  )
}
