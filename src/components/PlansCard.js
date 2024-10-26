'use client'
import { useState, useEffect } from "react"
export default function PlansCard ({ planName, priceM, priceA, services, time }) {
  const [month, setMonth] = useState(true)

  useEffect(() => {
    setMonth(time)
  }, [time])
  

  return (
    <div class='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8'>
      <h5 class='mb-4 text-xl font-medium text-black'>
        {planName}
      </h5>
      {month?
        <div class='flex items-baseline text-gray-900 '>
        <span class='text-3xl font-semibold'>€</span>
        <span class='text-5xl font-extrabold tracking-tight'>{priceM}</span>
        <span class='ms-1 text-xl font-normal text-gray-500 '>
          /mes
        </span>
      </div>
      :
      <div class='flex items-baseline text-gray-900 '>
        <span class='text-3xl font-semibold'>€</span>
        <span class='text-5xl font-extrabold tracking-tight'>{priceA}</span>
        <span class='ms-1 text-xl font-normal text-gray-500 '>
          /año
        </span>
      </div>
      }
      <ul role='list' class='space-y-5 my-7'>

        {services.map( e=> {
          return(
            <li key={e} class='flex items-center'>
              <svg
                class='flex-shrink-0 w-4 h-4 text-blue-700 -500'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
              </svg>
              <span class='text-base font-normal leading-tight text-gray-700 ms-3'>
                {e}
              </span>
            </li>
          )
        })}
      </ul>
      <button
        type='button'
        class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center'
      >
        Escoger este plan
      </button>
    </div>
  )
}
