'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        console.log('Login exitoso', data);
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
          <CardTitle className="text-3xl font-bold tracking-tight text-blue-600">Iniciar sessió</CardTitle>
          <CardDescription className="text-gray-500">
            Ingressa les teves dades per a accedir al teu compte
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
                  className="text-black pr-10" // Añadimos espacio para el botón de mostrar/ocultar
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
            {errorMessage && (
              <p className="text-red-500">{errorMessage}</p>
            )}
          </CardContent>
          <CardFooter className='flex flex-col gap-2'>
            <Button type="submit" variant="default" size="full" className="py-2">
              Iniciar sessió
            </Button>
            <div className='text-black'>Encara no tens compte? <a className='text-blue-600 decoration-blue-600 underline' href="/signup">Registra&#39;t</a></div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
