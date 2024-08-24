// import Footer from '@/components/shared/Footer'
// import Header from '@/components/shared/Header'

import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen flex-col '>
      <Sidebar />
      <main className='flex-1 md:ml-[300px]'>{children}</main>
      {/* <Footer /> */}
    </div>
  )
}
