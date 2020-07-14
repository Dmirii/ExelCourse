import {ExcelComponent} from '@core/ExcelComponent';
import {resizeHendler} from '@/components/table/table.resize.js';
import {shouldResize} from '@/components/table/table.function.js';
import {nextSelector} from '@/components/table/table.function.js';
import {matrix} from '@/components/table/table.function.js';
import {isCell} from '@/components/table/table.function.js';
import {createTeble} from '@/components/table/table.template.js';
import {TableSelection} from '@/components/table/tableSelection.js';
import {$} from '@core/dom';


// import {range} from '@core/utils';

export class Table extends ExcelComponent {
  static className = 'exel__table';
  constructor($root, options) {// передаем имена событий с вызовом родительского конструктора
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {// проверяем , что ресайзим col row
      resizeHendler(this.$root, event);
    } else if (isCell(event)) {// функция для проверки кликнули ли мы по ячеки
      const $target = $(event.target);
      if (event.shiftKey) {
        // создаем массив Dom элементов
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);// отображаем группу выделеных ячеек
      } else {
        this.selection.select($target);// отображаем одну ячейку
      }
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

  prepare() {// подготовительный метод
    this.selection = new TableSelection(); // создаем обект класса
  }

  // переписываем метод инит
  init() {
    super.init(); // вызываем метод инит родителя ExelComponent
    // console.log(this.$root);
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.group=[];
    this.selectCell($cell);

    this.$on('formula:input', text => {// прослушка события
      this.selection.current.text(text);
      // вызываем метод текст из DOM помещаем туда текст
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }
  selectCell($cell) {// УБрали дублироваие кода при выделении ячайки
    this.selection.select($cell);// отрисовываем новую ячейку
    this.$emit('table:select', $cell);// имитем события в обзервер
  }

  toHTML() {
    return createTeble();
  }

  onKeydown(event) {
    const keys =['Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'ArrowDown'];
    const {key} = event;

    if (keys.includes(key)&& !event.shiftKey) {
      event.preventDefault();
      const id =this.selection.current.id(true); // получаем координаты текущей ячейки из curent
      const $next = this.$root.find(nextSelector(key, id));// вызывем функцию для получения новых коордлинат
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}


