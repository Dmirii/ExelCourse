import {range} from '@core/utils';
// функции хелперы для таблицы

// функция проверяет что именно мы ресайзим колонку или строку
export function shouldResize(event) {
  return event.target.dataset.resize;
}


// функция для проверки кликнули ли мы по ячейке
export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

// для Table
export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  // создаем массив idшников
  return cols.reduce((acc, col) => {// выбираем колонку и создаем пустой массив
    rows.forEach(row => acc.push(`${row}:${col}`));// на каждой итерации добавляем строку
    return acc;// возвразщаем акумулятор для следующей итерации
  }, []);
}

// фунция для определения следующей ячеки при навигации кнопками
export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col = col-1 < MIN_VALUE ? MIN_VALUE : col-1;
      break;
    case 'ArrowUp':
      row = row-1 < MIN_VALUE ? MIN_VALUE : row-1;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
