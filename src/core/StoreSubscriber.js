// класс для excel для реализации
// сохранения состояний системмы // подрписка отписка от стора
import {isEqual} from '@core/utils';
export class StoreSubscriber {
  constructor(store) {
    this.store =store;
    this.sub =null; // это подписка
    this.prevState = {}; // предыдущее состояние
  }

  // принимаем список компонентов для подписки
  subscribeComponents(components) {
    this.prevState = this.store.getState();

    this.sub = this.store.subscribe(state =>{
      // динамически проверяем ключи
      Object.keys(state).forEach( key => {
        // метод   Object.keys возращает массив собственнных ключей обекта
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach( component => {
            if (component.isWathching(key)) {
              const changes = {[key]: state[key]};
              component.storeChanged(changes);
            }
          });
        }
      });
      this.prevState = this.store.getState();
      if (process.env.NODE_ENV === 'development') {
        window['redux'] = this.prevState;
      }
    });
  }

  // отписка от всех событий стора
  unsubscribFromStore() {
    this.sub.unsubscribe();
  }
}
