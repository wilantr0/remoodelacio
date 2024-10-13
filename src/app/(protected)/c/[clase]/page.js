import ClassLayout from '@layouts/ClassLayout.js'
import { useRouter } from 'next/router'

export default function Clase () {
  const router = useRouter()

  const classId = router.query.clase
  console.log(classId)

  return (
    <ClassLayout title='q' classId={classId}>
      <h1>{router.query.clase}</h1>
    </ClassLayout>
  )
}
