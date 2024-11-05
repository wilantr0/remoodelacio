import Link from "next/link";

export function GeneralViewAlumne({ assignments, materials }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-4">Tasques i Materials</h2>
      <div className="mt-4">
        {assignments.length > 0? assignments.concat(materials).map((item) => (
          <div key={item.id} className="border p-4 mb-4">
            <h3 className="font-bold">{item.title}</h3>
            <p>{item.description}</p>
            {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Veure Material</a>}
          </div>
        )):'Aquesta classe està buida'}
      </div>
    </>
  );
}


export function TasquesViewAlumne({ assignments, classId }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-4">Tasques</h2>
      <div className="mt-4 space-y-4">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div key={assignment.assignment_id} className="p-4 border rounded-lg hover:bg-gray-100">
              <Link href={`/c/${classId}/t/${assignment.assignment_id}`} className="text-blue-500 font-medium text-lg hover:underline">
                
                  {assignment.title}
              </Link>
              {assignment.due_date && (
                <p className="text-sm text-gray-500">Due: {new Date(assignment.due_date).toLocaleDateString()}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tens tasques assignades.</p>
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