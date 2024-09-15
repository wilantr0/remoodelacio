import 'dotenv/config'
import React, { useState, useEffect } from 'react'

async function fetchUserData (userId) {
  const res = await fetch(`${process.env.SERVER_URL}/api/classes/${userId}`)
  const data = await res.json()
  return data
}

export default function ClassBreadCrumb ({ classItem }) {
  const [teacherData, setTeacherData] = useState(null)

  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData () {
      try {
        const teacherData = await fetchUserData(classItem)
        setTeacherData(teacherData[0])
      } catch (err) {
        setError(err)
      }
    }
    fetchData()
  }, [classItem])

  if (error) return <p>Error: {error.message}</p>
  if (!teacherData) return <p> </p>

  return (
    <nav class='flex flex-row items-center' aria-label='Breadcrumb'>
      <ol class='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
        <li class='inline-flex items-center'>
          <a
            href='..'
            class='inline-flex items-center text-lg font-medium decoration-transparent text-white hover:text-black dark:text-gray-400 dark:hover:text-white'
          >
            <svg
              class='w-3 h-3 me-2.5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
            </svg>
            Home
          </a>
        </li>
        <li>
          <div class='flex items-center'>
            <svg
              class='rtl:rotate-180 w-3 h-3 text-gray-400 mx-1'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 6 10'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m1 9 4-4-4-4'
              />
            </svg>
            <a
              href={'/c/' + teacherData.id}
              class='ms-1 text-sm font-medium decoration-transparent text-white hover:text-black md:ms-2 dark:text-gray-400 dark:hover:text-white'
            >{teacherData.name}
            </a>
          </div>
        </li>
      </ol>
    </nav>
  )
}
