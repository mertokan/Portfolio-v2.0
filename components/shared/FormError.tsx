import React from 'react'
import {FaTriangleExclamation} from 'react-icons/fa6'

interface FormErrorProps {
  message?: string
}

export const FormError = ({message}: FormErrorProps) => {
  if (!message) return null

  return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
      <FaTriangleExclamation className='size-4' />
      <p>{message}</p>
    </div>
  )
}
