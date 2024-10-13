import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react'
import MainLayout from '../../layouts/LlogedLayout'

export default function Component () {
  const [currentDate, setCurrentDate] = useState(new Date())
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  const hours = Array.from({ length: 24 }, (_, i) => i)
  console.log(hours)

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const startDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()
  const daysToShowFromPrevMonth = (startDayOfMonth + 6) % 7

  const renderCalendarGrid = () => {
    return (
      <div className='grid grid-cols-8 h-full border-r'>
        {/* Time Column */}
        <div className='border-r '>
          <div className='mt-12'>

            {hours.map(hour => (
              <div key={hour} className='h-12 text-xs text-right pr-2 my-2 -mt-2'>
                {hour === 0 ? '00:00' : `${hour}:00`}
              </div>
            ))}
          </div>
        </div>

        {/* Days Columns */}
        {daysOfWeek.map(day => (
          <div key={day} className='border-r'>
            <div className='text-center py-2 font-semibold'>{day}</div>
            {hours.map(hour => (
              <div key={hour} className='h-12 border-t' />
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='flex flex-col h-screen bg-background text-foreground'>
      {/* Header */}
      <MainLayout title='Agenda' />

      <div className='flex flex-1 overflow-hidden'>
        {/* Sidebar */}
        <aside className='w-64 p-4 border-r overflow-y-auto'>
          <button className='w-full mb-4 p-2 rounded-md flex flex-row items-center justify-center border border-black font-semibold'>
            <Plus className='mr-2 h-4 w-4' /> Create
          </button>

          {/* Mini Calendar */}
          <div className='mb-4'>
            <div className='flex justify-between items-center mb-2'>
              <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              <div>
                <button variant='ghost' size='icon' onClick={handlePrevMonth}>
                  <ChevronLeft className='h-4 w-4' />
                </button>
                <button variant='ghost' size='icon' onClick={handleNextMonth}>
                  <ChevronRight className='h-4 w-4' />
                </button>
              </div>
            </div>
            <div className='grid grid-cols-7 gap-1 text-center'>
              {daysOfWeek.map(day => (
                <div key={day} className='text-xs font-semibold'>{day}</div>
              ))}
              {/* Days from previous month */}
              {Array.from({ length: daysToShowFromPrevMonth }, (_, i) => (
                <div key={`prev-${i}`} className='text-sm p-1 hover:bg-accent rounded-full cursor-default text-gray-400'>
                  {daysInPrevMonth - daysToShowFromPrevMonth + i + 1}
                </div>
              ))}
              {/* Days of the current month */}
              {Array.from({ length: daysInMonth }, (_, i) => (
                <div key={i} className='text-sm p-1 hover:bg-accent rounded-full cursor-pointer'>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Calendar List */}
          <div>
            <h2 className='font-semibold mb-2'>My calendars</h2>
            <ul>
              {['Personal', 'Work', 'Family'].map(calendar => (
                <li key={calendar} className='flex items-center mb-2'>
                  <input type='checkbox' className='mr-2' />
                  <span>{calendar}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className='flex-1 overflow-y-auto'>
          {/* Toolbar */}
          <div className='flex justify-between items-center p-4 border-b'>
            <div className='flex items-center space-x-4'>
              <button variant='ghost' onClick={() => setCurrentDate(new Date())}>Today</button>
              <button variant='ghost' size='icon'>
                <ChevronLeft className='h-5 w-5' onClick={handlePrevMonth} />
              </button>
              <button variant='ghost' size='icon'>
                <ChevronRight className='h-5 w-5' onClick={handleNextMonth} />
              </button>
              <h2 className='text-xl font-semibold'>
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
            </div>

          </div>

          {/* Calendar Grid */}
          {renderCalendarGrid()}
        </main>
      </div>
    </div>
  )
}
