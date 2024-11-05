export default function EntregarTarea ({ docs, isAssigned }) {
  return (
    <div class='flex flex-col items-start border-2 shadow-2xl p-4 gap-3 rounded-lg'>
      <section class='flex flex-col justify-between w-full items-center'>
        <span class='flex flex-row justify-between w-full items-center'>
          <h2>Tu trabajo</h2>
          <h6>{isAssigned ? 'Asignada' : 'Entregada'}</h6>
        </span>
        <hr class='h-1 w-full' />
      </section>
      {docs?.map(e => {
        return (
          <a
            key={e}
            href={e.id}
            target='_blank'
            rel='noopener noreferrer'
            class='decoration-transparent text-black w-full'
          >
            <span class='flex flex-col justify-center gap-1 border-[1px] p-2 border-black rounded-md text-lg'>
              {e.name}
              <p class='text-xs'>{e.type}</p>
            </span>
          </a>
        );
      })}

      <div class='flex flex-col gap-2 w-full'>
        <button class='px-2 py-1 rounded-md bg-blue-600 text-white w-full'>
          Añade
        </button>
        <button class='border-2 border-blue-600 px-2 py-1 rounded-md text-blue-600 w-full'>
          Entrega
        </button>
      </div>
    </div>
  );
}
