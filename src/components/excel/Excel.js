import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';

export class Excel {
  constructor(selector, options) {
    this.$el =$(selector);
    this.components = options.components || [];
    this.store = options.store; // Это мой Redux
    this.emitter = new Emitter(); // Это экземпляр класса обзервер
    this.subscriber = new StoreSubscriber(this.store);// Это экземпляр класса для подписки на Store

    // console.log('Exel this:', this);
  }
  getRoot() {
    // получаем корневой элемент с заполнеными компонентами (таблица, хедер)
    const $root = $.create('div', 'exel');// создали див и в него положили

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

  render() {// добавляет содержимое в основной элемент Эксель (div app)
    this.$el.append(this.getRoot());// собираем DOM дерево
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach(component => component.init());// вызываем метод инит описаный ExelComponent
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
  }
}


// console.log(this.$el);
// Тестовое добавление HTML
// this.$el.insertAdjacentHTML('afterbegin', `<h1> Test</h1>`);
// const node = document.createElement('h1');
// node.textContent ='Test2';
// $root.textContent = 'Test';
//     $root.style.fontSize= '3rem';
