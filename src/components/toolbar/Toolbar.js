import {ExcelComponent} from '@core/ExcelComponent';
export class Toolbar extends ExcelComponent {
  static className = 'exel__toolbar';
  constructor($root) {// передаем имена событий с вызовом родительского конструктора
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],

    });
  }

  toHTML() {
    return `
    <div class="exel__toolbar-button"><i class="material-icons">format_bold</i></div>
    <div class="exel__toolbar-button"><i class="material-icons">format_italic</i></div>
    <div class="exel__toolbar-button"><i class="material-icons">format_underlined</i></div>
    <div class="exel__toolbar-button"><i class="material-icons">format_align_left</i></div>
    <div class="exel__toolbar-button"><i class="material-icons">format_align_center</i></div>
    <div class="exel__toolbar-button"><i class="material-icons">format_align_right</i></div>
    `;
  }

  onClick(event) {
    console.log(event.target);
  }
}
