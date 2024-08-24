'use client'
import {cvAction} from '@/actions/cvAction'
import { useState } from 'react'
import {useFormState} from 'react-dom'

export default function Cv() {
  const [err, formAction] = useFormState(cvAction, undefined)
  
  const [language, setLanguage] = useState('en')

  return (
    <div>
      <form action={formAction}>
        <input type='file' name='file' />
        <select
          id='language'
          name='language'
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none disabled:opacity-50'
        >
          <option value='en'>en</option>
          <option value='tr'>tr</option>
        </select>
        <button type='submit'>Upload CV</button>
      </form>
    </div>
  )
}
