"use client"
import ClassCard from '@components/classCard'
import CreateClass from "@components/CreateClass"
export default  function Classes () {

  const clases = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clases`)

  return (
    <div className='flex flex-col h-screen'>
      <main className='flex-1 bg-background p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {
            clases.length?
            (clases.map((e) => {
              console.log(e)
              return (
                <ClassCard key={e.classroom_id} />
              )
            })):( 
            <div className='w-screen flex flex-col justify-center items-center gap-2'> 
              <h1>Aun no hay clases</h1>
              <CreateClass /> 
            </div>
            )

          }
        </div>
      </main>

    </div>
  )
}
