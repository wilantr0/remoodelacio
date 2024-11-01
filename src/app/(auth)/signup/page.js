'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Registro exitoso', data);
        router.push('/dashboard');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error en el servidor', error);
      setErrorMessage(error.message || 'Error de servidor');
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-black to-blue-600 flex items-center justify-center p-4 absolute w-screen">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-blue-600">Crear compte</CardTitle>
          <CardDescription className="text-gray-500">
            Ingresa les teves dades per a registrar-te i començar
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-black" htmlFor="name">Nom complet</Label>
              <Input
                className="text-black"
                id="name"
                name="name"
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-black" htmlFor="email">Correu electrònic</Label>
              <Input
                className="text-black"
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-black" htmlFor="password">Contrasenya</Label>
              <div className="relative">
                <Input
                  className="text-black pr-10"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-black" htmlFor="role">Selecciona el teu rol</Label>
              <select
                className="text-black input w-full p-2 border border-gray-300 rounded-md"
                name="role"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="teacher">Professor/a</option>
                <option value="alumn">Alumne/a</option>
                <option value="super">Gestor/a</option>
              </select>
            </div>
            {errorMessage && (
              <p className="text-red-500">{errorMessage}</p>
            )}
          </CardContent>
          <CardFooter className='flex flex-col gap-2'>
            <Button type="submit" variant="default" size="full" className="py-2">
              Registrar-se
            </Button>
            <div className='text-black'>Ja ets usuari? <a className='text-blue-600 decoration-blue-600 underline' href="/login">Inicia la sessió</a></div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
