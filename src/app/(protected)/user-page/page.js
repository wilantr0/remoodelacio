import { useState, useEffect } from 'react';
import { cookies } from 'next/headers';
import { decodeToken } from '@/lib/password';

const ProfilePage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('cookieUser')?.value;

  decodeToken(token)

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API para obtener la información del usuario
    const fetchUser = async () => {
      const res = await fetch('/api/users/'); // Asegúrate de tener esta API creada
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    // Lógica para cerrar sesión
    await fetch('/api/logout', { method: 'POST' });
    // Redirigir o hacer otra cosa después de cerrar sesión
  };

  const handleUpdate = async () => {
    // Lógica para actualizar la información del usuario
    const updatedInfo = {}; // Aquí obtén la nueva información
    await fetch('/api/user', {
      method: 'PUT',
      body: JSON.stringify(updatedInfo),
      headers: { 'Content-Type': 'application/json' },
    });
    // Actualiza el estado o muestra un mensaje de éxito
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Nombre: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Aquí puedes mostrar más información del usuario */}

      <button onClick={handleUpdate}>Actualizar Información</button>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default ProfilePage;
