import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';
import {updateDate} from '@/redux/actions.js';
import {preventDefault} from '@core/utils';

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store; // Это мой Redux
    this.emitter = new Emitter(); // Это экземпляр класса обзервер
    this.subscriber = new StoreSubscriber(this.store);// Это экземпляр класса для подписки на Store

    // console.log('excel this:', this);
  }
  getRoot() {
    // получаем корневой элемент с заполнеными компонентами (таблица, хедер)
    const $root = $.create('div', 'ecxel');// создали див и в него положили

    // параметры для передачи компонентам
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, componentOptions);
      // // / debug
      // if (component.name) {
      //   window['c'+component.name] = component;
      // }
      $el.html(component.toHTML());
      $root.append($el);
      return component;
      // каждый компонент добавляем в корневой див хедер, тулбар, таблица
      // $root.insertAdjacentHTML('beforeend', component.toHTML());
    });

    return $root;
  }

  init() {// добавляет содержимое в основной элемент Эксель (div app)
    // this.$el.append(this.getRoot());// собираем DOM дерево
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault);
    }
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach(component => component.init());// вызываем метод инит описаный excelComponent
  }

  destroy() {
    this.subscriber.unsubscribFromStore();
    this.components.forEach(component => component.destroy());
    document.removeEventListener('contextmenu', preventDefault);
  }
}


// console.log(this.$el);
// Тестовое добавление HTML
// this.$el.insertAdjacentHTML('afterbegin', `<h1> Test</h1>`);
// const node = document.createElement('h1');
// node.textContent ='Test2';
// $root.textContent = 'Test';
//     $root.style.fontSize= '3rem';
