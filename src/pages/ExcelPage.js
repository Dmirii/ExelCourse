import {Page} from '@core/Page';
import {Excel} from '@/components/excel/Excel';
import {Table} from '@/components/table/Table';
import {Header} from '@/components/header/Header';
import {storage} from '@core/utils';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {normalizeInitialState} from '@/redux/initialState';

import {debounce} from '@core/utils';

function storageName(params) {
  return 'excel:'+params;
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params; // ? this.params : Date.now().toString();

    // console.log('params:', params);
    const state = storage(storageName(params));
    // console.log('state:', state);
    // создаем репозиторий Redux
    const store = createStore(rootReducer, normalizeInitialState(state));
    // console.log('store', store);
    const stateListener =debounce(state => {
      storage(storageName(params), state);
    }, 300);

    // подписываемся на Redux
    store.subscribe(stateListener);

    // создаем экземпляр класса ексель в конструктор передаем два параметра
    this.excel = new Excel( {
      components: [Header, Toolbar, Formula, Table], store,
    });


    // вызываем render изи EXCEL
    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
