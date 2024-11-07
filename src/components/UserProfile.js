"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

async function editData(body) {
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("email", body.email);
  if (body.imageFile) {
    formData.append("image", body.imageFile);
  }

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${body.userId}`, {
    method: 'PUT',
    body: formData,
  });
}

export default function UserProfile({ user }) {
  const router = useRouter();
  const [userData, setUserData] = useState(user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: user?.name, email: user?.email });
  const [imagePreview, setImagePreview] = useState(user?.image || '/placeholder.png');
  const [imageFile, setImageFile] = useState(null);

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedUser = { userId: userData.id, ...formData, imageFile };
    await editData(updatedUser);
    setUserData({ ...userData, ...updatedUser });
    setIsModalOpen(false); // Cerrar el modal después de guardar
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleLogout = () => {
    document.cookie = 'cookieUser=; Max-Age=0';
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32"></div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-4 text-center">
            <div className="relative w-32 h-32 mx-auto -mt-32 border-4 rounded-full overflow-hidden bg-white">
              <img src={imagePreview} alt="Foto de perfil" className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-2 text-xl font-semibold text-gray-800">{userData?.name}</h2>
            <p className="text-gray-600">{userData?.email}</p>
            <p className="text-gray-600">{userData?.role === 'alumn'?'Alumne':userData?.role === 'teacher'?'Professor':'Superusuari'}</p>
          </div>
          <div className="md:w-2/3 p-4">
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-300"
              >
                Editar Perfil
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Edición */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Editar Perfil</h3>
            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 p-2 border w-full rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 p-2 border w-full rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Foto de Perfil</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 p-2 w-full"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="w-24 h-24 mt-2 rounded-full object-cover" />
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
