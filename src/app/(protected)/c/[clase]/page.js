'use client'
import { useEffect, useState } from 'next/navigation'

export default function Clase ({params}) {

  const [assignaments, setAssignaments] = useState([]);


  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clases/${params.clase}`);
        if (!res.ok) throw new Error('Failed to load classes');

        const data = await res.json();
        setAssignaments(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchClasses();
  }, [params.clase]);

  console.log(assignaments)

  return (
      <h1>hola</h1>
  )
}
