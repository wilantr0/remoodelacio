"use client"; // Marcamos el componente como Client Component

import LogIn from '@/components/log/LoginPage'
import { Montserrat } from 'next/font/google'
import estilos from '../../components/log/style'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation' // Para manejar parámetros en la URL

export const montserrat = Montserrat({ subsets: ['latin'] })

export default function Login() {
  const [login, setLogin] = useState(null)
  const searchParams = useSearchParams(); // Obtenemos los parámetros de la URL
  const path = searchParams.get('st') // Obtenemos el valor de 'st'

  useEffect(() => {
    function fetchUrl(path){
      if (path === 'tr') {
        setLogin('')
      } else if (path === 'fl') {
        setLogin('right-panel-active')
      } else {
        setLogin('')
      }
    }

    fetchUrl(path)
    
  }, [path])

  console.log(login)

  return (
    <div className='m-0 p-0 box-border bg-[#f1f0f1] flex justify-center items-center flex-col h-screen -mt-5 mx-0 mb-12'>
      <style>{estilos}</style>
      <LogIn page={login} />
    </div>
  )
}
