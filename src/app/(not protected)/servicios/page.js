import { CheckCircle, Calendar, ClipboardCheck, FileText, Presentation } from 'lucide-react'
export const metadata = {
  title: 'Serveis',
}
export default function ServicesPage() {
  return (
    <div className='flex flex-col justify-center min-h-screen'>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-white'>
          <div className='container px-4 md:px-6 flex flex-col gap-3 '>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center text-black mb-12'>Serveis que oferim</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
              {/* Control d'Assistència */}
              <div className='border border-gray-700 rounded-lg flex flex-col items-center p-6'>
                <CheckCircle className='h-12 w-12 mb-4 text-blue-600' />
                <h3 className='text-lg font-bold mb-2 text-black'>Control d&#39;Assistència</h3>
                <p className='text-center text-sm text-gray-500'>
                  Permet fer un seguiment precís de l&#39;assistència dels estudiants. Els professors poden marcar l&#39;assistència diària, identificar patrons de presència i absència, i generar informes útils.
                </p>
              </div>
              {/* Calendari i Agenda */}
              <div className='border border-gray-700 rounded-lg flex flex-col items-center p-6'>
                <Calendar className='h-12 w-12 mb-4 text-blue-600' />
                <h3 className='text-lg font-bold mb-2 text-black'>Calendari i Agenda</h3>
                <p className='text-center text-sm text-gray-500'>
                  Gestiona fàcilment horaris, esdeveniments i recordatoris. La funcionalitat d&#39;agenda permet una visió clara de les activitats diàries i ajuda a mantenir organitzats tant professors com estudiants.
                </p>
              </div>
              {/* Gestió de Classes i Tasques */}
              <div className='border border-gray-700 rounded-lg flex flex-col items-center p-6'>
                <ClipboardCheck className='h-12 w-12 mb-4 text-blue-600' />
                <h3 className='text-lg font-bold mb-2 text-black'>Gestió de Classes i Tasques</h3>
                <p className='text-center text-sm text-gray-500'>
                  Facilita l&#39;assignació de tasques i projectes per als estudiants. Els professors poden crear, distribuir i supervisar tasques, mentre que els estudiants poden lliurar-les i rebre retroalimentació.
                </p>
              </div>
              {/* Bloc de Notes */}
              <div className='border border-gray-700 rounded-lg flex flex-col items-center p-6'>
                <FileText className='h-12 w-12 mb-4 text-blue-600' />
                <h3 className='text-lg font-bold mb-2 text-black'>Bloc de Notes</h3>
                <p className='text-center text-sm text-gray-500'>
                  Una eina pràctica perquè els estudiants i professors puguin prendre notes. El bloc de notes ofereix una manera senzilla d&#39;organitzar idees, apunts de classes, i reflexions personals.
                </p>
              </div>
              
            </div>
            <div className='border border-gray-700 rounded-lg flex flex-col items-center p-6'>
                <Presentation className='h-12 w-12 mb-4 text-blue-600' />
                <h3 className='text-lg font-bold mb-2 text-black'>Formacions a centres</h3>
                <p className='text-center text-sm text-gray-500'>
                A més d&#39;oferir aquestes eines, també organitzem formacions als centres per ajudar els professors a treure el màxim profit de la nostra plataforma. Ens assegurem que el personal docent estigui capacitat per utilitzar totes les funcionalitats que els facilitaran la gestió de les classes i l&#39;anàlisi de les dades.
                </p>
              </div>
          </div>
        </section>
      </main>
    </div>
  )
}
