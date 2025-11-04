// Componente MaterialIcon per SVG Material Icons
export function MaterialIcon(name, size = 24, color = '#333') {
  const icons = {
    home: `<svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none'><path d='M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z' stroke='${color}' stroke-width='2' fill='none'/><rect x='8' y='13' width='8' height='8' rx='2' stroke='${color}' stroke-width='2' fill='none'/></svg>`,
    history: `<svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none'><circle cx='12' cy='12' r='10' stroke='${color}' stroke-width='2'/><path d='M12 6v6l4 2' stroke='${color}' stroke-width='2'/></svg>`,
    search: `<svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none'><circle cx='11' cy='11' r='7' stroke='${color}' stroke-width='2'/><line x1='16.5' y1='16.5' x2='21' y2='21' stroke='${color}' stroke-width='2'/></svg>`,
    person: `<svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none'><circle cx='12' cy='8' r='4' stroke='${color}' stroke-width='2'/><path d='M4 20c0-4 4-6 8-6s8 2 8 6' stroke='${color}' stroke-width='2'/></svg>`,
    edit: `<svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none'><path d='M4 20h4l10-10a2 2 0 0 0-2.83-2.83L5.17 17.17V20z' stroke='${color}' stroke-width='2'/></svg>`,
    star: `<svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='none'><polygon points='12,2 15,8.5 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 9,8.5' stroke='${color}' stroke-width='2' fill='none'/></svg>`,
    starFilled: `<svg width='${size}' height='${size}' viewBox='0 0 24 24' fill='${color}'><polygon points='12,2 15,8.5 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 9,8.5'/></svg>`
  };
  return icons[name] || '';
}