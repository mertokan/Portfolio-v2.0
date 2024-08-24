'use client'

import {signupAction} from '@/actions/auth'
import {useFormState} from 'react-dom'

export default function Signup() {
  const [err, formAction] = useFormState(signupAction, undefined)

  return (
    <div>
      <h1>Signup</h1>
      <form action={formAction}>
        <label className='flex flex-col'>
          Name
          <input className='border ' type='text' name='name' />
        </label>
        <label className='flex flex-col'>
          Username
          <input className='border ' type='text' name='username' />
        </label>
        <label className='flex flex-col'>
          Password
          <input className='border ' type='password' name='password' />
        </label>

        <button type='submit'>Signup</button>
      </form>
      {err && <p>{err}</p>}
    </div>
  )
}
