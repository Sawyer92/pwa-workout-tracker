export function HorizontalList(items, getTitle, getSub, onClick) {
  const wrap = document.createElement('div');
  wrap.className = 'h-list';
  items.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-title">${getTitle(item)}</div>
      <div class="card-sub">${getSub(item)}</div>
    `;
    card.addEventListener('click', () => onClick(item));
    wrap.appendChild(card);
  });
  return wrap;
}