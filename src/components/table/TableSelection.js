export class TableSelection {
  static className ='excel__table-row-data-cell-selected'// може обратится только через имя класса
  constructor() {
    this.group =[];// это массив для хранения выбранных ячеек
    this.current = null; // это выбранная начальная ячейка для группового выделения
  }

  clear() {// очищаем массив ячеек и убираем выделения в dom дереве
    this.group.forEach( $cell => $cell.removeClass(TableSelection.className));// удаляем класс у DOM элементов
    this.group=[];// очищаем массив для внутреннего хранения элементоы
  }

  get selectedIds() {
    return this.group.map( $el => $el.id());
  }

  select($el) {// $el inctanceof DOM === true
    this.clear();// очищаем массив ячеек
    this.group.push($el);// добавляем выбранную ячейку в массив ячеек
    this.current= $el;// указали выбранную ячейку
    $el.focus().addClass(TableSelection.className);// обращаемся через имя класса
  }

  // выбираем группу ячеек
  selectGroup($group =[]) {
    this.clear();
    this.group = $group;// записываем во внутреннюю переменную группу выбраных ячеек
    this.group.forEach($el => $el.addClass(TableSelection.className) );
  }

  // метод для изменения стиля отображения
  applyStyle(style) {
    this.group.forEach( $el => $el.css(style));
  }
}
