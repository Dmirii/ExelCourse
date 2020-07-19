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

// функция для Redux
export function storage(key, data =null) {
  if (!data) {// gettter
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

// функция для StoreSubscribe
// сравнивает занчение ключа стора с предыдущи состоянием
export function isEqual(a, b) {
  if (typeof a ==='object' && typeof b ==='object') {
    // упрощаем проверку обекта
    // провтос приводим обекты с троке и ссравниваем их
    // возвращаем результат сравнения
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

// функция для TableTemplate
//

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, g =>`-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}:${styles[key]}`)
      .join(';');
}


// аналог дебаунс для предотвращения спама в бд
export function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    const later = () =>{
      clearTimeout(timeout);
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args);
      // fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

