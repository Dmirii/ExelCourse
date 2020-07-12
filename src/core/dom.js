// создаем обертку как в jQuery
// для добавления своих методово

class Dom {
  constructor(selector) {
    // #app
    this.$el = typeof selector ==='string' ? document.querySelector(selector) : selector;
  }

  html(html) {
    // setter если строчка есть то меняем this
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    // в любом случяае возращем getter
    return this.$el.outerHTML.trim();
  }

  clear() {// очищаем html
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node =node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  // доступ к дата сет через обертку ГЕТТЕР
  get data() {
    return this.$el.dataset;
  }

  // аналог closest
  closest(selector) {
    return $(this.$el.closest(selector));
  }
  // получаем координаты Dom элемента ( используем для ресайза)
  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  // queryelectorAll
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  // доступ к style
  css(styles ={}) {
    // for ( const key in styles) {не используем из за еребора свойств прототипа
    //   if (styles.hasOwnProperty(key)) {
    //     console.log('key', key);
    //     console.log(styles[key]);
    //   }
    // }
    Object
        .keys(styles)
        .forEach( key => {
          this.$el.style[key]=styles[key];
        });
    // return this.$el.style.styles;
  }

  // мой AddEventListener
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  // мой removeEventListener
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes ='') => {
  const el =document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el); // создаем элемент и оборачивем ее в  DOM
};
