"use client"
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import { CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Label } from "@components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { User, Book, GraduationCap } from 'lucide-react'

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
        setVistaProfesor(userData.role === 'professor' || userData.role === 'super');

        const classesRes = await fetch('/api/clases');
        const classesData = await classesRes.json();
        setClases(classesData);
        setClaseSeleccionada(classesData[0]?.classroom_id || null);

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

  console.log(alumnos)
  return (
    <div>
      <div className="w-full mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Select value={claseSeleccionada?.toString()} onValueChange={(value) => setClaseSeleccionada(Number(value))}>
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
            <CardTitle className="text-2xl">Bloc de Calificaciones</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="vista-switch" className="text-sm">
                {vistaProfesor ? (
                  <><User className="inline mr-1" size={16} /> Profesor</>
                ) : (
                  <><Book className="inline mr-1" size={16} /> Alumno</>
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

// Componente ajustado de VistaProfesor
function VistaProfesor({ claseId, clases, alumnos }) {
  const clase = clases.find(c => c.classroom_id == claseId);

  if (!clase) return <div>Clase no encontrada</div>;

  // Asegúrate de que `clase.tareas` esté disponible o haz una llamada adicional para obtener las tareas
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Alumno</TableHead>
          {clase?.tareas?.map((tarea) => (
            <TableHead key={tarea.assignment_id}>{tarea.title}</TableHead>
          ))}
          <TableHead>Promedio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alumnos.map((alumno) => (
          <TableRow key={alumno.user.id}>
            <TableCell className="font-medium">{alumno.user.name}</TableCell>
            {clase?.tareas?.map((tarea) => {
              const calificacion = alumno.calificaciones.find(c => c.assignment_id === tarea.assignment_id);
              return <TableCell key={tarea.assignment_id}>{calificacion ? calificacion.grade : 'N/A'}</TableCell>
            })}
            <TableCell>
              {alumno.calificaciones && clase?.tareas
                ? (
                    (alumno.calificaciones
                      .filter(c => clase.tareas.some(t => t.assignment_id === c.assignment_id))
                      .reduce((sum, cal) => sum + cal.grade, 0) / clase.tareas.length
                    ).toFixed(2)
                  )
                : 'N/A'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Componente ajustado de VistaAlumno
function VistaAlumno({ user, claseId, clases }) {
  const [tareas, setTareas] = useState([]);
  const [notas, setNotas] = useState([]);
  const clase = clases.find(c => c.classroom_id == claseId);

  useEffect(() => {
    const fetchGrades = async () => {
      if (claseId) {
        const tareasRes = await fetch(`/api/clases/${claseId}/tareas`);
        const tareasInfo = await tareasRes.json();
        setTareas(tareasInfo);

        setNotas(tareasInfo.find(e => e.submissions.student_id === user.id))

      }
    };
    fetchGrades();
  }, [claseId, user]);

  if (!clase) return <div>Clase no encontrada</div>;

  console.log(notas)
  console.log(tareas)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Calificaciones de {user.name}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tarea</TableHead>
            <TableHead>Calificación</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tareas.map((tarea) => (
            <TableRow key={tarea.assignment_id}>
              <TableCell className="font-medium">{tarea.title}</TableCell>
              <TableCell>{notas}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-bold">Promedio</TableCell>
            <TableCell className="font-bold">
              {(
                tareas.reduce((sum, tarea) => sum + (tarea.calificacion !== 'N/A' ? tarea.calificacion : 0), 0) / 
                tareas.filter(tarea => tarea.calificacion !== 'N/A').length
              ).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
