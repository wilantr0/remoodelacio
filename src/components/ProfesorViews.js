'use client'
import Link from "next/link";
import { useState } from "react";
import TaskForm from "@components/CreateTask";
import { X } from "lucide-react";

const transformDate = (isoDate) => {
  const date = new Date(isoDate);
  const daysOfWeek = ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'];

  const dayOfWeek = daysOfWeek[date.getDay()]
  const day = String(date.getDate()).padStart(2, '0'); // Asegura 2 dígitos
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (0-11) + 1
  const year = date.getFullYear();
  return `${dayOfWeek}, ${day}-${month}-${year}`;
};
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
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <TaskForm classId={clase} onSubmitSuccess={handleTaskCreationSuccess} />
            <span className="absolute -top-5 -right-5 bg-red-500 rounded-full p-2 text-white cursor-pointer" onClick={() => setIsModalOpen(false)}><X /></span>
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
              <Link key={assignment.assignment_id} className="decoration-transparent text-black" href={`/c/${classId}/t/${assignment.assignment_id}`}>
                <div  className="border p-4 mb-4">
                  <h3 className="font-bold cursor-pointer">
                  {assignment.title}
                  </h3>
                  <p className="flex flex-row justify-between">
                    <span>Descripció: {assignment.description}</span>
                    <span>Data d&#39;entrega: {transformDate(assignment.due_date) || "Sense data d'entrega"}</span>
                  </p>
                </div>
              </Link>
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
          <div key={student.user.id} className="border p-4 mb-4 flex flex-row justify-between items-center">
            {student.user.name}
          </div>
        ))}
      </div>
    </>
  );
}