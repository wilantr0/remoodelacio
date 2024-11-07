import { createCanvas } from '@napi-rs/canvas';

export default function generateProfilePicture(name, size = 100) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 5, 0, 2 * Math.PI);
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  ctx.fillStyle = randomColor;
  ctx.fill();

  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');
  ctx.font = `bold ${size * 0.4}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#333';
  ctx.fillText(initials, size / 2, size / 2);

  return canvas.toDataURL();
}
