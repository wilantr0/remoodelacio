import { useState } from 'react'

export default function CreateClass ({ sendDataToParent }) {
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setShow(!show)
    sendDataToParent(show)
  }

  return (
    <div className='flex justify-center items-center h-screen w-full absolute'>
      <div className='bg-transparent h-fit z-20 text-black flex items-center relative justify-center'>
        <button
          onClick={handleClick}
          className='absolute -top-3 -right-3 p-2 px-3 bg-slate-600 rounded-full text-white'
        >
          &#x2715;
        </button>
        <div className='bg-slate-400 p-4 rounded-md'>
          <form
            action='/api/classes'
            method='post'
            className='flex flex-col gap-10'
          >
            <label htmlFor='name' className='flex flex-col text-2xl gap-2'>
              Class Name
              <input
                type='text'
                name='name'
                id='name'
                className=' text-base shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </label>
            <button className='bg-white rounded-sm text-lg'>
              Create Class
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
