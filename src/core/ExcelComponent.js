import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners);// Вызываем родительский конструктор со списком событий для прослушки
    this.name =options.name;
    this.emitter = options.emitter;// это Эмитре от обзервера
    this.store = options.store;
    this.unsubscribers = [];
    this.subscribe = options.subscribe || []; // передаем подписки на конрктеные ключи
    // this.storeSub = null;
    // console.log(this.emmiter);
    // console.log(options);


    this.prepare();
  }


  // returns component template / Возращает шаблон компонента
  toHTML() {
    return '';
  }

  // МЕТОД для работы с REDUX
  $dispatch(action) {
    this.store.dispatch(action);
  }
  // метод для оптимизации поиска изменений подписки для StoreSubscribe
  isWathching(key) {
    return this.subscribe.includes(key);
  }

  // $subscribe(fn) {// подписка каждого компонента на низком уровне.
  //   // убрали после рефкторинга
  //   const storeSub = this.store.subscribe(fn);
  //   // sub.unsubscrib();
  // }
  // Метод будет реализован в дочерних классах
  // для понимания изменения стора/// хронилище всех состояний системы
  // сюда приходят измениния только по подписаным нами полям
  storeChanged() {}

  // уведомляем слушателей о событии
  $emit(event, ...args) {// это фасад для emit
    this.emitter.emit(event, ...args);
  }
  // подписываем функцию fn на события event
  $on(event, fn) {
    const unsub= this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
    // console.log(this.unsubscribers);
  }


  // настраиваем компонент до INIT
  prepare() {

  }
  // инициализация компонента
  init() {// метод инит для навешывания слушателей
    this.initDOMListeners();
  }
  // удаляем компонент
  destroy() {// удаляем прослушку
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
    // this.storeSub.unsubscribe();
  }
}
