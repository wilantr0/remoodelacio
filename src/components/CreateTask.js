"use client";
import { useState } from "react";

export default function TaskForm({ classId, onSubmitSuccess }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [dueDate, setDueDate] = useState(""); // Nuevo estado para la fecha de entrega
  const [type, setType] = useState("tarea"); // Selector de tipo
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const endpoint = type === "tarea"
        ? `/api/clases/${classId}/tareas`
        : `/api/clases/${classId}/materiales`;

      const body = type === "tarea"
        ? JSON.stringify({ name, description, dueDate }) // Incluye dueDate en la tarea
        : JSON.stringify({ name, description, url });

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if(res.ok){
        const info = await res.json()
        onSubmitSuccess(info)
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear el elemento");
      }

      const data = await res.json();
      setSuccessMessage(`${type === "tarea" ? "Tarea" : "Material"} "${data.title}" creado con éxito.`);
      setName("");
      setDescription("");
      setUrl("");
      setDueDate(""); // Limpia el campo de fecha de entrega
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Crear {type === "tarea" ? "Nova Tasca" : "Nou Material"}</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      {/* Selector de Tipo */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tipus <span className="text-red-500" >*</span></label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="tarea">Tasca</option>
          <option value="material">Material</option>
        </select>
      </div>

      {/* Campos comunes */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nom <span className="text-red-500" >*</span></label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Descripció <span className="text-red-500" >*</span></label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        ></textarea>
      </div>

      {/* Campo de URL para Materiales */}
      {type === "material" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">URL del Material</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      )}

      {/* Campo de Fecha de Entrega para Tareas */}
      {type === "tarea" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Data de Entrega</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      )}

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
        Crear {type === "tarea" ? "Tarea" : "Material"}
      </button>
    </form>
  );
}
