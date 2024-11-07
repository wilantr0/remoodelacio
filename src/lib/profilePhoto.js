import { createCanvas } from 'canvas';

export default function generateProfilePicture(name, size = 100) {
  // Crear un canvas
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Dibujar un círculo
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 5, 0, 2 * Math.PI);
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  ctx.fillStyle = randomColor; // Color de fondo del círculo
  ctx.fill();

  // Obtener las iniciales de cada palabra
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  // Configurar el estilo de texto y dibujar las iniciales en el centro
  ctx.font = `bold ${size * 0.4}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#333'; // Color del texto
  ctx.fillText(initials, size / 2, size / 2);

  // Convertir el canvas a una imagen base64
  const dataURL = canvas.toDataURL();

  return dataURL;
}

// Ejemplo de uso
console.log(generateProfilePicture('Manolo'));
