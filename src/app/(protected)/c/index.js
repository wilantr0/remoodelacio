import ClassCard from '../../components/classCard'
import LoggedLayout from '../../layouts/LoggedLayout'
export default function Classes ({ clases, tareas }) {
  console.log(clases)
  console.log(tareas)

  return (
    <div className='flex flex-col h-screen'>
      <LoggedLayout title='Clases' />
      <main className='flex-1 bg-background p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          hola
          {
            clases.map((e) => {
              console.log(e)
              return (
                <ClassCard classItem={e} classId={e.classroom_id} key={e.classroom_id} />
              )
            })
          }
        </div>
      </main>

    </div>
  )
}

async function fetchAllClasses () {
  const res = await fetch(`${process.env.URL_DEPLOY}/api/classes`)
  console.log(process.env.URL_DEPLOY)
  const data = await res.json()
  console.log(data)
  return data
}

async function fetchAllTasks () {
  const res = await fetch(`${process.env.URL_DEPLOY}/api/tasks`)
  console.log(res)
  const data = await res.json()
  return data
}

export async function getServerSideProps () {
  const clases = await fetchAllClasses()
  const tareas = await fetchAllTasks()

  console.log(clases)

  return {
    props: {
      clases,
      tareas
    }
  }
}
