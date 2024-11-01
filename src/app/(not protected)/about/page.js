export default function About () {
  return (
    <section className="py-10 bg-blue-50">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">Sobre Nosotros</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">¿Quiénes Somos?</h2>
            <p className="text-blue-900">
              Som un equip de desenvolupadors apassionats amb la missió de millorar l&#39;accessibilitat i l&#39;eficiència en l&#39;educació a través de solucions tecnològiques innovadores.
            </p>
          </div>
          
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Nuestra Misión</h2>
            <p className="text-blue-900">
            Crear eines que permetin als estudiants i professors maximitzar el seu potencial i fer l&#39;aprenentatge més accessible per a tothom.
            </p>
          </div>
          
          <div className="bg-blue-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Nuestro Impacto</h2>
            <p className="text-blue-900">
              A través de les nostres plataformes, hem facilitat l&#39;aprenentatge a milers d&#39;estudiants, permetent-los un accés més fàcil als recursos educatius.
            </p>
          </div>
        </div>
        
        <div className="mt-10 bg-blue-100 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Contáctanos</h2>
          <p className="text-blue-900">
            Si tens alguna pregunta o vols saber més sobre els nostres projectes, no dubtis a <a href="/contact" className="text-blue-700 underline">contactar-nos</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
