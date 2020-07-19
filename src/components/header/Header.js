import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constans';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'exel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }
  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
     <input type="text" class="exel__header-input" value="${title}">
    <div>
         <div class="exel__header-button"><i class="material-icons">delete</i></div>
         <div class="exel__header-button"><i class="material-icons">exit_to_app</i></div>
        
    </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
