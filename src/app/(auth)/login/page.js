import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Twitter, Github } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-white">Iniciar sesión</CardTitle>
          <CardDescription className="text-blue-200">
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Correo electrónico</Label>
            <Input id="email" type="email" placeholder="tu@email.com" className="bg-white/20 border-white/30 text-white placeholder-blue-200" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Contraseña</Label>
            <Input id="password" type="password" className="bg-white/20 border-white/30 text-white" />
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Iniciar sesión</Button>
        </CardContent>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/30"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-white">O continúa con</span>
          </div>
        </div>
        <CardFooter className="flex justify-center space-x-4">
          <Button variant="outline" size="icon" className="bg-white/20 border-white/30 hover:bg-white/30">
            <Facebook className="h-4 w-4 text-blue-400" />
          </Button>
          <Button variant="outline" size="icon" className="bg-white/20 border-white/30 hover:bg-white/30">
            <Twitter className="h-4 w-4 text-blue-400" />
          </Button>
          <Button variant="outline" size="icon" className="bg-white/20 border-white/30 hover:bg-white/30">
            <Github className="h-4 w-4 text-white" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}