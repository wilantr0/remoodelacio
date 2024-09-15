import ImageComparison from '@/components/CompareImages'
import NavBar from '@/components/NavBar'
import { Users, Calendar, BarChart3, Building2 } from 'lucide-react'

export default function NotLoggedPage () {
  return (
    <div className='flex flex-col min-h-screen '>
      <NavBar />
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-600 to-indigo-600'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <div className='flex flex-col justify-center space-y-4 text-white'>
                <div className='space-y-2'>
                  <h1 className='text-5xl text-indigo-100 font-bold tracking-tighter sm:text-7xl xl:text-8xl/none'>Remoodelació</h1>
                  <span className='block border-2 border-white h-0 w-full my-4' />
                  <h2 className='text-3xl  font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                    Revoluciona la gestión de tu centro educativo
                  </h2>
                  <p className='max-w-[600px] text-gray-200 md:text-xl'>
                    Optimiza procesos, mejora la comunicación y toma decisiones informadas con nuestra plataforma integral.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <button className='p-2 rounded-md bg-white text-blue-600 hover:bg-gray-100'>Comenzar prueba gratuita</button>
                  <button className='p-2 rounded-md bg-blue-600 text-white border-white hover:bg-white/10'>Ver demostración</button>
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
            <h3 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-black'>Características principales</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <div className='border border-gray-700 rounded-lg flex flex-col items-center p-6'>
                  <Users className='h-12 w-12 mb-4 text-blue-600' />
                  <h3 className='text-lg font-bold mb-2 text-black'>Gestión de estudiantes</h3>
                  <p className='text-center text-sm text-gray-500 dark:text-gray-400'>Administra fácilmente los registros y datos de los estudiantes.</p>
              </div>
              <div className='border border-gray-700 rounded-lg flex flex-col items-center p-6'>
                  <Calendar className='h-12 w-12 mb-4 text-blue-600' />
                  <h3 className='text-lg font-bold mb-2 text-black'>Programación de clases</h3>
                  <p className='text-center text-sm text-gray-500 dark:text-gray-400'>Organiza horarios y aulas de manera eficiente.</p>
              </div>
              <div className='border border-gray-700 rounded-lg flex flex-col items-center p-6'>
                  <BarChart3 className='h-12 w-12 mb-4 text-blue-600' />
                  <h3 className='text-lg font-bold mb-2 text-black'>Informes y análisis</h3>
                  <p className='text-center text-sm text-gray-500 dark:text-gray-400'>Genera informes detallados para tomar decisiones informadas.</p>
              </div>
              <div className='border border-gray-700 rounded-lg flex flex-col items-center p-6'>
                  <Building2 className='h-12 w-12 mb-4 text-blue-600' />
                  <h3 className='text-lg font-bold mb-2 text-black'>Gestión de recursos</h3>
                  <p className='text-center text-sm text-gray-500 dark:text-gray-400'>Controla eficazmente los recursos del centro educativo.</p>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center items-center'>
          <div className='container px-4 md:px-6'>
            <h3 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center text-black mb-12'>Lo que dicen nuestros clientes</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <div className='border border-gray-700 rounded-lg flex flex-col items-start justify-between p-6'>
                  <p className='text-sm text-black dark:text-black mb-4 '>
                    Esta plataforma ha transformado completamente la forma en que gestionamos nuestro centro. Es intuitiva y muy completa.
                  </p>
                  <section>
                    <p className='font-semibold text-black '>María González</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Directora, Colegio San Juan</p>
                  </section>
              </div>
              <div className='border border-gray-700 rounded-lg flex flex-col items-start justify-between p-6'>
                  <p className='text-sm text-black dark:text-black mb-4 '>
                    Hemos mejorado significativamente nuestra eficiencia administrativa. El soporte al cliente es excepcional.
                  </p>
                  <section>
                    <p className='font-semibold text-black '>Carlos Rodríguez</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Administrador, Instituto Tecnológico</p>
                  </section>
              </div>
              <div className='border border-gray-700 rounded-lg flex flex-col items-start justify-between p-6'>
                  <p className='text-sm text-black dark:text-black mb-4 '>
                    La facilidad para generar informes y analizar datos nos ha permitido tomar mejores decisiones para nuestro centro.
                  </p>
                  <section>
                    <p className='font-semibold text-black '>Ana Martínez</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Coordinadora Académica, Escuela Primaria</p>
                  </section>
                  
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-blue-600 flex justify-center items-center'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center text-white'>
              <div className='space-y-2'>
                <h3 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Comienza a optimizar tu centro hoy</h3>
                <p className='mx-auto max-w-[600px] text-gray-200 md:text-xl'>
                  Únete a los cientos de centros educativos que ya han mejorado su gestión con nuestra plataforma.
                </p>
              </div>
              <div className='space-x-4'>
                <button className='p-2 rounded-md bg-white text-blue-600 hover:bg-gray-100'>Comenzar ahora</button>
                <button className='p-2 rounded-md text-white border-white bg-blue-600 hover:bg-white/10'>Contactar ventas</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>©2024 Remoodelació. Todos los derechos reservados.</p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
          <a className='text-xs hover:underline underline-offset-4' href='#'>Términos de servicio</a>
          <a className='text-xs hover:underline underline-offset-4' href='#'>Privacidad</a>
        </nav>
      </footer>
    </div>
  )
}
