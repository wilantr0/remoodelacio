import { Montserrat } from 'next/font/google'

export const montserrat = Montserrat({ subsets: ['latin'] })

export default function CardSlider () {
  return (
    <div className='overlay-container'>
      <div className='overlay'>
        <div className='overlay-panel overlay-left'>
          <h1>Bienvenido de nuevo</h1>
          <p id='p'>Inicia sesión para acceder a todo tu contenido</p>
          <button className='ghost button' id='signIn'>
            Registrarme
          </button>
        </div>
        <div className='overlay-panel overlay-right'>
          <h1>Una nueva aventura?</h1>
          <p id='p'>Registrate para llegar a donde quieras</p>
          <button className='ghost button' id='logIn'>
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  )
}
