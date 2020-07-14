import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'exel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }
  toHTML() {
    return `
     <input type="text" class="exel__header-input" value="New table">
    <div>
         <div class="exel__header-button"><i class="material-icons">delete</i></div>
         <div class="exel__header-button"><i class="material-icons">exit_to_app</i></div>
        
    </div>
    `;
  }
}
