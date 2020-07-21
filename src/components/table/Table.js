import {ExcelComponent} from '@core/ExcelComponent';
import {resizeHendler} from '@/components/table/table.resize.js';
import {shouldResize} from '@/components/table/table.function.js';
import {nextSelector} from '@/components/table/table.function.js';
import {matrix} from '@/components/table/table.function.js';
import {isCell} from '@/components/table/table.function.js';
import {createTeble} from '@/components/table/table.template.js';
import {TableSelection} from '@/components/table/tableSelection.js';
import {$} from '@core/dom';
import * as actions from '@/redux/actions.js'; // импортируем все как переменную
import {defaultStyles} from '@/constans';
import {parse} from '@core/parse';


// import {range} from '@core/utils';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {// передаем имена событий с вызовом родительского конструктора
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'click'],
      ...options,
    });
  }
  async resizeTable(event) {
    try {
      const data = await resizeHendler(this.$root, event);
      this.$dispatch(actions.tableResiz(data));// вызываем action creator
      // console.log('resize data:', data);
    } catch (e) {
      console.warn('error', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {// проверяем , что ресайзим col row
      this.resizeTable(event);
    } else if (isCell(event)) {// функция для проверки кликнули ли мы по ячеки
      const $target = $(event.target);
      if (event.shiftKey) {
        // создаем массив Dom элементов
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);// отображаем группу выделеных ячеек
      } else {
        this.selection.select($target);// отображаем одну ячейку
        this.$emit('table:select', $target); // ДОБАВИЛС САМ
      }
    }
  }

  onClick(event) {
    // console.log('Click', event.target);
    if (!event.shiftKey) {
      this.selectCell(this.selection.current);
    }
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
    super.init(); // вызываем метод инит родителя excelComponent
    // console.log(this.$root);
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.group=[];
    this.selectCell($cell);


    this.$on('formula:input', value => {// прослушка события
      this.selection.current
          .attr('data-value', value)
          .text(parse(value));
      // this.selection.current.text(value);// вызываем метод текст из DOM помещаем туда текст
      this.updateTextInStore(value);
    });

    // слушаем события от формулы
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,

      }));
    });

    // this.$subscribe(state =>{
    //   console.log('Table state:', state);
    // });
  }

  selectCell($cell) {// УБрали дублироваие кода при выделении ячайки
    this.selection.select($cell);// отрисовываем новую ячейку
    this.$emit('table:select', $cell);// имитем события в обзервер
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  toHTML() {// отрисовываем таблицу
    return createTeble(20, this.store.getState());// количество строк , получаем контент из стора
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(), // Получаем значение id для ячейки
      value: value, // Получаем значение(контент) дом элемента

    }));
  }
  onInput(event) {
    // this.$emit('table:input', $(event.target));
    this.updateTextInStore($(event.target).text());
  }
}


