"use client"; // Asegura que el componente es un Client Component
import { useState } from 'react';
import { FaRegEyeSlash, FaRegEye, FaFacebook, FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { estilos } from './style';
import { Montserrat } from 'next/font/google';
import { login } from '@/app/actions/auth'; // Supongo que esta función hace la llamada al backend para autenticar

export const montserrat = Montserrat({ subsets: ['latin'] });

export default function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit, // Usamos handleSubmit de react-hook-form para mejor manejo de formularios
  } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para mostrar errores del backend
  const [loading, setLoading] = useState(false); // Para mostrar un indicador de carga

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  // Función para manejar el login, que ahora maneja también la respuesta y errores
  const handleLogIn = async (data) => {
    setLoading(true); // Indicamos que está en proceso
    setErrorMessage(''); // Reseteamos cualquier mensaje de error previo

    try {
      // Llamada a la función de login que hará la autenticación en el backend
      const response = await login(data);

      if (response.ok) {
        // Redirigir o hacer algo si el login es exitoso
        window.location.href = '/dashboard'; // Ejemplo de redirección
      } else {
        // Mostrar mensaje de error si algo sale mal
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error de autenticación');
      }
    } catch (error) {
      // Capturar y mostrar cualquier error no manejado
      setErrorMessage('Error de servidor. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false); // Parar el indicador de carga
    }
  };

  return (
    <section className="form-container sign-in-container">
      <style>{estilos}</style>
      <form
        onSubmit={handleSubmit(handleLogIn)} // Usamos handleSubmit aquí
        className="bg-white flex justify-center items-center flex-col py-0 px-12 h-full text-center"
      >
        <h1>Iniciar sesión</h1>
        <div className="social-container">
          <a className="social-login" href="">
            <FaFacebook />
          </a>
          <a className="social-login" href="">
            <FaGoogle />
          </a>
        </div>
        <span>o utiliza tu mail</span>
        
        {/* Input de email */}
        <input
          {...register('email', { required: 'El correo es obligatorio' })} // Validación con mensaje
          className="input"
          type="email"
          placeholder="e-mail"
          style={{ width: '100%' }}
        />
        <span className="text-xs text-red-800">
          {errors.email?.message}
        </span>

        {/* Input de contraseña */}
        <div className="password-container" style={{ width: '100%' }}>
          <input
            {...register('password', { required: 'La contraseña es obligatoria', minLength: { value: 8, message: 'La contraseña debe tener mínimo 8 caracteres' } })}
            className="input"
            type={showPass ? 'text' : 'password'}
            placeholder="contraseña"
            value={password}
            id="password"
            onChange={handlePasswordChange}
            style={{ width: '100%' }}
          />
          <span className="show-password-checkbox">
            <button id="showPassword" onClick={togglePasswordVisibility}>
              <label htmlFor="showPassword">
                {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </label>
            </button>
          </span>
        </div>
        <span className="text-xs text-red-800">
          {errors.password?.message}
        </span>

        {/* Mensaje de error */}
        {errorMessage && (
          <span className="text-xs text-red-800 mb-4">
            {errorMessage}
          </span>
        )}

        {/* Botón de submit */}
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Cargando...' : 'Log in'}
        </button>
      </form>
    </section>
  );
}
