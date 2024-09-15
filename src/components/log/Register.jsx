'use client';
import { useState } from 'react';
import { FaRegEyeSlash, FaRegEye, FaFacebook, FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SignupFormSchema } from '@/utils/definitions';

export default function Register() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupFormSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };

  const handleSignUp = async (data) => {
    console.log(data);
    const { email, password, name, role } = data;

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      });

      const result = await res.json();
      if (res.ok) {
        console.log('Usuario registrado exitosamente:', result);
        router.push('/');
      } else {
        console.error('Error al registrar el usuario:', result.error);
      }
    } catch (error) {
      console.error('Error de red u otro error:', error);
    }
  };

  return (
    <section className="form-container sign-up-container">
      <form action={signup} onSubmit={handleSubmit(handleSignUp)}>
        <h1>Crear cuenta</h1>
        <div className="social-container">
          <a className="social-login" href="#">
            <FaFacebook />
          </a>
          <a className="social-login" href="#">
            <FaGoogle />
          </a>
        </div>
        <span>o utiliza tu mail</span>
        <input
          {...register('name')}
          className="input"
          type="text"
          placeholder="Nombre"
          />
          {errors.name && <p>{errors.name.message}</p>}
        
        <input
          {...register('email')}
          className="input"
          type="email"
          placeholder="E-mail"
          />
          {errors.email && <p>{errors.email.message}</p>}
        
        <div className="password-container" style={{ width: '100%' }}>
          <input
            {...register('password')}
            className="input"
            type={showPass ? 'text' : 'password'}
            placeholder="Contraseña"
            id='password'
            style={{ width: '100%' }}
            />
          <button
            type='button'
            id='showPassword'
            onClick={togglePasswordVisibility}
            aria-label={showPass ? 'Hide password' : 'Show password'}
            className='show-password-button'
            >
            {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        {errors.password && (
          <div>
            <p>{errors.password.message}</p>
          </div>
        )}
        </div>
        
        <select {...register('role')} className="input">
          <option value="teacher">Profesor/a</option>
          <option value="alumn">Alumno/a</option>
          <option value="super">Gestor/a</option>
        </select>

        {errors.role && <p>{errors.role.message}</p>}
        
        <input type="submit" value="Sign up" />
      </form>
    </section>
  );
}
