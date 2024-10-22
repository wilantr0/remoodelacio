'use client'

import { useRouter } from 'next/navigation'

export default function Clase () {
  const router = useRouter()

  const classId = router.query.clase 
  console.log(classId)

  return (
      <h1>{router.query.clase}</h1>
  )
}
