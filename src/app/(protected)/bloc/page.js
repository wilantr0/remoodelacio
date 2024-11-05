"use client"
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import { CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Label } from "@components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { User, Book, GraduationCap } from 'lucide-react'

// Componente principal
export default function BlocCalificaciones() {
  const [vistaProfesor, setVistaProfesor] = useState(true)
  const [claseSeleccionada, setClaseSeleccionada] = useState(null)
  const [user, setUser] = useState(undefined)
  const [clases, setClases] = useState([])
  const [alumnos, setAlumnos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtén datos del usuario
        const userData = await fetchUserData();
        setUser(userData);
        setVistaProfesor(userData.role === 'professor');

        // Obtén la lista de clases
        const classesRes = await fetch('/api/clases');
        const classesData = await classesRes.json();
        setClases(classesData);
        setClaseSeleccionada(classesData[0]?.id || null);

        // Obtén la lista de alumnos de la clase seleccionada
        if (claseSeleccionada) {
          const studentsRes = await fetch(`/api/clases/${claseSeleccionada}/alumnos`);
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

async function fetchUserData() {
  const res = await fetch('/api/user', { credentials: 'include' });
  if (res.ok) {
    return res.json();
  }
  throw new Error('Failed to fetch user data');
}

// Componente para la vista del profesor
function VistaProfesor({ claseId, clases, alumnos }) {
  const clase = clases.find(c => c.id === claseId);
  if (!clase) return <div>Clase no encontrada</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Alumno</TableHead>
          {clase.tareas.map((tarea) => (
            <TableHead key={tarea.id}>{tarea.nombre}</TableHead>
          ))}
          <TableHead>Promedio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {alumnos.map((alumno) => (
          <TableRow key={alumno.id}>
            <TableCell className="font-medium">{alumno.nombre}</TableCell>
            {clase.tareas.map((tarea) => {
              const calificacion = alumno.calificaciones.find(c => c.tareaId === tarea.id);
              return <TableCell key={tarea.id}>{calificacion ? calificacion.valor : 'N/A'}</TableCell>
            })}
            <TableCell>
              {(alumno.calificaciones
                .filter(c => clase.tareas.some(t => t.id === c.tareaId))
                .reduce((sum, cal) => sum + cal.valor, 0) / clase.tareas.length).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Componente para la vista del alumno
function VistaAlumno({ user, claseId, clases }) {
  const clase = clases.find(c => c.id === claseId);
  if (!clase) return <div>Clase no encontrada</div>;

  const alumno = clase.alumnos.find(a => a.id === user.id);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Calificaciones de {user.name}</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tarea</TableHead>
            <TableHead>Calificación</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clase.tareas.map((tarea) => {
            const calificacion = alumno.calificaciones.find(c => c.tareaId === tarea.id);
            return (
              <TableRow key={tarea.id}>
                <TableCell className="font-medium">{tarea.nombre}</TableCell>
                <TableCell>{calificacion ? calificacion.valor : 'N/A'}</TableCell>
              </TableRow>
            )
          })}
          <TableRow>
            <TableCell className="font-bold">Promedio</TableCell>
            <TableCell className="font-bold">
              {(alumno.calificaciones
                .filter(c => clase.tareas.some(t => t.id === c.tareaId))
                .reduce((sum, cal) => sum + cal.valor, 0) / clase.tareas.length).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
