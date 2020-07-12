// содержит функции-шаблоны для создания таблицы

const CODES = {
  A: 65,
  Z: 90,
};

// Формируем ячеку
function toCell(_, indexCol) {
  return `
    <div data-col="${indexCol}" class="exel__table-row-data-cell"contenteditable></div>`;
}
// <div class ="exel__table-row-data-column-resize></div>
// формируем колонну(заглавная строка)
function toColumn(el, index) {
  return `
    <div data-col="${index}" data-type="resizable" class="exel__table-row-data-column">
    ${el} <div data-resize="col" class="exel__table-row-data-column-resize"></div>
   
    </div>`;
}

// создаем строку
function createRow(index, content) {
  // index это номер строки начинается с 1
  // content это содержимое ячеки ( для главной там будут буквы)
  const resizer = index ? '<div data-resize="row" class="exel__table-row-info-resize"></div>' : '';
  return `
  <div data-type="resizable" class="exel__table-row">
        <div class="exel__table-row-info">
           ${index ? index : ''} 
           ${resizer}
        </div>
        <div class="exel__table-row-data"> ${content}</div>
  </div>
  `;
}

// функция для создавния букв в первой строке
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}


// функция создания таблицы  по умолчанию указаны строки
export function createTeble(rowsCownt = 20) {
  const colsCount = CODES.Z - CODES.A+1;
  const rows =[];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  // формируем главную строку
  rows.push(createRow(null, cols));


  for (let i=0; i<rowsCownt; i++) {
    // Формируем строки таблицы
    const emptyCols = new Array(colsCount)
        .fill('')// заполняем массив ничем
        .map(toCell)// добавляем ячеку
        .join(''); // делаем все одной строкой
    rows.push(createRow(i+1, emptyCols));// первая строчка не нулевая
  }


  return rows.join('');// собираем все в единую строку
}
