'use client'
import { useRouter } from 'next/navigation'

export default function Tarea () {
  const router = useRouter()

  const query = router.query

  console.log(query)

  return (
    <section>
      <h1>Tarea</h1>
    </section>
  )
}
