"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";

export default function AssignmentDetailsPage({ params }) {
  const [assignment, setAssignment] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fileType, setFileType] = useState('pdf')
  const router = useRouter();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await fetch(`/api/clases/${params.clase}/tareas/${params.tarea}`);
        if (res.ok) {
          const data = await res.json();
          setAssignment(data);
        } else {
          setErrorMessage("Error al cargar los detalles de la tarea.");
        }
      } catch (error) {
        setErrorMessage("");
      } finally {
        setLoading(false);
      }

      try {
        const userDataRes = await fetch("/api/user", { credentials: "include" });
        const userData = await userDataRes.json();
        const userRole = userData.classroomUsers.filter(
          (classroom) => classroom.classroom_id === params.clase
        );
        setUserRole(userRole[0] ? userRole[0].role : null);

        const submissionCheck = await fetch(`/api/clases/${params.clase}/tareas/${params.tarea}/check-submission`);
        const { hasSubmitted } = await submissionCheck.json();
        setHasSubmitted(hasSubmitted);
      } catch (error) {
        setErrorMessage("Error al cargar datos del usuario.");
      }
    };

    fetchAssignment();
  }, [params.clase, params.tarea]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
  
    const formData = new FormData();
  
    if (fileType === 'pdf') {
      if (!file) {
        setErrorMessage("Por favor, selecciona un archivo PDF para enviar.");
        return;
      }
      formData.append("file", file);
    } else {
      const urlInput = e.target.elements.url.value;
      if (!urlInput) {
        setErrorMessage("Por favor, ingresa una URL para enviar.");
        return;
      }
      formData.append("url", urlInput);
    }
  
    try {
      const res = await fetch(`/api/clases/${params.clase}/tareas/${params.tarea}/tarea`, {
        method: "POST",
        body: formData,
      });
  
      if (res.ok) {
        setHasSubmitted(true)
        router.reload();
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.error || "Error al enviar la tarea.");
      }
    } catch (error) {
      setErrorMessage("");
    }
  };

  const handleGradeSubmit = async (studentId, grade, submission_id) => {
    try {
      const res = await fetch(`/api/clases/${params.clase}/tareas/${params.tarea}/grade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, grade }),
      });

      await fetch(`/api/clases/${params.clase}/tareas/${params.tarea}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grade, submissionId: submission_id }),
      });

      if (res.ok) {
        router.reload();
      } else {
        setErrorMessage("Error al asignar la calificación.");
      }
    } catch (error) {
      setErrorMessage("");
    }
  };

  if (loading) return <p className="text-gray-500">Cargando detalles de la tarea...</p>;

  console.log(assignment)

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <a href={`/c/${params.clase}`}>
        <ArrowLeftCircle className="w-8 h-8 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer mb-4" />
      </a>
      {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p>
      )}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{assignment.title}</h1>
      <p className="text-gray-600 mb-2">{assignment.description}</p>
      <p className="text-gray-500 mb-6">
        Fecha de entrega: {new Date(assignment.due_date).toLocaleDateString()}
      </p>

      {userRole === "alumne" && !hasSubmitted && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Sube tu tarea</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <select name="fileType" id="fileType" className="border border-gray-300 rounded mt-2 p-1 w-full" onChange={e => setFileType(e.target.value)} >
              <option value="pdf">PDF</option>
              <option value="url">URL</option>
            </select>
            {
              fileType === 'pdf'?
              (<input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-500
                          bg-white
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
              />)
            :
              <input 
              type="url" 
              name="url" 
              id="url" 
              placeholder="https://..."
              className="mt-2 block w-full border-2 border-black rounded p-1  " />
            }
            
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              Enviar Tarea
            </button>
          </form>
        </div>
      )}

      {userRole === "alumne" && hasSubmitted && (
        <p className="mt-4 text-green-500">Ya has entregado esta tarea.</p>
      )}


      {userRole === "professor" && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Entregas de estudiantes</h2>
          {assignment.submissions.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {assignment.submissions.map((submission) => (
                <li key={submission.student_id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow">
                  <img
                    className="w-12 h-12 rounded-full"
                    alt="Student"
                    src={submission.student.image || "/placeholder.png"}
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-col items-start">
                        <p className="font-semibold text-gray-700">{submission.student.name}</p>
                        <p className="text-gray-500">
                          Enviado el: {new Date(submission.submitted_at).toLocaleDateString()}
                        </p>
                      </div>
                        <p className="text-gray-600">
                          {submission.grade ? `${submission.grade}/10` : "Sin evaluar"}
                        </p>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <a
                        href={submission.file_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700 mt-2 inline-block"
                      >
                        Ver entrega
                      </a>
                      <div>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          placeholder="Calificación"
                          className="border border-gray-300 rounded mt-2 p-1 w-40"
                          onChange={(e) => (submission.gradeInput = e.target.value)}
                        />
                        <button
                          onClick={() => handleGradeSubmit(submission.student_id, submission.gradeInput, submission.submission_id)}
                          className="bg-green-600 text-white px-3 py-1 rounded-lg shadow ml-2 hover:bg-green-700 transition-colors"
                        >
                          Asignar
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aún no hay entregas.</p>
          )}
        </div>
      )}
    </div>
  );
}
