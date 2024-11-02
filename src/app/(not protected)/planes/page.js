'use client'
import { useState } from 'react'
import PlansCard from '@/components/PlansCard.js'
import Head from 'next/head'


export default function Planes () {
  const [month, setMonth] = useState(true)
  return (

      <div className='flex flex-col justify-center gap-3'>
        <Head>
          <title>Plans</title>
        </Head>
        <h1 className='text-center p-4 mb-2 text-5xl'>Plans</h1>

        <div className='flex flex-row justify-center mb-2'>
          <button className={`px-6 py-2 ${month?'bg-blue-600':'bg-blue-400'} rounded-l-md text-white`} onClick={() => setMonth(true)}>Mes</button>
          <button className={`px-6 py-2 ${month?'bg-blue-400':'bg-blue-600'} rounded-r-md text-white`} onClick={() => setMonth(false)}>Any</button>
        </div>

        <div className='flex flex-row justify-center gap-3'>
          <PlansCard
            planName='Basico'
            priceM={7.99}
            priceA={69.99}
            services={['1 director', '15 professors', '180 alumnes']}
            time={month}
          />
          <PlansCard
            planName='Avanzado'
            priceM={14.99}
            priceA={159.99}
            services={['1 director', '30 professors', '400 alumnes']}
            time={month}
          />
          <PlansCard
          planName='Premium'
          priceM={29.99}
          priceA={330}
          services={['2 director', '80 professors', '1000 alumnes']}
          time={month}
        />
        </div>
      </div>
  )
}
