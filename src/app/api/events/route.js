import { prisma } from "@/lib/prisma";

// Obtener eventos de un usuario (GET)
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new Response("userId no proporcionado", { status: 400 });
    }

    const events = await prisma.event.findMany({
      where: { userId: userId },
    });
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response("Error al obtener los eventos", { status: 500 });
  }
}

// Crear un evento nuevo (POST)
export async function POST(req) {
  try {
    const { dia, tipus, descripcio, userId, color } = await req.json();
    if (!userId || !tipus || !dia || !descripcio || !color) {
      return new Response("Faltan campos requeridos", { status: 400 });
    }
    const event = await prisma.event.create({
      data: {
        dia: new Date(dia), // Convertir la fecha a Date
        tipus,
        descripcio,
        userId,
        color, // Guardar el color
      },
    });
    return new Response(JSON.stringify(event), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Error al crear el evento", { status: 500 });
  }
}

// Actualizar un evento (PUT)
export async function PUT(req) {
  try {
    const { id, dia, tipus, descripcio, userId, color } = await req.json();
    if (!userId || !tipus || !dia || !descripcio || !id || !color) {
      return new Response("Faltan campos requeridos", { status: 400 });
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        dia: new Date(dia),
        tipus,
        descripcio,
        userId,
        color, // Actualizar el color
      },
    });
    return new Response(JSON.stringify(event), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response("Error al actualizar el evento", { status: 500 });
  }
}

// Eliminar un evento (DELETE)
export async function DELETE(req) {
  try {
    const { eventId } = await req.json();
    if (!eventId) {
      return new Response("id no proporcionados", { status: 400 });
    }

    const event = await prisma.event.delete({
      where: { id: eventId },
    });
    return new Response("Evento eliminado", { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response("Error al eliminar el evento", { status: 500 });
  }
}
