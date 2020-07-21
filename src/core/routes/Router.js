import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';


export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }
    this.$plaseholder = $(selector);
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.page =null;

    this.init();
  }


  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$plaseholder.clear();

    const Page =ActiveRoute.path.includes('excel') ?
     this.routes.excel :
     this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);

    this.$plaseholder.append(this.page.getRoot());
    // debugger;
    this.page.afterRender();
  }
}

