

export default async function Tarea () {
  const classRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clases/3`, {credentials: 'include',method: 'GET' });
  const query = await classRes.json()
  console.log(query)

  return (
    <section>
      <h1>Tarea</h1>
    </section>
  )
}
