import {ExelStateComponent} from '@core/ExelStateComponent';
import {createToolbar} from './toolbar.tamplate';
import {$} from '@core/dom';
import {defaultStyles} from '@/constans';
export class Toolbar extends ExelStateComponent {
  static className = 'exel__toolbar';
  constructor($root, options) {// передаем имена событий с вызовом родительского конструктора
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  onClick(event) {
    const $target =$(event.target);

    if ($target.data.type ==='button') {
      console.log($target.data.value);
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
      // const key = Object.keys(value)[0];
      // this.setState({[key]: value[key]});
    }
  }
}
