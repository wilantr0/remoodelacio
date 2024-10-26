'use client'
import { useState } from 'react'
import PlansCard from '../../../components/PlansCard.js'


export default function Planes () {
  const [month, setMonth] = useState(true)
  return (

      <div className='flex flex-col justify-center gap-3'>
        <h1 className='text-center p-4 mb-2 text-5xl'>Planes</h1>

        <div className='flex flex-row justify-center mb-2'>
          <button className={`px-6 py-2 ${month?'bg-blue-600':'bg-blue-400'} rounded-l-md text-white`} onClick={() => setMonth(true)}>Mes</button>
          <button className={`px-6 py-2 ${month?'bg-blue-400':'bg-blue-600'} rounded-r-md text-white`} onClick={() => setMonth(false)}>Año</button>
        </div>

        <div className='flex flex-row justify-center gap-3'>
          <PlansCard
            planName='Basico'
            priceM={7.99}
            priceA={69.99}
            services={['1 director', '15 profesores', '180 alumnos']}
            time={month}
          />
          <PlansCard
            planName='Avanzado'
            priceM={14.99}
            priceA={159.99}
            services={['1 director', '30 profesores', '400 alumnos']}
            time={month}
          />
          <PlansCard
          planName='Premium'
          priceM={29.99}
          priceA={330}
          services={['2 director', '80 profesores', '1000 alumnos']}
          time={month}
        />
        </div>
      </div>
  )
}
