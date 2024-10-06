import Layout from '@layouts/MainLayout.js'
import PlansCard from '../../../components/PlansCard.js'

export default function Planes () {
  return (
    <Layout title='Planes | Remoodelacio' id='planes'>
      <>
        <h1 className='text-center p-4 mb-2'>Planes</h1>

        <div className='flex flex-row justify-center gap-3'>
          <PlansCard
            planName='Gratis'
            price={0}
            services={['30 alumnes', '1 asignatura', '1 institut/profe']}
            notServices={[
              'Comunicació amb families',
              'Seguiment de assistencia'
            ]}
          />
          <PlansCard
            planName='Standard'
            price={49.99}
            services={['1', ' 2', '3']}
            notServices={['5', '6', '7']}
          />
          <PlansCard
            planName='Pro'
            price={129.0}
            services={['1', '2', '3']}
            notServices={['5', ' 6', '7']}
          />
        </div>
      </>
    </Layout>
  )
}
