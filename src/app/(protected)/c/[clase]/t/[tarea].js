import BreadCrumb from '../../../../components/BreadCrumb.js'
import ClassLayout from '../../../../layouts/ClassLayout.js'
import { useRouter } from 'next/router'

export default function Tarea () {
  const router = useRouter()

  const query = router.query

  console.log(query)

  return (
    <ClassLayout title='q'>
      <h1>Tarea</h1>
      <BreadCrumb classItem={query.clase} task={query.tarea} />
    </ClassLayout>
  )
}
