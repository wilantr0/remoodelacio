import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Book, GraduationCap } from 'lucide-react'
import NavBar from '@/components/LoggedNavBar'
import tokenValidation from '@/utils/userDecript'

// Tipos
type Tarea = {
  id: number
  nombre: string
}

type Calificacion = {
  tareaId: number
  valor: number
}

type Alumno = {
  id: number
  nombre: string
  calificaciones: Calificacion[]
}

type Clase = {
  id: number
  nombre: string
  tareas: Tarea[]
}

// Datos de muestra
const clases: Clase[] = [
  { 
    id: 1, 
    nombre: "Matemáticas", 
    tareas: [
      { id: 1, nombre: "Ecuaciones lineales" },
      { id: 2, nombre: "Geometría básica" },
      { id: 3, nombre: "Álgebra" }
    ]
  },
  { 
    id: 2, 
    nombre: "Historia", 
    tareas: [
      { id: 4, nombre: "Revolución Francesa" },
      { id: 5, nombre: "Segunda Guerra Mundial" },
      { id: 6, nombre: "Civilizaciones antiguas" }
    ]
  },
  { 
    id: 3, 
    nombre: "Ciencias", 
    tareas: [
      { id: 7, nombre: "Sistema solar" },
      { id: 8, nombre: "Célula vegetal" },
      { id: 9, nombre: "Estados de la materia" }
    ]
  },
]

const alumnos: Alumno[] = [
  { 
    id: 1, 
    nombre: "Ana García", 
    calificaciones: [
      { tareaId: 1, valor: 8 }, { tareaId: 2, valor: 7 }, { tareaId: 3, valor: 9 },
      { tareaId: 4, valor: 8 }, { tareaId: 5, valor: 9 }, { tareaId: 6, valor: 7 },
      { tareaId: 7, valor: 9 }, { tareaId: 8, valor: 8 }, { tareaId: 9, valor: 9 }
    ]
  },
  { 
    id: 2, 
    nombre: "Carlos Rodríguez", 
    calificaciones: [
      { tareaId: 1, valor: 6 }, { tareaId: 2, valor: 8 }, { tareaId: 3, valor: 7 },
      { tareaId: 4, valor: 7 }, { tareaId: 5, valor: 8 }, { tareaId: 6, valor: 9 },
      { tareaId: 7, valor: 8 }, { tareaId: 8, valor: 7 }, { tareaId: 9, valor: 8 }
    ]
  },
  { 
    id: 3, 
    nombre: "María López", 
    calificaciones: [
      { tareaId: 1, valor: 9 }, { tareaId: 2, valor: 9 }, { tareaId: 3, valor: 8 },
      { tareaId: 4, valor: 9 }, { tareaId: 5, valor: 8 }, { tareaId: 6, valor: 9 },
      { tareaId: 7, valor: 8 }, { tareaId: 8, valor: 9 }, { tareaId: 9, valor: 9 }
    ]
  },
]

// Componente principal
export default function BlocCalificaciones() {
  const [vistaProfesor, setVistaProfesor] = useState(true)
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(alumnos[0].id)
  const [claseSeleccionada, setClaseSeleccionada] = useState(clases[0].id)
  const [user, setUser] = useState(undefined)
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbTB6ZmExM24wMDAxeWF2ZzJpMXcwbmxsIiwiaWF0IjoxNzI2MTUzNTg4LCJleHAiOjE3MjYxNTcxODh9.zrT76H8pkLJYHwOBgiegDq1bGsPUHEOi7x6Yb4Ph0HM"

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await tokenValidation(token);
        setUser(userData)
        if(userData.role === 'alumn'){
          setVistaProfesor(false)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [token])
  
  console.log(user)
  


  return (
    <div>
      <NavBar />

    <div className="w-full mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Select value={claseSeleccionada.toString()} onValueChange={(value) => setClaseSeleccionada(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar clase" />
            </SelectTrigger>
            <SelectContent>
              {clases.map((clase) => (
                <SelectItem key={clase.id} value={clase.id.toString()}>
                  <GraduationCap className="mr-2 h-4 w-4 inline-block" />
                  {clase.nombre}
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
          <VistaProfesor claseId={claseSeleccionada} />
        ) : (
          <VistaAlumno 
          user = { user } 
          claseId = {claseSeleccionada}
          clases={clases}
          />
        )}
      </CardContent>
    </div>
</div>
  )
}

// Componente para la vista del profesor
function VistaProfesor({ claseId }: { claseId: number }) {
  const clase = clases.find(c => c.id === claseId)
  if (!clase) return <div>Clase no encontrada</div>
  
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
              const calificacion = alumno.calificaciones.find(c => c.tareaId === tarea.id)
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
  const clase = clases[claseId]

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
            const calificacion = alumno.calificaciones.find(c => c.tareaId === tarea.id)
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