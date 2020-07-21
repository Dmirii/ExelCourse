
import {$} from '@core/dom';
import {Page} from '@core/Page';
import {createRecordsTable} from './dashboard.function';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();
    const table =createRecordsTable();
    // console.log(table);
    return $.create('div', 'db').html(`
                <div class="db__header">
                <h1>Excel Dashboard</h1>
            </div>
            <div class="db__new">
            <div class="db__new-view">
                    <a href="#excel/${now}" class="db__new-create"> new <br> table</a>
                </div>
            </div>
            <div class="db__table db__new-view">
             ${table}
            </div>
    `);
  }

  afterRender() {
    // console.log('after');
  }
}
