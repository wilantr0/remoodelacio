import EntregarTarea from "@components/EntregarTarea";

export function GeneralViewAlumne({ assignments, materials }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-4">Tasques i Materials</h2>
      <div className="mt-4">
        {assignments.concat(materials).map((item) => (
          <div key={item.id} className="border p-4 mb-4">
            <h3 className="font-bold">{item.title}</h3>
            <p>{item.description}</p>
            {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Veure Material</a>}
          </div>
        ))}
      </div>
    </>
  );
}

export function TasquesViewAlumne({ assignments }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-4">Tasques</h2>
      <div className="mt-4">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <EntregarTarea key={assignment.id} assignment={assignment} />
          ))
        ) : (
          <p>No tens tasques assignades.</p>
        )}
      </div>
    </>
  );
}

export function NotesView({ assignments }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-4">Les Teves Notes</h2>
      <div className="mt-4">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="border p-4 mb-4">
            <h3 className="font-bold">{assignment.title}</h3>
            <p>Nota: {assignment.grade ?? "No avaluat"}</p>
          </div>
        ))}
      </div>
    </>
  );
}