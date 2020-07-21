
import {DEFAUIL_WIDTH} from '@/Redux/types';
import {DEFAUIL_HIEGTH} from '@/Redux/types';
import {defaultStyles} from '@/constans';
import {toInlineStyles} from '@core/utils';
import {parse} from '@core/parse';


// содержит функции-шаблоны для создания таблицы

const CODES = {
  A: 65,
  Z: 90,
};

// // Формируем ячеку
// function toCell(indexRow, indexCol) {
//   return `
//     <div data-col="${indexCol}" data-row="${indexRow}" class="excel__table-row-data-cell"contenteditable></div>`;
// }

function toCell(state, row) {// функция использует замыкание
  return function(_, col) {// возращаем функцию для передачи в нее COL
    const width = getWidth(state.colState, col);
    const id =`${row}:${col}`;
    const data = state.dataState[id];
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],

    });
    // console.log(styles);
    return `
        <div style=" ${styles}; width:${width}"
         data-type="cell" 
         data-id="${id}"
         data-col="${col}" 
         data-row="${row}"
         data-value="${data ||''}"
         class="excel__table-row-data-cell"
         contenteditable>${parse(data) || ''}</div>`;
  };// row мы передаем в основной функцие
}


// <div class ="excel__table-row-data-column-resize></div>
// формируем колонну(заглавная строка)
function toColumn({col, index, width}) {
  return `
    <div style="width:${width}" data-col="${index}" data-type="resizable" class="excel__table-row-data-column">
    ${col} <div data-resize="col" class="excel__table-row-data-column-resize"></div>
   
    </div>`;
}//

// создаем строку
function createRow(index, content, state) {
  // index это номер строки начинается с 1
  // content это содержимое ячеки ( для главной там будут буквы)
  // console.log(index, ' : ', state);
  const height = getHeight(state.rowState, index);
  const resizer = index ? '<div data-resize="row" class="excel__table-row-info-resize"></div>' : '';
  return `
  <div style="height:${height}" data-row="${index}" data-type="resizable" class="excel__table-row">
        <div class="excel__table-row-info">
           ${index ? index : ''} 
           ${resizer}
        </div>
        <div class="excel__table-row-data"> ${content}</div>
  </div>
  `;
}

// функция для создавния букв в первой строке
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

// получение значений ширины ячейки из стора или значение по умолачнию
function getWidth(state, index) {
  // console.log(state[index], ' W st', index, state);
  return (state[index] || DEFAUIL_WIDTH)+'px';
}

// получение значений ширины ячейки из стора или значение по умолачнию
function getHeight(state, index) {
  // console.log(index, 'h st', state);
  return (state[index] ||DEFAUIL_HIEGTH)+'px';
}


function withWidthFrom(state) {
  return function(col, index) {
    return {

      col, index, width: getWidth(state, index),
    };
  };
}

// функция создания таблицы  по умолчанию указаны строки
export function createTeble(rowsCownt = 20, state ={}) {
  const colsCount = CODES.Z - CODES.A+1;
  const rows =[];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(toColumn)
      .join('');

  // формируем главную строку
  rows.push(createRow(null, cols, state));// colState


  for (let row=0; row<rowsCownt; row++) {
    // Формируем строки таблицы
    const emptyCols = new Array(colsCount)
        .fill('')// заполняем массив ничем
        // .map(toCell)// добавляем ячеку
        .map(toCell(state, row))
        .join(''); // делаем все одной строкой
    rows.push(createRow(row+1, emptyCols, state));// первая строчка не нулевая
  }


  return rows.join('');// собираем все в единую строку
}
