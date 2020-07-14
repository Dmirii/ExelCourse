// Создаем имена классов DomListeners
export function capitalize(str) {
  if (typeof str !=='string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// обрабатываем данные для масива id и DOm для выделения групыы ячеек Table
export function range(start, end) {
  if (start > end) { // если старт больше енда
    [end, start]=[start, end];// меняем местами начало и конец
  }
  // возвращаем массив длины от старта до энда
  return new Array(end-start+1)
      .fill('')// заполняем мосив пустотой
      .map((_, index) =>start+index);// возвращаем новый массив с колличеством элементов
}


