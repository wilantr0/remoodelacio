export default function generateProfilePicture(name, size = 100) {
  // Obtener las iniciales
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  // Generar SVG
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 5}" fill="#${Math.floor(Math.random() * 16777215).toString(16)}" />
      <text x="50%" y="50%" font-size="${size * 0.4}" font-family="sans-serif" fill="#333" text-anchor="middle" dy=".3em">${initials}</text>
    </svg>
  `;

  // Convertir a base64
  const encodedSVG = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  const dataURL = `data:image/svg+xml,${encodedSVG}`;

  return dataURL;
}

// Ejemplo de uso
console.log(generateProfilePicture('Manolo Garcia'));
