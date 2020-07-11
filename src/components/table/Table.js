import {ExcelComponent} from '@core/ExcelComponent';
import {createTeble} from '@/components/table/table.template.js';

export class Table extends ExcelComponent {
  static className = 'exel__table';
  toHTML() {
    return createTeble();
  }
}
