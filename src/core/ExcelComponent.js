import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners);// Вызываем родительский конструктор со списком событий для прослушки
    this.name =options.name;
  }

  // returns component template / Возращает шаблон компонента
  toHTML() {
    return '';
  }

  init() {// метод инит для навешывания слушателей
    this.initDOMListeners();
  }

  destroy() {// удаляем прослушку
    this.removeDOMListeners();
  }
}
