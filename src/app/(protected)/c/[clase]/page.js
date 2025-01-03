"use client";
import { useEffect, useState } from "react";
import { GeneralViewAlumne, TasquesViewAlumne, NotesView } from "@components/AlumnoViews";
import { GeneralViewProfessor, TasquesViewProfessor, AlumnesView } from "@components/ProfesorViews";
import TaskForm from "@components/CreateTask";
import { Maximize, X } from "lucide-react";

export default function Classe({ params }) {
  const [classInfo, setClassInfo] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [students, setStudents] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const classRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clases/${params.clase}`, { credentials: "include", method: "GET" });
        const tasksRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clases/${params.clase}/tareas`, { credentials: "include" });
        const materialsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clases/${params.clase}/materiales`, { credentials: "include" });
        const studentsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clases/${params.clase}/students`, { credentials: "include" });
        const userRes = await fetch(`/api/user`, { credentials: "include" });

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

        const userClassRole = userData.classroomUsers.find((classroom) => classroom.classroom_id === params.clase);
        setUserRole(userClassRole ? userClassRole.role : null);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassData();
  }, [params.clase]);

  // Actualizar la lista de tareas cuando se crea una nueva
  const handleTaskCreationSuccess = (newTask) => {
    setAssignments((prevAssignments) => [...prevAssignments, newTask]);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div className="p-8 flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="p-8 flex flex-col justify-start h-full">
      {/* Banner de la clase */}
      <div className="grid grid-cols-5 gap-2">
        <div
          className="relative flex col-span-4 flex-col justify-end items-start bg-cover bg-center p-8 h-48 pb-0 rounded-lg text-white shadow-[inset_33px_-60px_65px_40px_rgba(0,_0,_0,_0.5)]"
          style={{ backgroundImage: 'url("/banner.jpg")' }}
        >
          <h1 className="text-4xl font-bold">{classInfo.name || "Clase sin nombre"}</h1>
          <p className="text-lg mt-2">{classInfo.description || "Profesor"}</p>
        </div>

        {userRole === "alumne" ? (
          <div className="flex flex-col items-center gap-2">
            <img src={classInfo.created_by.image || "/placeholder.png"} alt="" className="w-20 h-20 rounded-full mb-2" />
            <section className="text-center ">
              <p>{classInfo.created_by.name}</p>
              <p>{classInfo.created_by.email}</p>
            </section>
          </div>
        ) : (
          <div className="h-full flex flex-col gap-1">
            <div className="relative border-2 border-black rounded-md text-5xl flex flex-col justify-center items-center flex-[3]">
              <Maximize className="absolute top-2 right-2 hover:cursor-pointer" onClick={() => setShowCode(true)} />
              <p className="font-bold mt-2 text-3xl">Codi de la classe:</p>
              {params.clase}
            </div>
            <div className="flex-[1] bg-blue-300 rounded-md flex justify-center items-center">
              <button className="w-full h-full font-bold" onClick={() => setIsModalOpen(true)}>
                Crear nova tasca
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal para crear tareas */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <TaskForm classId={params.clase} onSubmitSuccess={handleTaskCreationSuccess} />
            <span
              className="absolute -top-5 -right-5 bg-red-500 rounded-full p-2 text-white cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              <X />
            </span>
          </div>
        </div>
      )}

      {/* Pestañas */}
      <div className="flex gap-4 flex-row justify-around mt-4 w-full">
        <button onClick={() => setActiveTab("general")} className={activeTab === "general" ? "font-bold" : ""}>
          General
        </button>
        <button onClick={() => setActiveTab("tasques")} className={activeTab === "tasques" ? "font-bold" : ""}>
          Tasques
        </button>
        <button onClick={() => setActiveTab("alumnes")} className={activeTab === "alumnes" ? "font-bold" : ""}>
          {userRole === "alumne" ? "Notes" : "Alumnes"}
        </button>
      </div>

      {
          showCode && 
          <div className="absolute top-0 right-0 bottom-0 left-0 m-auto bg-white p-4 w-fit h-1/2 rounded-md shadow-md">
          <p className="absolute text-black font-bold text-4xl mb-2">Codi de la classe:</p>
          <p className="text-black text-[11rem] font-bold h-full w-full  flex justify-center items-center">{params.clase}</p>
          <button onClick={() => setShowCode(false)} className="mt-2 bg-red-500 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded-full inline-flex items-center absolute -top-5 -right-5">
            <X />
          </button>
        </div>

        }

      {/* Contenido de las pestañas */}
      {activeTab === "general" && (
        userRole === "alumne" ? (
          <GeneralViewAlumne assignments={assignments} materials={materials} />
        ) : (
          <GeneralViewProfessor assignments={assignments} materials={materials} clase={params.clase} />
        )
      )}
      {activeTab === "tasques" && (
        userRole === "alumne" ? (
          <TasquesViewAlumne assignments={assignments} classId={params.clase} />
        ) : (
          <TasquesViewProfessor assignments={assignments} classId={params.clase} />
        )
      )}
      {activeTab === "alumnes" && (
        userRole === "professor" || userRole === "super" ? (
          <AlumnesView students={students} />
        ) : (
          <NotesView assignments={assignments} />
        )
      )}
    </div>
  );
}
