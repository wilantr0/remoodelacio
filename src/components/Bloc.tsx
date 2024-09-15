'use client'

import React, { useState } from 'react'
import { Button } from "@components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Switch } from "@components/ui/switch"
import { Label } from "@components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { User, Book, GraduationCap } from 'lucide-react'

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

export default function BlocCalificaciones() {
  const [vistaProfesor, setVistaProfesor] = useState(true)
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(alumnos[0].id)
  const [claseSeleccionada, setClaseSeleccionada] = useState(clases[0].id)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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
            <Switch
              id="vista-switch"
              checked={vistaProfesor}
              onCheckedChange={setVistaProfesor}
            />
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
            alumnoId={alumnoSeleccionado} 
            claseId={claseSeleccionada}
            onAlumnoChange={setAlumnoSeleccionado} 
          />
        )}
      </CardContent>
    </Card>
  )
}

function VistaProfesor({ claseId }: { claseId: number }) {
  const clase = clases.find(c => c.id === claseId)
  if (!clase) return <div>Clase no encontrada</div>

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">Alumno</TableHead>
            {clase.tareas.map((tarea) => (
              <TableHead key={tarea.id} className="min-w-[100px]">{tarea.nombre}</TableHead>
            ))}
            <TableHead className="min-w-[100px]">Promedio</TableHead>
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
    </div>
  )
}

function VistaAlumno({ alumnoId, claseId, onAlumnoChange }: { alumnoId: number, claseId: number, onAlumnoChange: (id: number) => void }) {
  const alumno = alumnos.find(a => a.id === alumnoId)
  const clase = clases.find(c => c.id === claseId)

  if (!alumno || !clase) return <div>Datos no encontrados</div>

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold">Calificaciones de {alumno.nombre}</h2>
        <Select value={alumnoId.toString()} onValueChange={(value) => onAlumnoChange(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar alumno" />
          </SelectTrigger>
          <SelectContent>
            {alumnos.map((a) => (
              <SelectItem key={a.id} value={a.id.toString()}>{a.nombre}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[120px]">Tarea</TableHead>
              <TableHead className="min-w-[100px]">Calificación</TableHead>
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
    </div>
  )
}