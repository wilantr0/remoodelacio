"use client";

import { useEffect, useState } from "react";
import ClassCard from "@components/ClassCard";
import Loading from "@components/Loading";
import CreateClass from "@components/CreateClass";

export default function ClassroomPage() {
  const [classes, setClasses] = useState([]);
  const [classCode, setClassCode] = useState("");
  const [error, setError] = useState(null);
  const [showJoin, setShowJoin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener las clases desde el servidor
  const fetchClasses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clases`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load classes");

      const data = await res.json();
      setClasses(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  // Llamada inicial para cargar las clases
  useEffect(() => {
    fetchClasses();
  }, []);

  // Función para unirse a una clase
  const handleJoinClass = async () => {
    const newClass = { code: classCode };

    // Hacer el POST request a la API para unirse a la clase
    const response = await fetch(`/api/clases/${classCode}/students`, {
      method: "POST",
      body: JSON.stringify(newClass),
      credentials: "include",
    });

    if (response.ok) {
      setShowJoin(false);
      // Vuelve a cargar las clases
      fetchClasses(); // Para actualizar la lista sin recargar la página
    } else {
      console.error("Error uniendo a la clase");
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Tus Clases</h1>
        <div className="flex flex-row gap-2">
          <button
            className="border-2 border-blue-600 text-blue-600 font-bold py-2 px-4 rounded hover:bg-blue-600 hover:text-white"
            onClick={() => setShowJoin(true)}
          >
            Unir-me a una classe
          </button>
          <CreateClass onClassCreated={fetchClasses} />
        </div>
      </div>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {classes.length > 0 ? (
            classes.map((classroom) => (
              <ClassCard key={classroom.classroom_id} classroom={classroom} />
            ))
          ) : (
            <p>No hay clases disponibles.</p>
          )}
        </div>
      )}
      {showJoin ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <label className="flex flex-col gap-2">
              Codigo de clase
              <input
                type="text"
                name="classCode"
                id="classCode"
                className="border-2 border-black rounded-md p-2"
                onChange={(e) => setClassCode(e.target.value)}
              />
            </label>
            <div className="flex flex-row gap-2">
              <button
                className="bg-blue-600 text-white rounded-md p-2 mt-2"
                onClick={handleJoinClass}
              >
                Unir-me a la clase
              </button>
              <button
                className="bg-red-600 text-white rounded-md p-2 mt-2"
                onClick={() => setShowJoin(false)}
              >
                Cancel·lar
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
