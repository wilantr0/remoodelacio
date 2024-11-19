import Access from '@lib/middlewareAccess'
import { redirect } from 'next/navigation';
import { Calendar, CheckCircle, Notebook } from 'lucide-react'


export default async function LoggedPage () {

  const decoded = Access()

  if(decoded){
    
  

  
  return (
      <div className='flex flex-col min-h-screen'>
        <main className='flex-1'>
          <section className='w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-indigo-600'>
            <div className='container px-4 md:px-6'>
              <div className='flex flex-col items-center text-center space-y-6'>
                <h1 className='text-5xl text-white font-bold tracking-tighter sm:text-6xl'>
                  Benvingut a Remoodelació
                </h1>
              </div>
            </div>
          </section>

          <section className='w-full py-12 md:py-24 lg:py-32'>
            <div className='container px-4 md:px-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
                <a href='/c' className='p-4 border-[1.5px] border-neutral-800 rounded-md shadow-inner decoration-transparent text-black flex flex-col items-center justify-center'>
                  <Notebook className='h-12 w-12 mb-4 text-blue-600' />
                  <h3 className='text-lg font-bold mb-2'>Classes</h3>
                  <p className='text-sm text-neutral-600 text-center'>Accedeix a classes</p>
                </a>
                <a href='/calendar' className='p-4 border-[1.5px] border-neutral-800 rounded-md shadow-inner decoration-transparent text-black flex flex-col items-center justify-center'>
                  <Calendar className='h-12 w-12 mb-4 text-blue-600' />
                  <h3 className='text-lg font-bold mb-2'>Calendari</h3>
                  <p className='text-sm text-neutral-600 text-center'>Afegeix i visualitza recordatoris d&#39;exàmenes i tasques</p>
                </a>
                <a href='/assistance' className='p-4 border-[1.5px] border-neutral-800 rounded-md shadow-inner decoration-transparent text-black flex flex-col items-center justify-center'>
                  <CheckCircle className='h-12 w-12 mb-4 text-blue-600' />
                  <h3 className='text-lg font-bold mb-2'>Asistència</h3>
                  <p className='text-sm text-neutral-600 text-center'>Controla l&#39;asistència a les teves classes</p>
                </a>
                <a href='/bloc' className='p-4 border-[1.5px] border-neutral-800 rounded-md shadow-inner decoration-transparent text-black flex flex-col items-center justify-center'>
                  <Notebook className='h-12 w-12 mb-4 text-blue-600' />
                  <h3 className='text-lg font-bold mb-2'>Bloc</h3>
                  <p className='text-sm text-neutral-600 text-center'>Tingues un registre de les teves notes</p>
                </a>
              </div>
            </div>
          </section>
        </main>
        <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
          <p className='text-xs text-gray-500 dark:text-gray-400'>©2024 Remoodelació. Tots els drets reservats.</p>
          <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
            <a className='text-xs hover:underline underline-offset-4' href='#'>Termes de servei</a>
            <a className='text-xs hover:underline underline-offset-4' href='#'>Privacitat</a>
          </nav>
        </footer>
      </div>
  )
} else{
  redirect('login')
}
  
}