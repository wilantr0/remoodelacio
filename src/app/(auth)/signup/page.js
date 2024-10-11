import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


export default function RegisterPage() {
  return (
    <div className="min-h-full bg-gradient-to-br from-black to-blue-600 flex items-center justify-center p-4 absolute w-screen">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-blue-600">Crear cuenta</CardTitle>
          <CardDescription className="text-gray-500">
            Ingresa tus datos para registrarte y comenzar
          </CardDescription>
        </CardHeader>
        <form action="/api/signup" method="post">

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" placeholder="Juan Pérez" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" type="email" placeholder="tu@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Selecciona tu rol:</Label>
            <select className='input w-full p-2 border border-gray-300 rounded-md' name='role' id='role'>
              <option value='teacher'>Profesor/a</option>
              <option value='alumn'>Alumno/a</option>
              <option value='super'>Gestor/a</option>
            </select>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Registrarse</Button>
        </CardFooter>
        </form>
      </Card>
    </div>
  )
}