// функции хелперы для таблицы

// функция проверяет что именно мы ресайзим колонку или строку
export function shouldResize(event) {
  return event.target.dataset.resize;
}
