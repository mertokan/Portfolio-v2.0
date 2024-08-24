// import Footer from '@/components/shared/Footer'
// import Header from '@/components/shared/Header'
'use client'
import {cookies} from 'next/headers'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'
import {getCookie} from '../utils/getCookie'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()

  useEffect(() => {
    async function checkLoginStatus() {
      const isLogged = await getCookie()
     
      if (!isLogged) {
        router.push('/dashboard/login')
      }
    }

    checkLoginStatus()
  }, [])

  return (
    <div className='flex h-screen flex-col'>
      {/* <Header /> */}
      <main className='flex-1'>{children}</main>
      {/* <Footer /> */}
    </div>
  )
}
