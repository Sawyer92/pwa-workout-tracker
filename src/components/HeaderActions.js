import { MaterialIcon } from './MaterialIcon.js';
export function HeaderActions({ onEdit, onFavorite, isFavorite }) {
  return `
    <div class='header-actions'>
      <button onclick='${onEdit}' title='Modifica'>${MaterialIcon('edit', 24)}</button>
      <button onclick='${onFavorite}' title='Preferito'>${isFavorite ? MaterialIcon('starFilled', 24, '#FFD700') : MaterialIcon('star', 24)}</button>
    </div>
  `;
}