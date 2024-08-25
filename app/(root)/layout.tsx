import Sidebar from '@/components/shared/Sidebar'
import Footer from './footer/page'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen flex-col'>
      <Sidebar />
      <main className='flex-1 md:ml-[300px]'>{children}</main>
      <Footer />
    </div>
  )
}
