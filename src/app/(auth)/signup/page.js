import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


export default function RegisterPage() {
  return (
    <div className="min-h-full bg-gradient-to-br from-black to-blue-600 flex items-center justify-center p-4 absolute w-screen">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-blue-600">Crear compte</CardTitle>
          <CardDescription className="text-gray-500">
            Ingresa les teves dades per a registrar-te i començar
          </CardDescription>
        </CardHeader>
        <form action="/api/signup" method="post">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-black" htmlFor="name">Nom complet</Label>
              <Input className="text-black" id="name" name="name" placeholder="Juan Pérez" />
            </div>
            <div className="space-y-2">
              <Label className="text-black" htmlFor="email">Correu electrònic</Label>
              <Input className="text-black" id="email" name="email" type="email" placeholder="tu@email.com" />
            </div>
            <div className="space-y-2">
              <Label className="text-black" htmlFor="password">Contrasenya</Label>
              <Input className="text-black" id="password" name="password" type="password" />
            </div>
            <div className="space-y-2">
              <Label className="text-black" htmlFor="role">Selecciona el teu rol</Label>
              <select className="text-black input w-full p-2 border border-gray-300 rounded-md" name="role" id="role">
                <option value="teacher">Professor/a</option>
                <option value="alumn">Alumne/a</option>
                <option value="super">Gestor/a</option>
              </select>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="default" size="full" className="py-2">Registrar-se</Button>
          </CardFooter>
        </form>

      </Card>
    </div>
  )
}