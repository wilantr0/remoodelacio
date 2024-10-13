'use client'
import Image from 'next/image'


export default function LoggedNavBar () {
  return (
    <header className='px-4 lg:px-6 h-20 flex items-center justify-between border-b'>
      <div className='container mx-auto flex flex-row justify-between items-center'>
        <a className='flex items-center justify-center' href='#'>
          <Image src='/logoN.png' alt='Logo' width={150} height={40} className='h-10 w-auto' />
        </a>
        <nav className='hidden md:flex space-x-8'>
          <a className='text-sm font-medium hover:text-blue-600 decoration-transparent' href='/c'>Clases</a>
          <a className='text-sm font-medium hover:text-blue-600 decoration-transparent' href='/calendar'>Agenda</a>
          <a className='text-sm font-medium hover:text-blue-600 decoration-transparent' href='/assistance'>Asistencia</a>
          <a className='text-sm font-medium hover:text-blue-600 decoration-transparent' href='/bloc'>Bloc</a>
        </nav>
        <div className='flex-shrink-0'>
          <a href='/login'>
            <button className='p-2 border-2 border-black rounded-full flex items-center justify-center'>
              <img
                alt='user icon'
                src='/user-iconn.png'
                className='w-6 h-6'
              />
            </button>
          </a>
        </div>
      </div>
    </header>
  )
}
