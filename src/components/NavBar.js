'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function NavBar () {
  return (
    <header className='px-4 lg:px-6 h-20 flex items-center justify-between border-b'>
      <div className='container mx-auto flex flex-row justify-between items-center'>
        <a className='flex items-center justify-center' href='#'>
          <Image src='/logoB.png' alt='Logo' width={150} height={40} className='h-10 w-auto' />
        </a>
        <nav className='hidden md:flex space-x-8'>
          <a className='text-sm font-medium hover:text-blue-600 decoration-transparent' href='#'>Home</a>
          <a className='text-sm font-medium hover:text-blue-600 decoration-transparent' href='#'>Servicios</a>
          <a className='text-sm font-medium hover:text-blue-600 decoration-transparent' href='#'>Planes</a>
          <a className='text-sm font-medium hover:text-blue-600 decoration-transparent' href='#'>Sobre Nosotros</a>
        </nav>
        <div className='flex items-center space-x-4'>
          <Link href='/login?st=tr'>
            <Button variant='ghost'>Login</Button>
          </Link>
          <Link href='/login?st=fl'>
            <Button className='bg-blue-600 hover:bg-blue-700 text-white'>Sign-up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
