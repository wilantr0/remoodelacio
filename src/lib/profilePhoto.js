export function generateProfilePicture(name, size = 100) {
  // Obtener las iniciales
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  // Generar un color de fondo claro
  function getRandomLightColor() {
    const r = Math.floor(200 + Math.random() * 55); // Valores altos para r, g, b
    const g = Math.floor(200 + Math.random() * 55);
    const b = Math.floor(200 + Math.random() * 55);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Generar SVG
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 5}" fill="${getRandomLightColor()}" />
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

