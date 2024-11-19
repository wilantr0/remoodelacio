"use client";

import { useState, useEffect } from "react";

export default function AttendancePage() {
  const [alumnes, setAlumnes] = useState([]);
  const [classeSeleccionada, setClasseSeleccionada] = useState("");

  useEffect(() => {
    const fetchAlumnes = async () => {
      try {
        if (!classeSeleccionada) return;

        const response = await fetch(`/api/clases/${classeSeleccionada}/students`);
        if (!response.ok) throw new Error("Error en carregar els alumnes");

        const data = await response.json();

        const alumnesAmbAssistencia = data.map((alumne) => ({
          ...alumne,
          assistencia: "PRESENT", // Estat inicial
          observacions: "", // Afegim camp per observacions
        }));

        setAlumnes(alumnesAmbAssistencia);
      } catch (error) {
        console.error("Error en carregar alumnes:", error);
        alert("Error en carregar els alumnes");
      }
    };

    fetchAlumnes();
  }, [classeSeleccionada]);

  const actualitzarAssistencia = (idAlumne, novaAssistencia) => {
    setAlumnes((alumnesActuals) =>
      alumnesActuals.map((alumne) =>
        alumne.user.id === idAlumne
          ? { ...alumne, assistencia: novaAssistencia }
          : alumne
      )
    );
  };

  const actualitzarObservacions = (idAlumne, novesObservacions) => {
    setAlumnes((alumnesActuals) =>
      alumnesActuals.map((alumne) =>
        alumne.user.id === idAlumne
          ? { ...alumne, observacions: novesObservacions }
          : alumne
      )
    );
  };

  const guardarAssistencia = async () => {
    try {
      const data = alumnes.reduce((acc, alumne) => {
        acc[alumne.user.id] = {
          assistencia: alumne.assistencia,
          observacions: alumne.observacions,
        };
        return acc;
      }, {});

      const response = await fetch(`/api/clases/${classeSeleccionada}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error en guardar l'assistència");
      }

      alert("Assistència guardada correctament");
    } catch (error) {
      console.error("Error en guardar l'assistència:", error);
      alert("Error en guardar l'assistència");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Control d&#39;assistència</h1>

      <div className="mb-4">
        <label htmlFor="classe" className="block font-medium mb-2">
          Selecciona una classe:
        </label>
        <select
          id="classe"
          value={classeSeleccionada}
          onChange={(e) => setClasseSeleccionada(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        >
          <option value="">Selecciona una classe</option>
          <option value="classroom1">Classe 1</option>
          <option value="classroom2">Classe 2</option>
        </select>
      </div>

      {alumnes.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Nom</th>
              <th className="border border-gray-300 px-4 py-2">Assistència</th>
              <th className="border border-gray-300 px-4 py-2">Observacions</th>
            </tr>
          </thead>
          <tbody>
            {alumnes.map((alumne) => (
              <tr key={alumne.user.id}>
                <td className="border border-gray-300 px-4 py-2">{alumne.user.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-2">
                    {["PRESENT", "RETARD", "ABSENT", "INCIDENCIA"].map((estat) => (
                      <button
                        key={estat}
                        className={`px-2 py-1 rounded ${
                          alumne.assistencia === estat
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => actualitzarAssistencia(alumne.user.id, estat)}
                      >
                        {estat === "PRESENT" ? "Present" : estat === "RETARD" ? "Retard" : estat === "ABSENT" ? "Falta" : "Incidència"}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    value={alumne.observacions}
                    onChange={(e) =>
                      actualitzarObservacions(alumne.user.id, e.target.value)
                    }
                    placeholder="Observacions"
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Selecciona una classe per veure els alumnes.</p>
      )}

      <button
        onClick={guardarAssistencia}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
        disabled={!classeSeleccionada || alumnes.length === 0}
      >
        Guarda tots els canvis
      </button>
    </div>
  );
}
