import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el =$(selector);
    this.components = options.components || [];
  }
  getRoot() {
    // получаем корневой элемент с заполнеными компонентами (таблица, хедер)
    const $root = $.create('div', 'exel');// создали див и в него положили

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
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
    this.$el.append(this.getRoot());
    this.components.forEach(component => component.init());
  }
}


// console.log(this.$el);
// Тестовое добавление HTML
// this.$el.insertAdjacentHTML('afterbegin', `<h1> Test</h1>`);
// const node = document.createElement('h1');
// node.textContent ='Test2';
// $root.textContent = 'Test';
//     $root.style.fontSize= '3rem';