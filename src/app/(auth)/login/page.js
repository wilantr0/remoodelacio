'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar la redirección por defecto

    // Crear los datos del formulario
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        // Login exitoso, maneja la respuesta aquí, por ejemplo, redirigir al dashboard
        console.log('Login exitoso', data);
        router.push('/dashboard')
      } else {
        // Mostrar error si hay algún problema con la autenticación
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error en el servidor', error);
      setErrorMessage(error);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-black to-blue-600 flex items-center justify-center p-4 absolute w-screen">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-blue-600">Iniciar sesión</CardTitle>
          <CardDescription className="text-gray-500">
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-black" htmlFor="email">Correo electrónico</Label>
              <Input
                className="text-black"
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
              />
            </div>
            <div className="space-y-2">
              <Label className="text-black" htmlFor="password">Contraseña</Label>
              <Input
                className="text-black"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
              />
            </div>
            {errorMessage && (
              <p className="text-red-500">{errorMessage}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="default" size="full" className="py-2">
              Iniciar sesión
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
