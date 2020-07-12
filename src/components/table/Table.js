import {ExcelComponent} from '@core/ExcelComponent';
import {resizeHendler} from '@/components/table/table.resize.js';
import {shouldResize} from '@/components/table/table.function.js';
import {createTeble} from '@/components/table/table.template.js';

export class Table extends ExcelComponent {
  static className = 'exel__table';
  constructor($root) {// передаем имена событий с вызовом родительского конструктора
    super($root, {
      name: 'Formula',
      listeners: ['mousedown'],
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {// проверяем , что ресайзим col row
      resizeHendler(this.$root, event);
    }
  }

  onClick(event) {
    // console.log('Click', event.target);
  }

  onMousemove(event) {
    // console.log('Move', event.target);
  }
  onMouseup(event) {
    // console.log('Up', event.target);
  }

  toHTML() {
    return createTeble();
  }
}
