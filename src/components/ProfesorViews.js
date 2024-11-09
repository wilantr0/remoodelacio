'use client'
import Link from "next/link";
import { useState } from "react";
import TaskForm from "@components/CreateTask";
// Vista General per a Professors
export function GeneralViewProfessor({ assignments, materials, clase }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState(assignments); 

  const handleTaskCreationSuccess = (info) => {
    setTaskList((prevTasks) => [...prevTasks, info]); 
    setIsModalOpen(false); // Cierra el modal al crear la tarea
  };



  return (
    <>
      <h2 className="text-2xl font-semibold mt-4">Gestió de Tasques i Materials</h2>
      <button onClick={() => setIsModalOpen(true)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
        Crear Nou Element
      </button>
      
      <div className="mt-4">
        {taskList.concat(materials).map((item) => (
          <div key={item.id} className="border p-4 mb-4">
            <h3 className="font-bold">{item.title}</h3>
            <p>{item.description}</p>
            {item.id && <a href={item.id} target="_blank" rel="noopener noreferrer" className="text-blue-500">Veure Material</a>}
            <button className="bg-blue-500 text-white px-4 py-2 mt-2">Editar</button>
            <button className="bg-red-500 text-white px-4 py-2 mt-2 ml-2">Eliminar</button>
          </div>
        ))}
      </div>
      {
        isModalOpen?<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Crear Nou Element</h2>
            <TaskForm classId={clase} onSubmitSuccess={handleTaskCreationSuccess} />
          </div>
        </div>
        : ''
      }
      
    </>
  );
}



// Vista Tasques per a Professors

export async function TasquesViewProfessor({ assignments, classId }) {


  console.log(assignments);
  return (
    <>
      <h2 className="text-2xl font-semibold mt-4">Gestió de Tasques</h2>
      <div className="mt-4">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div key={assignment.assignment_id} className="border p-4 mb-4">
              <Link href={`/c/${classId}/t/${assignment.assignment_id}`}>
                <h3 className="font-bold cursor-pointer text-blue-500 hover:underline">
                  {assignment.title}
                </h3>
              </Link>
              <p className="flex flex-row justify-between">
                <span>Descripció: {assignment.description}</span>
                <span>Data d&#39;entrega: {assignment.due_date || "Sense data d'entrega"}</span>
              </p>
            </div>
          ))
        ) : (
          <p>No hi ha tasques disponibles per a aquesta classe.</p>
        )}
      </div>
    </>
  );
}


// Vista Alumnes (per a professors)
export function AlumnesView({ students }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-4">Llista d&#39;Alumnes</h2>
      <div className="mt-4">
        {students.map((student) => (
          <div key={student.user.id} className="border p-4 mb-4">
            <p>{student.user.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}