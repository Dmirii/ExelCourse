// выносим логику ресайза в отдельный файл
// что бы не нагружать елемент Table
import {$} from '@core/dom';

// функция ресайза элементов таблицы        // получаем mouseEvent с координатами
export function resizeHendler($root, event) {// получаем $el обернутый в Dom div exel__table
  const $resizer = $(event.target);// находим сам элемент в Dom дереве
  // const $p = $resizer.$el.parentNode; логический уровень пересекается с абстрактным
  // const $parent = $resizer.$el.closest('.exel__table-row-data-column');
  const $parent = $resizer.closest('[data-type="resizable"]'); // нашли родителя ресайзера по датаатрибутам
  const coords = $parent.getCoords();// получаем координаты обекта родителя ресайзер
  const type = $resizer.data.resize;// получаем тип элемента колонка или строка
  const sideprop = type === 'col' ? 'bottom' : 'right'; // для управления параметрами стиля
  let value; // новое значение выслоты или ширины масштабируемого элемента

  $resizer.css({
    opacity: 1, // задаем принудительно видимость ресайзеру
    [sideprop]: '-5000px',
  });

  // обрабатываем ведение мыши
  document.onmousemove = e => {
    if (type==='col') {// если ресайзим колонку
      const delta = e.pageX - coords.right;// получаем раздницу при движении ресайзера
      value = coords.width + delta;// обращаемся к глобальной value что бы ее было видно в маусмув
      $resizer.css({right: -delta +'px'});// отрисовываем ресайзер по дельте

      // задаем перенту новый стиль  ?? ??? зачем
      // $parent.css({width: value + 'px'});
      // для полученого столбца мы задаем новый стиль ( изменяем ширину)
      // cells.forEach(elem => elem.style.width = value + 'px');
    } else {// если ресайзим строку , то ресайзим только перента
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({bottom: -delta + 'px'});
    }
  };

  // снимаем слушатель перемещения мыши
  document.onmouseup = () => {
    // выключаем прослушку
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'col') {// ресайзим колонку
      $parent.css({width: value + 'px'});
      $root.findAll(`[data-col="${$parent.data.col}"]`)// получаем масив ячеек для изменения их стиля
          .forEach(elem => elem.style.width = value + 'px');
    } else {
      $parent.css({height: value + 'px'});
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });// убираем видисоть у ресайзера
  };
  // if end
}
