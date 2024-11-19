'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'


export default function LoggedNavBar () {

  const [imageProfile, setImageProfile] = useState(null)


  useEffect(() => {
    async function photoInfo() {
    
      const imageRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`)
      const imageInfo = await imageRes.json()
      setImageProfile(imageInfo.image || null)
    }

    photoInfo()


  }, [])

  return (
    <header className='px-4 lg:px-6 h-20 flex items-center justify-between border-b'>
      <div className='container mx-auto flex flex-row justify-between items-center'>
        <a className='flex items-center justify-center' href='/dashboard'>
          <Image src='/logoN.png' alt='Logo' width={150} height={40} className='h-10 w-auto' />
        </a>
        <nav className='hidden md:flex space-x-8'>
          <a className='text-sm font-medium hover:text-blue-600 decoration-transparent' href='/c'>Classes</a>
          <a className='text-sm font-medium hover:text-blue-600 decoration-transparent' href='/calendar'>Agenda</a>
          <a className='text-sm font-medium hover:text-blue-600 decoration-transparent' href='/attendance'>Assistència</a>
          <a className='text-sm font-medium hover:text-blue-600 decoration-transparent' href='/bloc'>Bloc</a>
        </nav>
        <div className='flex-shrink-0'>
          <a href='/user-page'>
            <button className=' rounded-full flex items-center justify-center'>
              <img
                alt='user icon'
                src={imageProfile || '/placeholder.png'}
                className='w-12 h-12 rounded-full'
              />
            </button>
          </a>
        </div>
      </div>
    </header>
  )
}
