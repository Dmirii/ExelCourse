import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners =[]) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      // вызываем свой addEventListener
      if (!this[method]) {
        throw new Error(` Method ${method} is not implemented in ${this.name ||''} component`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);// вызываем метеод и привязываем контекст this
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      // вызываем свой removeEventListener
      this.$root.off(listener, this[method]);// вызываем метеод и привязываем контекст this
    });
  }
}


// / Pure function

function getMethodName(eventName) {
  return 'on'+ capitalize(eventName);
}


