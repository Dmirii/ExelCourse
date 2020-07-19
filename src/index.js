import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {initialState} from '@/redux/initialState';
import {storage} from '@core/utils';
import {debounce} from '@core/utils';

import './scss/index.scss';

// создаем репозиторий Redux
const store = createStore(rootReducer, initialState);

const stateListener =debounce(state => {
  console.log('App State:', state);
  storage('exel-state', state);
}, 300);

// подписываемся на Redux
store.subscribe(stateListener);

// создаем экземпляр класса ексель в конструктор передаем два параметра
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table], store,
});


// вызываем render изи EXCEL
excel.render();
