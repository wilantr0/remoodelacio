import Link from 'next/link'; // Importar Link de Next.js para la navegación

export default function ClassCard ({ classroom, className='' }) {
  return (
    <Link href={`/c/${classroom.classroom_id}`} className='decoration-transparent'>
      <div className={`w-full max-w-sm rounded-lg shadow-md overflow-hidden ${className}`}>
        <div className={`h-24 relative`}>
          <img
            src='/banner.jpg'
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div>
            <h2 className="text-xl font-bold mb-1 text-gray-800">{classroom.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{classroom.description}</p>
          </div>
          <div className="flex items-center">
            <img
              src={classroom.created_by.image}
              alt={`${classroom.created_by.name}'s avatar`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="text-sm text-gray-700">{classroom.created_by.name}</span>
          </div>
        </div>
      </div>
  </Link>
  )
}


