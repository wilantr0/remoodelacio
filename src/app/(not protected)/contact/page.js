'use client';
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.status === 200) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <section className="py-10 bg-blue-50">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">Contáctanos</h1>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-blue-100 p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-blue-800 font-semibold mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full p-2 rounded-md border-2 border-blue-300"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-blue-800 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-2 rounded-md border-2 border-blue-300"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-blue-800 font-semibold mb-2">Mensaje</label>
            <textarea
              name="message"
              id="message"
              className="w-full p-2 rounded-md border-2 border-blue-300"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
          >
            Enviar
          </button>

          {status === 'success' && <p className="mt-4 text-green-600">¡Mensaje enviado con éxito!</p>}
          {status === 'error' && <p className="mt-4 text-red-600">Error al enviar el mensaje. Inténtalo nuevamente.</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
