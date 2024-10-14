export default function About () {
  return (
    <section className="py-10 bg-blue-50">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">Sobre Nosotros</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">¿Quiénes Somos?</h2>
            <p className="text-blue-900">
              Somos un equipo de desarrolladores apasionados con la misión de mejorar la accesibilidad y la eficiencia en la educación a través de soluciones tecnológicas innovadoras.
            </p>
          </div>
          
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Nuestra Misión</h2>
            <p className="text-blue-900">
              Crear herramientas que permitan a estudiantes y profesores maximizar su potencial y hacer el aprendizaje más accesible para todos.
            </p>
          </div>
          
          <div className="bg-blue-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Nuestro Impacto</h2>
            <p className="text-blue-900">
              A través de nuestras plataformas, hemos facilitado el aprendizaje a miles de estudiantes, permitiéndoles un acceso más fácil a los recursos educativos.
            </p>
          </div>
        </div>
        
        <div className="mt-10 bg-blue-100 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Contáctanos</h2>
          <p className="text-blue-900">
            Si tienes alguna pregunta o deseas saber más sobre nuestros proyectos, no dudes en <a href="/contact" className="text-blue-700 underline">contactarnos</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
