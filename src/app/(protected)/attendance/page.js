"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table"
import { Badge } from "@components/ui/badge"
import { Textarea } from "@components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { AlertCircle, Clock, X, MessageSquare, GraduationCap } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog"

// Componente principal
export default function AsistenciaPage() {
  const [clases, setClases] = useState([])
  const [claseSeleccionada, setClaseSeleccionada] = useState(null)
  const [alumnos, setAlumnos] = useState([])

  // Estado para el modal de observaciones y la observación temporal
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null)
  const [observacionTemp, setObservacionTemp] = useState('')

  // Cargar las clases al montar el componente
  useEffect(() => {
    async function fetchClases() {
      try {
        const res = await fetch('/api/clases')
        const data = await res.json()
        setClases(data)
      } catch (error) {
        console.error("Error al cargar las clases:", error)
      }
    }
    fetchClases()
  }, [])

  // Cargar los alumnos cuando se selecciona una clase
  useEffect(() => {
    if (claseSeleccionada) {
      console.log("Clase seleccionada:", claseSeleccionada); // Verifica que este valor sea el correcto
      async function fetchAlumnos() {
        try {
          const res = await fetch(`/api/clases/${claseSeleccionada}/students`);
          const data = await res.json();
          setAlumnos(data);
        } catch (error) {
          console.error("Error al cargar los alumnos:", error);
        }
      }
      fetchAlumnos();
    }
  }, [claseSeleccionada]);
  
  // Función para actualizar la asistencia de un alumno
  const actualizarAsistencia = (id, estado) => {
    setAlumnos(alumnos.map(alumno =>
      alumno.id === id
        ? {
            ...alumno,
            asistencia: estado,
            faltas: estado === 'falta' ? alumno.faltas + 1 : alumno.faltas
          }
        : alumno
    ))
  }
  

  // Función para abrir el modal de observaciones
  const abrirModalObservaciones = (alumno) => {
    setAlumnoSeleccionado(alumno)
    setObservacionTemp(alumno.observaciones)
  }

  const guardarCambios = async () => {
    try {
      const response = await fetch(`/api/clases/${claseSeleccionada}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alumnos),
      })
      if (!response.ok) throw new Error('Error al guardar la asistencia')
      alert('Asistencia guardada correctamente')
    } catch (error) {
      console.error('Error al guardar asistencia:', error)
      alert('Error al guardar la asistencia')
    }
  }

  // Función para guardar observaciones
  const guardarObservaciones = () => {
    if (alumnoSeleccionado) {
      setAlumnos(alumnos.map(alumno =>
        alumno.id === alumnoSeleccionado.id
          ? { ...alumno, observaciones: observacionTemp }
          : alumno
      ))
      setAlumnoSeleccionado(null)
    }
  }

  // Función para calcular el porcentaje de faltas
  const calcularPorcentajeFaltas = (faltas, totalClases) => {
    return ((faltas / totalClases) * 100).toFixed(1)
  }

  console.log(alumnos)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Control de Asistencia</h1>

      {/* Select para elegir una clase */}
      <Select onValueChange={(value) => setClaseSeleccionada(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona una clase" />
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

      {/* Mostrar la tabla de alumnos solo si hay una clase seleccionada */}
      {claseSeleccionada && alumnos.length > 0 && (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Asistencia</TableHead>
              <TableHead>Observaciones</TableHead>
              <TableHead>% Faltas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alumnos.map((alumno) => (
              <TableRow key={alumno.user.id}>
                <TableCell>{alumno.user.name}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={alumno.asistencia === 'presente' ? 'default' : 'outline'}
                      onClick={() => actualizarAsistencia(alumno.id, 'presente')}
                    >
                      Presente
                    </Button>
                    <Button
                      size="sm"
                      variant={alumno.asistencia === 'retraso' ? 'default' : 'outline'}
                      onClick={() => actualizarAsistencia(alumno.id, 'retraso')}
                    >
                      <Clock className="mr-1 h-4 w-4" />
                      Retraso
                    </Button>
                    <Button
                      size="sm"
                      variant={alumno.asistencia === 'falta' ? 'default' : 'outline'}
                      onClick={() => actualizarAsistencia(alumno.id, 'falta')}
                    >
                      <X className="mr-1 h-4 w-4" />
                      Falta
                    </Button>
                    <Button
                      size="sm"
                      variant={alumno.asistencia === 'incidencia' ? 'default' : 'outline'}
                      onClick={() => actualizarAsistencia(alumno.id, 'incidencia')}
                    >
                      <AlertCircle className="mr-1 h-4 w-4" />
                      Incidencia
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => abrirModalObservaciones(alumno)}
                      >
                        <MessageSquare className="mr-1 h-4 w-4" />
                        Observaciones
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Observaciones para {alumno.nombre}</DialogTitle>
                      </DialogHeader>
                      <Textarea
                        placeholder="Escribe tus observaciones aquí"
                        value={observacionTemp}
                        onChange={(e) => setObservacionTemp(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <Button onClick={guardarObservaciones}>Guardar Observaciones</Button>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <Badge variant={Number(calcularPorcentajeFaltas(alumno.faltas, alumno.totalClases)) > 20 ? "destructive" : "secondary"}>
                    {calcularPorcentajeFaltas(alumno.faltas, alumno.totalClases)}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      )}
      <Button className="mt-4" onClick={guardarCambios}>
        Guardar Todos los Cambios
      </Button>
    </div>
  )
}
