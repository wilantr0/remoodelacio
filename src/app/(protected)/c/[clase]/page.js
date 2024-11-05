"use client";
import { useEffect, useState } from "react";
import { GeneralViewAlumne, TasquesViewAlumne, NotesView } from "@components/AlumnoViews";
import { GeneralViewProfessor, TasquesViewProfessor, AlumnesView } from "@components/ProfesorViews";

export default function Classe({ params }) {
  const [classInfo, setClassInfo] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [students, setStudents] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const classRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clases/${params.clase}`, { credentials: 'include', method: 'GET' });
        const tasksRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clases/${params.clase}/tareas`, { credentials: 'include' });
        const materialsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clases/${params.clase}/materiales`, { credentials: 'include' });
        const studentsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clases/${params.clase}/students`, { credentials: 'include' });
        const userRes = await fetch(`/api/user`, { credentials: 'include' });
  
        if (!classRes.ok || !tasksRes.ok || !materialsRes.ok || !studentsRes.ok || !userRes.ok) {
          throw new Error("Failed to load data");
        }
  
        const classData = await classRes.json();
        const tasksData = await tasksRes.json();
        const materialsData = await materialsRes.json();
        const studentsData = await studentsRes.json();
        const userData = await userRes.json();
        
        setClassInfo(classData || {});
        setAssignments(tasksData || []);
        setMaterials(materialsData || []);
        setStudents(studentsData || []);
  
        // Encuentra el rol correspondiente a la clase actual
        const userClassRole = userData.classroomUsers.find((classroom) => classroom.classroom_id === parseInt(params.clase));
        setUserRole(userClassRole ? userClassRole.role : null); // Establece el rol o `null` si no se encuentra
  
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchClassData();
  }, [params.clase]);
  console.log(userRole)
  

  const sortedAssignments = assignments.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  if (isLoading) {
    return <div className="p-8 flex justify-center items-center h-screen">Cargando...</div>; // Pantalla de carga
  }


  return (

      <div className="p-8 flex flex-col justify-start h-full">
        {/* Banner de la clase */}
        <div className="grid grid-cols-5 gap-2">
          <div className="relative flex col-span-4 flex-col justify-end items-start bg-cover bg-center p-8 h-48 pb-0 rounded-lg text-white shadow-[inset_33px_-60px_65px_40px_rgba(0,_0,_0,_0.5)]" style={{ backgroundImage: 'url("/banner.jpg")' }}>
            <h1 className="text-4xl font-bold">{classInfo.name || "Clase sin nombre"}</h1>
            <p className="text-lg mt-2">{classInfo.description || "Profesor"}</p>
          </div>

          {
            userRole==='alumne'? 
            <div className="flex flex-col items-center gap-2">
              <img src={classInfo.created_by.image || "/placeholder.png"} alt="" className="w-20 h-20 rounded-full mb-2" />
              <section className="text-center ">
                <p>
                  {classInfo.created_by.name}
                </p>
                <p>
                  {classInfo.created_by.email}
                </p>
              </section>
            </div>
            : 
            <div className="border-2 border-black rounded-md h-full">
              <p>Codi de la classe:</p>
              {params.clase}
            </div>
          }
        </div>
        

        {/* Pestañes */}
        <div className="flex gap-4 flex-row justify-around mt-4 w-full">
          <button onClick={() => setActiveTab("general")} className={activeTab === "general" ? "font-bold" : ""}>General</button>
          <button onClick={() => setActiveTab("tasques")} className={activeTab === "tasques" ? "font-bold" : ""}>Tasques</button>
          <button onClick={() => setActiveTab("alumnes")} className={activeTab === "alumnes" ? "font-bold" : ""}>Notes</button>
        </div>

        {/* Contingut de cada pestaña */}
        {activeTab === "general" && (
          userRole === "alumne" ? (
            <GeneralViewAlumne assignments={assignments} materials={materials} />
          ) : (
            <GeneralViewProfessor assignments={assignments} materials={materials} clase={params.clase} />
          )
        )}
        {activeTab === "tasques" && (
          userRole === "alumne" ? (
            <TasquesViewAlumne assignments={sortedAssignments} classId={params.clase} />
          ) : (
            <TasquesViewProfessor assignments={sortedAssignments} classId={params.clase} />
          )
        )}
        {activeTab === "alumnes" && (
          userRole === "professor" || userRole === "super" ? <AlumnesView students={students} /> : <NotesView assignments={assignments} />
        )}
      </div>
      


  );
}
