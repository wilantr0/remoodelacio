import { useEffect } from 'react'

export default function ClassCard ({ classroomId }) {
  useEffect(() => {
    async function fetchData (e) {
      const classInfo = await fetch(`${process.env.URL_DEPLOY}/api/classes/${e}`)
      console.log(classInfo)
      return classInfo
    }

    console.log(fetchData(classroomId))
  }, [classroomId])

  return (
    <a
      key={classItem.classroom_id}
      href={`/c/${classId}`}
      class='rounded-lg border bg-card text-black decoration-transparent text-card-foreground shadow-lg'
      data-v0-t='card'
    >

      <div class='p-6'>
        <div class='flex items-center justify-between'>
          <h3 class='text-lg font-bold'>{classItem.name}</h3>
        </div>
        <p class='text-muted-foreground'>{teacherData.first_name} {teacherData.last_name}</p>
      </div>
      <div class='flex items-center p-6'>
        <button class='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full'>
          View Class
        </button>
      </div>
    </a>
  )
}
