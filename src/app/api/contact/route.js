import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { name, email, message } = await req.json();

  try {
    // Enviar correo usando Resend
    await resend.emails.send({
      from: 'guilleballarin73@gmail.com', // Tu correo verificado en Resend
      to: 'williambalerin@gmail.com', // Dirección de correo donde quieres recibir el mensaje
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`,
    });

    return new Response(JSON.stringify({ status: 'success' }), { status: 200 });
  } catch (error) {
    console.error('Error al enviar el correo: ', error);
    return new Response(JSON.stringify({ status: 'error', message: error.message }), { status: 500 });
  }
}
