import {storage} from '@core/utils';
import {defaultStyles} from '@/constans';
import {defaultTitle} from '@/constans';


export const defaultState ={
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
};
const normalize = state =>({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export const initialState = storage('exel-state') ? normalize(storage('exel-state')) : defaultState;
