import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
export class Formula extends ExcelComponent {
  static className = 'exel__formula';
  constructor($root, options) {// передаем имена событий с вызовом родительского конструктора
    super($root, {
      name: 'Formula',
      listeners: [
        'input',
        'keydown'],
      subscribe: ['currentText'],
      ...options, // разворачиваем опции с помощьью спред оператора

    });
  }

  toHTML() {
    return `
    <div class="exel__formula-info">Fx</div>
    <div id="formula" class="exel__formula-input" contenteditable spellcheck="false"></div>
    `;
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');// находим DIV инпут формулы

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text());// получаем и вставляем текст гетером.сетером text
    });

    // this.$on('table:input', $cell => {
    //   this.$formula.text($cell.text());
    // });
    // this.$subscribe(state =>{
    //   this.$formula.text(state.currentText);
    //   console.log('Formula:Subscribe', state.currentText);
    // });
  }
  storeChanged({currentText}) {
    this.$formula.text(currentText);
  }

  onInput(event) {
    this.$emit('formula:input', // используем фасад из ExelComponenta
        $(event.target)// ивент обернули в нашу обертку $
            .text()); // получили текст из формулы

    if (event ==='Enter') {
      console.log('enter');
    }
  }
  onKeydown(event) {
    const keys = ['Tab', 'Enter'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
