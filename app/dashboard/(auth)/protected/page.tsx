import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import React from 'react'

export default function Protected() {
  const isLogged = cookies().get('accessToken')
  return <>{isLogged ? <div className=''>asd</div> : <div>anan</div>}</>
}
