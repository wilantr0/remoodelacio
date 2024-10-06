import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';


async function getUserData() {
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    redirect('login')
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  // Llama a tu API o base de datos para obtener los datos del usuario
  const userData = await fetch(`https://api.example.com/user/${decoded.userId}`)
    .then(res => res.json());

  return userData;
}

export default async function DashboardPage() {
  const user = await getUserData();

  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      <p>Este es tu dashboard.</p>
    </div>
  );
}
