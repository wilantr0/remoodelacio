"use client"

import { useState } from "react";

export default function CreateClass() {
  const [showModal, setShowModal] = useState(false);
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateClass = async () => {
    const newClass = {
      name: className,
      description: description,
    };

    // Hacer el POST request a la API para crear la clase
    const response = await fetch("/api/clases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClass),
    });

    if (response.ok) {
      // Resetear los campos y cerrar el modal
      setClassName("");
      setDescription("");
      setShowModal(false);
    } else {
      console.error("Error creando la clase");
    }
  };

  return (
    <>
      {/* Botón para abrir el pop-up */}
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => setShowModal(true)}
      >
        Crear Clase
      </button>

      {/* Pop-up */}
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Crear Nueva Clase</h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre de la Clase
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre de la clase"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción de la clase"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateClass}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
