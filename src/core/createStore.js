
// /  класс для создания Репозитория Redux
export function createStore(rootReduser, initialState={}) {
  let _state =rootReduser({...initialState}, {type: '__INIT__'});
  let _listeners = [];
  return {
    subscribe(fn) {
      _listeners.push(fn);
      return {
        unsubscribe() {
          _listeners = _listeners.filter(l => l != fn);
        },
      };
    },
    dispatch(action) {
      _state = rootReduser(_state, action);
      _listeners.forEach(listener => listener(_state));
    },
    getState() {
      // делаем две обратные операции
      // для избегания мутирования
      // это будет другой обект в памяти
      return JSON.parse(JSON.stringify(_state));
    },
  };
}
