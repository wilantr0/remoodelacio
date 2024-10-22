import CreateClass from "@components/CreateClass"
import { cookies } from "next/headers";

export default async function Classes () {
  const token = await cookies().get('userCookie')?.value
  console.log(token)
  // Hacemos fetch de los datos en el servidor
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clases`,
    { method: 'GET',
      headers:{
        'Authorization': `Bearer ${token}`

  }});

  console.log(res)

  // Asegúrate de manejar errores o una respuesta vacía
  if (!res.ok) {
    console.error("Error fetching classes");
    return <div>Error al cargar las clases</div>;
  }

  const clases = await res.json(); // Procesa la respuesta a JSON
  //console.log(clases)


  return (
    <div className='flex flex-col h-screen'>
      <main className='flex-1 bg-background p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {clases.length ? (
            clases.map((e) => {
              return(
                <a
                  key={e.classroom_id}
                  href={`/c/${e.classroom_id}`}
                  className='rounded-lg border bg-card text-black decoration-transparent text-card-foreground shadow-lg'
                  data-v0-t='card'
                >
                  <div className='p-6'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-lg font-bold'>{e.name}</h3>
                    </div>
                  </div>
                  <div className='flex items-center p-6'>
                    <button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full'>
                      View Class
                    </button>
                  </div>
                </a>
              )
          })
          ) : (
            <div className='w-screen flex flex-col justify-center items-center gap-2'>
              <h1>Aun no hay clases</h1>
              <CreateClass /> {/* Renderiza el componente de cliente aquí */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
