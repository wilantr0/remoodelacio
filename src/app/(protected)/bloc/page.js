"use client"
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import { CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Label } from "@components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { User, Book, GraduationCap } from 'lucide-react'
import Image from 'next/image'

async function fetchUserData(claseSeleccionada) {
  const res = await fetch('/api/user', { credentials: 'include' });
  if (res.ok) {
    const userData = await res.json();
    const claseActual = userData.classroomUsers.find(cu => cu.classroom_id === claseSeleccionada);
    const role = claseActual ? claseActual.role : null;
    return { ...userData, role };
  }
  throw new Error('Failed to fetch user data');
}

export default function BlocCalificaciones() {
  const [vistaProfesor, setVistaProfesor] = useState(true);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [user, setUser] = useState(undefined);
  const [clases, setClases] = useState([]);
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(claseSeleccionada);
        setUser(userData);
        setVistaProfesor(userData.role === 'professor');
  
        const classesRes = await fetch('/api/clases');
        const classesData = await classesRes.json();
        setClases(classesData);
  
        if (!claseSeleccionada && classesData.length > 0) {
          setClaseSeleccionada(classesData[0].classroom_id);
        }
  
        if (claseSeleccionada) {
          const studentsRes = await fetch(`/api/clases/${claseSeleccionada}/students`);
          const studentsData = await studentsRes.json();
          setAlumnos(studentsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [claseSeleccionada]);

  return (
    <div>
      <div className="w-full mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Select value={claseSeleccionada?.toString()} onValueChange={(value) => setClaseSeleccionada(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar clase" />
              </SelectTrigger>
              <SelectContent>
                {clases.map((clase) => (
                  <SelectItem key={clase.classroom_id} value={clase.classroom_id.toString()}>
                    <GraduationCap className="mr-2 h-4 w-4 inline-block" />
                    {clase.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <CardTitle className="text-2xl">Bloc de Qualificacions</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="vista-switch" className="text-sm">
                {vistaProfesor ? (
                  <><User className="inline mr-1" size={16} /> Professor</>
                ) : (
                  <><Book className="inline mr-1" size={16} /> Alumne/a</>
                )}
              </Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {vistaProfesor ? (
            <VistaProfesor claseId={claseSeleccionada} clases={clases} alumnos={alumnos} />
          ) : (
            <VistaAlumno user={user} claseId={claseSeleccionada} clases={clases} />
          )}
        </CardContent>
      </div>
    </div>
  )
}

function VistaProfesor({ claseId, alumnos }) {
  const [clase, setClase] = useState(null);


  //const clase = clases.find(c => c.classroom_id == claseId);
  useEffect(() => {

    async function fetchClase () {
      const claseRes = await fetch(`/api/clases/${claseId}`);
      const clase = await claseRes.json();

      setClase(clase)
    }

    fetchClase()


  },[claseId] )



  if (!clase) return <div>No s&#39;ha trobat la classe</div>;

  console.log(clase)

  return (
    <Table>
      <TableHeader>
        <TableRow className='relative h-20'>
          <TableHead>Alumne/a</TableHead>
          {clase.assignments && clase.assignments.map((tarea) => (
            <TableHead key={tarea.assignment_id} className='w-fit'>
              <p className='-rotate-45 w-fit border-b border-t'>{tarea.title}</p>
            </TableHead>
          ))}
          <TableHead>Mitjana</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alumnos.map((alumno) => (
          <TableRow key={alumno.user.id}>
            <TableCell className="font-medium flex flex-row items-center gap-2">
              <Image width={70} height={70} src={alumno.user.image} alt='profilePhoto' />
              {alumno.user.name} - {alumno.user.email}
            </TableCell>
            {clase.assignments && clase.assignments.map((tarea) => {
              const calificacion = tarea.submissions.find(
                (sub) => sub.student_id === alumno.user.id
              );
              return <TableCell key={tarea.assignment_id}>
                <a href={`/c/${claseId}/t/${tarea.assignment_id}`} className='decoration-transparent text-black'>{calificacion ? (calificacion.grade === null ? 'N/A' : calificacion.grade) : 'N/A'}</a></TableCell>;
            })}
            <TableCell>
            {alumno.user.submissions && clase.assignments
              ? (
                  (() => {
                    // Filtra las calificaciones válidas (que no son null)
                    const calificacionesValidas = alumno.user.submissions
                      .filter(sub => 
                        clase.assignments.some(assignment => assignment.assignment_id === sub.assignment.assignment_id) &&
                        sub.grade !== null
                      );
                    
                    // Si no hay calificaciones válidas, mostramos 'N/A'
                    if (calificacionesValidas.length === 0) return 'N/A';
                    
                    // Calculamos el promedio si hay al menos una calificación válida
                    const promedio = calificacionesValidas
                      .reduce((sum, submission) => sum + submission.grade, 0) / calificacionesValidas.length;
                    
                    return promedio.toFixed(2);
                  })()
                )
              : 'N/A'}



            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function VistaAlumno({ user, claseId, clases }) {
  const [tareas, setTareas] = useState([]);
  const clase = clases.find(c => c.classroom_id == claseId);

  useEffect(() => {
    const fetchGrades = async () => {
      if (claseId) {
        const tareasRes = await fetch(`/api/clases/${claseId}/tareas`);
        const tareasInfo = await tareasRes.json();
        setTareas(tareasInfo);
      }
    };
    fetchGrades();
  }, [claseId, user]);

  if (!clase) return <div>No s&#39;ha trobat la classe</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Qualificacions de {user.name}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tasca</TableHead>
            <TableHead>Qualificació</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tareas.map((tarea) => (
            <TableRow key={tarea.assignment_id}>
              <TableCell className="font-medium">{tarea.title}</TableCell>
              <TableCell>{tarea.submissions.find(sub => sub.student_id === user.id)?.grade ?? 'N/A'}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-bold">Mitjana</TableCell>
            <TableCell className="font-bold">
              {(
                tareas.reduce((sum, tarea) => sum + (tarea.submissions.find(sub => sub.student_id === user.id)?.grade || 0), 0) / 
                tareas.filter(tarea => tarea.submissions.find(sub => sub.student_id === user.id)?.grade !== undefined).length
              ).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
