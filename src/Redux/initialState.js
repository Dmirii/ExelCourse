// import {storage} from '@core/utils';
import {defaultStyles} from '@/constans';
import {defaultTitle} from '@/constans';
import {clon} from '@core/utils';


export const defaultState ={
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  openDate: new Date().toJSON(),
  currentText: '',
  currentStyles: defaultStyles,
};
const normalize = state =>({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

// export const initialState = storage('excel-state') ? normalize(storage('excel-state')) : defaultState;

export function normalizeInitialState(state) {
  return state ? normalize(state): clon(defaultState);
}
