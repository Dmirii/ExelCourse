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
