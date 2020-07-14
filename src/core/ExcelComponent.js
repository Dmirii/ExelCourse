import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners);// Вызываем родительский конструктор со списком событий для прослушки
    this.name =options.name;// это Эмитре от обзервера
    this.emitter = options.emitter;
    this.unsubscribers = [];
    // console.log(this.emmiter);
    // console.log(options);


    this.prepare();
  }

  // настраиваем компонент до INIT
  prepare() {

  }

  // returns component template / Возращает шаблон компонента
  toHTML() {
    return '';
  }

  // уыедомляем слушателей о событии
  $emit(event, ...args) {// это фасад для emit
    this.emitter.emit(event, ...args);
  }
  // подписываем функцию fn на события event
  $on(event, fn) {
    const unsub= this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
    // console.log(this.unsubscribers);
  }

  // инициализация компонента
  init() {// метод инит для навешывания слушателей
    this.initDOMListeners();
  }

  // удаляем компонент
  destroy() {// удаляем прослушку
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
