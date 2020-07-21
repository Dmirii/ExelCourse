import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constans';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }
  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
     <input type="text" class="excel__header-input" value="${title}">
    <div>
         <div data-button="remove" class="excel__header-button"><i data-button="remove" class="material-icons">delete</i></div>
         <div data-button="exit" class="excel__header-button"><i data-button="exit" class="material-icons">exit_to_app</i></div>
        
    </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
  onClick(event) {
    const $target = $(event.target);
    if ($target.data.button === 'remove') {
      const decision = confirm('  Do you want to delete the table?');
      if (decision) {
        localStorage.removeItem('excel:'+ ActiveRoute.param);
        ActiveRoute.navigate('#');
      }
      console.log('');
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('#');
    }
  }
}
