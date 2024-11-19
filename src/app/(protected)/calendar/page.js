"use client";
import { EllipsisVertical, X } from "lucide-react";
import ColorPicker from "@components/ColorPicker";
import React, { useEffect, useState, useCallback } from "react";


const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  today.setDate(today.getDate() - (dayOfWeek - 1));

  const firstDayOfWeek = new Date(today);
  const weekDates = [];
  for (let i = 0; i < 5; i++) {
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

const AgendaPage = () => {

  
  
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    dia: "",
    tipus: "Excursio",
    descripcio: "",
    color: "red-400",
  });
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [userId, setUserId] = useState(null);
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  
  
  const weekDates = getWeekDates();
  
  useEffect(() => {
    const loadUserData = async () => {
      const userRes = await fetch("/api/user", { credentials: "include" });
      const userData = await userRes.json();
      setUserId(userData.id);
    };
    loadUserData();
  }, []);

  useEffect(() => {
    if (userId && !eventsLoaded) {
      const loadEventsData = async () => {
        const eventsData = await fetchEvents(userId);
        
        // Extraemos las tareas de los datos de classroom y las añadimos como eventos
        const tasks = eventsData
        .filter((item) => item.classroom)
        .flatMap((item) =>
          item.classroom.assignments.map((assignment) => ({
              id: `${assignment.title}-${assignment.due_date}`,
              classroom_id: assignment.classroom_id,
              classroom_name: assignment.classroom.name,
              task_id: assignment.assignment_id,
              dia: assignment.due_date,
              tipus: "Tarea",
              descripcio: assignment.title,
              color: "lime-400",
            }))
          );
          
          console.log(tasks)
          
          setEvents([...eventsData.filter((e) => e.dia), ...tasks]);
          
          const upcoming = [...eventsData, ...tasks].filter(
          (event) => new Date(event.dia) > new Date(weekDates[4])
        );
        upcoming.sort((a, b) => new Date(a.dia) - new Date(b.dia));
        setUpcomingEvents(upcoming.slice(0, 5));
        setLoading(false);
        setEventsLoaded(true);
      };
      
      loadEventsData();
    }
  }, [userId, weekDates, eventsLoaded]);

  const handleCreateEvent = useCallback(async () => {
    const eventData = {
      dia: newEvent.dia,
      tipus: newEvent.tipus,
      descripcio: newEvent.descripcio,
      color: newEvent.color,
      userId,
    };
    
    const response = editingEventId
    ? await fetch(`/api/events?userId=${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    })
      : await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
        
        if (response.ok) {
          const updatedEvents = await fetchEvents(userId);
          setEvents([...updatedEvents]);
      setShowCreate(false);
      setEditingEventId(null);
      setNewEvent({ dia: "", tipus: "Excursio", descripcio: "", color: "red-400" });
    }
  }, [newEvent, userId, editingEventId]);
  
  const handleEditEvent = (event) => {
    setNewEvent({
      dia: event.dia,
      tipus: event.tipus,
      descripcio: event.descripcio,
      color: event.color,
    });
    setEditingEventId(event.id);
    setShowCreate(true);
  };
  
  const handleDeleteEvent = async (eventId) => {
    const response = await fetch(`/api/events/`, {
      method: "DELETE",
      body: JSON.stringify({ eventId }),
    });

    if (response.ok) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };
  
  const handleClickEvent = (eventId) => {
    setSelectedEventId(selectedEventId === eventId ? null : eventId);
  }
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-3">Agenda setmanal</h1>
      <button
        className="border rounded-full p-2 mb-4 bg-blue-500 text-white"
        onClick={() => setShowCreate(true)}
        >
        + Afegir esdeveniment
      </button>

      {loading ? (
        <p>Cargando eventos...</p>
      ) : (
        <>
          <div className="flex flex-row gap-4 mb-4">
            {weekDates.map((date, index) => (
              <div key={index} className="p-4 border rounded shadow-md w-1/5">
                <h2 className="text-xl font-semibold mb-2 user-select-none">
                  {date.toLocaleDateString("ca-ES", { weekday: "long" }).charAt(0).toUpperCase() +
                    date.toLocaleDateString("ca-ES", { weekday: "long" }).slice(1)}{" "}
                  - {date.toLocaleDateString()}
                </h2>
                <div className="flex flex-col gap-2">
                  {events.some(
                    (event) =>
                      new Date(event.dia).toLocaleDateString() === date.toLocaleDateString()
                  ) ? (
                    events
                    .filter(
                      (event) =>
                        new Date(event.dia).toLocaleDateString() === date.toLocaleDateString()
                    )
                    .map((event) => (
                      <div key={event.id} className={`relative w-9/12 p-2 rounded bg-${event.color}`} >
                          <EllipsisVertical className="absolute top-2 right-[0.5rem] cursor-pointer" onClick={() => handleClickEvent(event.id)} />
                          <p className="font-bold text-xl user-select-none">{event.tipus}</p>
                          <p className="text-lg user-select-none">{event.descripcio}</p>
                          {selectedEventId === event.id && (
                            <div className="flex flex-col gap-2 bg-white absolute top-2 right-8 p-2 rounded shadow-md">
                          <button
                            className="bg-orange-300 rounded p-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditEvent(event);
                            }}
                            >
                            Edit
                          </button>
                          <button
                            className="bg-rose-600 rounded p-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEvent(event.id);
                            }}
                            >
                            Delete
                          </button>
                        </div>
                      )}
                        </div>
                      ))
                    ) : (
                      <p className="user-select-none">No hi ha cap esdeveniment</p>
                    )}
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">Propers esdeveniments</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            {upcomingEvents.map((event) => (
              <a
              href={event.classroom_id ? `/c/${event.classroom_id}/t/${event.task_id}` : '#'}
              key={event.id}
              className={`p-4 border rounded shadow-md w-1/4 decoration-transparent text-black bg-${event.color}`}
              >
                <h3 className={`text-xl font-semibold mb-2 ${event.classroom_id ? 'underline' : ''}`}>{event.tipus}</h3>
                <p>{new Date(event.dia).toLocaleDateString()}</p>
                <p className="text-lg"><span className="font-bold text-xl">{event.classroom_name ? `${event.classroom_name} -` : '' }</span> {event.descripcio}</p>
              </a>
            ))}
            {upcomingEvents.length === 0 && <p>No hi ha propers esdeveniments.</p>}
          </div>
        </>
      )}

      {showCreate && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 w-1/4 rounded shadow-md">
            <button className="absolute -top-3 -right-3 bg-red-400 rounded-full p-2" onClick={() => setShowCreate(false)}>
              <X />
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {editingEventId ? "Edita l'esdeveniment" : "Crea un nou esdeveniment"}
            </h3>
            <input
              type="date"
              className="mb-4 p-2 border rounded w-full"
              value={newEvent.dia}
              onChange={(e) => setNewEvent({ ...newEvent, dia: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tipus"
              className="mb-4 p-2 border rounded w-full"
              value={newEvent.tipus}
              onChange={(e) => setNewEvent({ ...newEvent, tipus: e.target.value })}
              />
            <textarea
              placeholder="Descripció"
              className="mb-4 p-2 border rounded w-full"
              value={newEvent.descripcio}
              onChange={(e) => setNewEvent({ ...newEvent, descripcio: e.target.value })}
              />
            <ColorPicker
              color={newEvent.color}
              onChange={(color) => setNewEvent({ ...newEvent, color })}
            />
            <button
              onClick={handleCreateEvent}
              className="bg-blue-500 text-white rounded p-2 w-full"
              >
              {editingEventId ? "Editar" : "Crear"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaPage;
