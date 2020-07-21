export class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw new Error('Method "getRoot" should be implemented ');
  }
  afetrRender() {
    console.log('Page after');
  }

  destroy() {

  }
}
