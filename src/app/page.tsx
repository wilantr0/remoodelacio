import ImageComparison from '@/components/CompareImages'
import { Users, Calendar, BarChart3, Building2 } from 'lucide-react'
import './globals.css'
import NavBar from '@/components/NavBar'


export default function NotLoggedPage () {
  return (
    <div className='flex flex-col min-h-screen '>
      <NavBar />
      <main className='flex-1'>
        <section className='w-full h-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-600 to-indigo-600'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <div className='flex flex-col justify-center space-y-4 text-white'>
                <div className='space-y-2'>
                  <h1 className='text-5xl text-indigo-100 font-bold tracking-tighter sm:text-7xl xl:text-8xl/none'>Remoodelació</h1>
                  <span className='block border-2 border-white h-0 w-full my-4' />
                  <h2 className='text-3xl  font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                    Revoluciona la gestió del teu centre educatiu
                  </h2>
                  <p className='max-w-[600px] text-gray-200 md:text-xl'>
                    Optimitza processos, millora la comunicació i pren decisions informades amb la nostra plataforma integral.
                  </p>
                </div>
              </div>
              <div className='select-none flex flex-row justify-center items-center'>
                <ImageComparison
                  alt='a'
                  beforeImage='/claseAntigua.jpg'
                  afterImage='/claseNueva.jpg'
                />
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 flex justify-center items-center bg-white'>
          <div className='container px-4 md:px-6'>
            <h3 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-black'>Característiques principals</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <div className='border border-gray-700 rounded-lg flex flex-col items-center p-6'>
                  <Users className='h-12 w-12 mb-4 text-blue-600' />
                  <h3 className='text-lg font-bold mb-2 text-black'>Gestió d&#39;estudiants</h3>
                  <p className='text-center text-sm text-gray-500 dark:text-gray-400'>Administra fàcilment els registres i dades dels estudiants.</p>
              </div>
              <div className='border border-gray-700 rounded-lg flex flex-col items-center p-6'>
                  <Calendar className='h-12 w-12 mb-4 text-blue-600' />
                  <h3 className='text-lg font-bold mb-2 text-black'>Programació de classes</h3>
                  <p className='text-center text-sm text-gray-500 dark:text-gray-400'>Organitza horaris i aules de manera eficient.</p>
              </div>
              <div className='border border-gray-700 rounded-lg flex flex-col items-center p-6'>
                  <BarChart3 className='h-12 w-12 mb-4 text-blue-600' />
                  <h3 className='text-lg font-bold mb-2 text-black'>Informes i anàlisi</h3>
                  <p className='text-center text-sm text-gray-500 dark:text-gray-400'>Genera informes detallats per prendre decisions informades.</p>
              </div>
              <div className='border border-gray-700 rounded-lg flex flex-col items-center p-6'>
                  <Building2 className='h-12 w-12 mb-4 text-blue-600' />
                  <h3 className='text-lg font-bold mb-2 text-black'>Gestió de recursos</h3>
                  <p className='text-center text-sm text-gray-500 dark:text-gray-400'>Controla eficaçment els recursos del centre educatiu.</p>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center items-center'>
          <div className='container px-4 md:px-6'>
            <h3 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center text-black mb-12'>El que diuen els nostres clients</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <div className='border border-gray-700 rounded-lg flex flex-col items-start justify-between p-6'>
                  <p className='text-sm text-black dark:text-black mb-4 '>
                    Aquesta plataforma ha transformat completament la manera en què gestionem el nostre centre. És intuïtiva i molt completa.
                  </p>
                  <section>
                    <p className='font-semibold text-black '>Maria González</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Directora, Col·legi Sant Joan</p>
                  </section>
              </div>
              <div className='border border-gray-700 rounded-lg flex flex-col items-start justify-between p-6'>
                  <p className='text-sm text-black dark:text-black mb-4 '>
                    Hem millorat significativament la nostra eficiència administrativa. El suport al client és excepcional.
                  </p>
                  <section>
                    <p className='font-semibold text-black '>Carles Rodríguez</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Administrador, Institut Tecnològic</p>
                  </section>
              </div>
              <div className='border border-gray-700 rounded-lg flex flex-col items-start justify-between p-6'>
                  <p className='text-sm text-black dark:text-black mb-4 '>
                    La facilitat per generar informes i analitzar dades ens ha permès prendre millors decisions per al nostre centre.
                  </p>
                  <section>
                    <p className='font-semibold text-black '>Anna Martínez</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Coordinadora Acadèmica, Escola Primària</p>
                  </section>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-blue-600 flex justify-center items-center'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center text-white'>
              <div className='space-y-2'>
                <h3 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Comença a optimitzar el teu centre avui</h3>
                <p className='mx-auto max-w-[600px] text-gray-200 md:text-xl'>
                  Uneix-te als centenars de centres educatius que ja han millorat la seva gestió amb la nostra plataforma.
                </p>
              </div>
              <div className='space-x-4'>
                <button className='p-2 rounded-md bg-white text-blue-600 hover:bg-gray-100'>Comença ara</button>
                <button className='p-2 rounded-md text-white border-white bg-blue-600 hover:bg-white/10'>Contactar vendes</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
