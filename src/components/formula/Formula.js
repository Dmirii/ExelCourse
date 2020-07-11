import {ExcelComponent} from '@core/ExcelComponent';
export class Formula extends ExcelComponent {
  static className = 'exel__formula';
  constructor($root) {// передаем имена событий с вызовом родительского конструктора
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],

    });
  }

  toHTML() {
    return `
    <div class="exel__formula-info">Fx</div>
    <div class="exel__formula-input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log('Formula onInput:', event, this.$root);
  }

  onClick(event) {
    console.log('Formula onClick:', event.target);
  }
}
