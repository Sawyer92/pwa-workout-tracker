// Componente Modal riutilizzabile
export function Modal({ title, content, onConfirm, onCancel, confirmText = 'Salva', cancelText = 'Annulla' }) {
  return `
    <div class='modal-overlay'>
      <div class='modal'>
        <header><h3>${title}</h3></header>
        <div class='modal-content'>${content}</div>
        <footer>
          <button class='btn' onclick='${onCancel}'>${cancelText}</button>
          <button class='btn primary' onclick='${onConfirm}'>${confirmText}</button>
        </footer>
      </div>
    </div>
  `;
}