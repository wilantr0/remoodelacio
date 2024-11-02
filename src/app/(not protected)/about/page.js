export const metadata = {
  title: 'Sobre Nosaltres',
}
export default function About () {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">Sobre Nosaltres</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Qui som?</h2>
            <p className="text-blue-900">
              Som un equip d&#39;estudiants de segon de Batxillerat que s&#39;han proposat crear una plataforma intuitiva i moderna per reemplaçar aplicacions amb tecnologies antigues.
            </p>
          </div>
          
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">La nostra missió</h2>
            <p className="text-blue-900">
              Facilitar l&#39;implementació de la tecnologia a les aules de grans i petits centres per a tenir una amplia gestió i control total sobre el contingut educatiu.
            </p>
          </div>
          
          <div className="bg-blue-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">El nostre impacte</h2>
            <p className="text-blue-900">
              A través de la nostra plataforma, volem facilitar l&#39;aprenentatge a milers d&#39;estudiants, permetent-los un accés més fàcil als recursos educatius. Així com, ens propossem agilitzar la transició tecnológica pels professors, de forma intuitiva i util.
            </p>
          </div>
        </div>
        
        <div className="mt-10 bg-blue-100 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Contacta&#39;ns</h2>
          <p className="text-blue-900">
            Si tens alguna pregunta o vols saber més sobre els nostres projectes, no dubtis a <a href="/contact" className="text-blue-700 underline">contactar-nos</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
