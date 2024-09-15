// components/Calendar.js

const Calendar = () => {
  const month = new Date()
  const months = {
    0: ['Enero', 31],
    1: ['Febrero', 28],
    2: ['Marzo', 31],
    3: ['Abril', 30],
    4: ['Mayo', 31],
    5: ['Junio', 30],
    6: ['Julio', 31],
    7: ['Agosto', 31],
    8: ['Septiembre', 30],
    9: ['Octubre', 31],
    10: ['Noviembre', 30],
    11: ['Diciembre', 31]
  }
  const [mes, dias] = months[month.getMonth()]
  console.log(mes)
  console.log(dias)
  const daysInMonth = Array.from({ length: dias }, (_, i) => i + 1)

  return (
    <div className='absolute w-full h-full flex items-center justify-end flex-col'>
      <div className='grid grid-cols-7 gap-0 w-2/3 h-screen'>
        {daysInMonth.map(day => (
          <a href={`/tasks/${day}`} key={day} className='border border-black decoration-transparent'>
            <span className=' text-black font-bold text-center transition'>
              {day}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Calendar
