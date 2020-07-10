const CODES = {
  A: 65,
  Z: 90,
};


function toCell() {
  return `
    <div class="exel__table-row-data-cell"contenteditable></div>`;
}

function toColumn(el) {
  return `
    <div class="exel__table-row-data-column">${el}</div>`;
}

function createRow(index, content) {
  return `
  <div class="exel__table-row">
        <div class="exel__table-row-info">${index ? index : ''} </div>
        <div class="exel__table-row-data"> ${content}</div>
  </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

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
        .fill('')
        .map(toCell)
        .join('');
    rows.push(createRow(i+1, emptyCols));
  }


  return rows.join('');
}
