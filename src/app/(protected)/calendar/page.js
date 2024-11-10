"use client";
import { X } from "lucide-react";
import ColorPicker from "@components/ColorPicker";
import React, { useEffect, useState, useCallback } from "react";

// Helper function to get the current week's dates, considering Monday as the start of the week
const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0-6 (Sunday-Saturday)

  // Adjust to the start of the current week (Monday)
  today.setDate(today.getDate() - (dayOfWeek - 1)); // Adjust to last Monday

  const firstDayOfWeek = new Date(today); // Get Monday of the current week

  const weekDates = [];
  for (let i = 0; i < 5; i++) { // Only Monday to Friday (5 days)
    const date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + i);
    weekDates.push(date);
  }

  return weekDates;
};

const fetchEvents = async (userId) => {
  const response = await fetch(`/api/events?userId=${userId}`);
  const data = await response.json();
  return data;
};

const createEvent = async ({ eventData, userId }) => {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...eventData, userId }),
  });
  const data = await response.json();
  return data;
};

const updateEvent = async ({ eventId, eventData }) => {
  const response = await fetch(`/api/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  const data = await response.json();
  return data;
};

const deleteEvent = async (eventId) => {
  await fetch(`/api/events`, {
    method: "DELETE",
    body: JSON.stringify({ eventId }),
  });
};

const AgendaPage = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    dia: "",
    tipus: "Excursio", // Valor por defecto
    descripcio: "",
    color: "#ff0000", // Valor por defecto (rojo)
  });
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [userId, setUserId] = useState(null);
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null); // Track which event is being edited

  const weekDates = getWeekDates(); // Get the current week's dates (Monday to Friday)

  useEffect(() => {
    const loadUserData = async () => {
      const userRes = await fetch("/api/user", { credentials: "include" });
      const userData = await userRes.json();
      setUserId(userData.id); // Guardamos el userId
    };

    loadUserData();
  }, []);

  useEffect(() => {
    if (userId && !eventsLoaded) {
      const loadEventsData = async () => {
        const eventsData = await fetchEvents(userId);
        setEvents(eventsData);

        const upcoming = eventsData.filter((event) => new Date(event.dia) > new Date(weekDates[4]));
        upcoming.sort((a, b) => new Date(a.dia) - new Date(b.dia)); // Sort by date
        setUpcomingEvents(upcoming.slice(0, 5)); // Only take the next 5
        setLoading(false);
        setEventsLoaded(true); // Mark that events have been loaded
      };

      loadEventsData();
    }
  }, [userId, weekDates, eventsLoaded]);

  const handleCreateEvent = useCallback(async () => {
    if (!userId) return; // Prevent action if no userId

    if (editingEventId) {
      // If we're editing an event, update it
      const updatedEvent = await updateEvent({ eventId: editingEventId, eventData: newEvent });
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
      );
      setEditingEventId(null); // Reset editing mode
    } else {
      // If it's a new event, create it
      const createdEvent = await createEvent({ eventData: newEvent, userId });
      setEvents((prevEvents) => [...prevEvents, createdEvent]);
    }

    setNewEvent({ dia: "", tipus: "Excursio", descripcio: "", color: "#ff0000" }); // Reset form
  }, [newEvent, userId, editingEventId]);

  const handleEditEvent = (event) => {
    setNewEvent({
      dia: event.dia,
      tipus: event.tipus,
      descripcio: event.descripcio,
      color: event.color,
    });
    setEditingEventId(event.id); // Set the event being edited
    setShowCreate(true); // Show the form to edit
  };

  const handleDeleteEvent = async (eventId) => {
    await deleteEvent(eventId);

    // Remove event from the state
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-3">Agenda setmanal</h1>
      <button className="border rounded-full p-2 mb-4 bg-blue-500 text-white" onClick={() => setShowCreate(true)}>
        + Afegir esdeveniment
      </button>

      {loading ? (
        <p>Cargando eventos...</p>
      ) : (
        <>
          {/* Mostrar los días de la semana actual (lunes a viernes) */}
          <div className="flex flex-col gap-4 mb-4">
            {weekDates.map((date, index) => (
              <div key={index} className="p-4 border rounded shadow-md w-1/5">
                <h2 className="text-xl font-semibold mb-2">
                  {date.toLocaleDateString("ca-ES", { weekday: "long" }).charAt(0).toUpperCase() +
                    date.toLocaleDateString("ca-ES", { weekday: "long" }).slice(1)}{" "}
                  - {date.toLocaleDateString()} {/* Mostrar la fecha de manera legible */}
                </h2>
                <div className="flex flex-row gap-2">
                  {/* Mostrar los eventos del día, si los hay */}
                  {events.some((event) => new Date(event.dia).toLocaleDateString() === date.toLocaleDateString()) ? (
                    events
                      .filter((event) => new Date(event.dia).toLocaleDateString() === date.toLocaleDateString())
                      .map((event) => (
                        <div key={event.id} className={`p-2 rounded bg-${event.color}`}>
                          <p className="font-bold text-xl">{event.tipus}</p>
                          <p className="text-lg">{event.descripcio}</p>

                          {/* Botón para editar */}
                          <button
                            className="bg-yellow-500 p-2 rounded text-white"
                            onClick={() => handleEditEvent(event)}
                          >
                            Editar
                          </button>

                          {/* Botón para eliminar */}
                          <button
                            className="bg-red-500 p-2 rounded text-white"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      ))
                  ) : (
                    <p>No hi ha cap esdeveniment</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mostrar los próximos 5 eventos en tarjetas en fila */}
          <h2 className="text-2xl font-bold mb-4">Propers esdeveniments</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className={`p-4 border rounded shadow-md w-1/4 bg-${event.color}`}>
                <h3 className="text-xl font-semibold mb-2">{event.tipus}</h3>
                <p>{new Date(event.dia).toLocaleDateString()}</p>
                <p>{event.descripcio}</p>

                {/* Botones para editar y eliminar */}
                <button
                  className="bg-yellow-500 p-2 rounded text-white"
                  onClick={() => handleEditEvent(event)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 p-2 rounded text-white"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Eliminar
                </button>
              </div>
            ))}
            {upcomingEvents.length === 0 && <p>No hay próximos eventos.</p>}
          </div>
        </>
      )}

      {/* Formulario para agregar o editar un evento */}
      {showCreate ? (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/2">
            <button
              className="absolute top-2 right-2"
              onClick={() => {
                setShowCreate(false);
                setEditingEventId(null); // Reset on close
              }}
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-4">{editingEventId ? "Editar Evento" : "Agregar Evento"}</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateEvent();
                setShowCreate(false);
              }}
            >
              <div>
                <label className="block text-sm font-medium">Fecha</label>
                <input
                  type="date"
                  value={newEvent.dia}
                  onChange={(e) => setNewEvent({ ...newEvent, dia: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Tipo</label>
                <input
                  type="text"
                  value={newEvent.tipus}
                  onChange={(e) => setNewEvent({ ...newEvent, tipus: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Descripción</label>
                <textarea
                  value={newEvent.descripcio}
                  onChange={(e) => setNewEvent({ ...newEvent, descripcio: e.target.value })}
                  required
                />
              </div>

              <div>
                <ColorPicker color={newEvent.color} onColorChange={(color) => setNewEvent({ ...newEvent, color })} />
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  {editingEventId ? "Actualizar Evento" : "Agregar Evento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AgendaPage;
