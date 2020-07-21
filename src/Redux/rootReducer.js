import {TABLE_RESIZE} from '@/Redux/types';
import {CHANGE_TEXT} from '@/Redux/types';
import {CHANGE_STYLES} from '@/Redux/types';
import {APPLY_STYLE} from '@/Redux/types';
import {CHANGE_TITLE} from '@/Redux/types';
import {UPDATE_DATE} from '@/Redux/types';

import {toInlineStyles} from '@core/utils';

// pure function

export function rootReducer(state, action) {
  let field;
  let val;

  switch (action.type) {
    case TABLE_RESIZE:
      field= action.data.type === 'col' ? 'colState': 'rowState';
      return {...state, [field]: value(state, field, action)};

    case CHANGE_TEXT:
      field = 'dataState';
      // prevState = state[field] || {};
      // prevState[action.data.id] = action.data.value;
      return {...state, currentText: action.data.value, [field]: value(state, field, action)};
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data};
    case APPLY_STYLE:
      field = 'stylesState';
      val = state[field] || {};
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value};
      });
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value},
      };
    case CHANGE_TITLE:
      return {...state, title: action.data};
    case UPDATE_DATE:
      return {...state, openDate: new Date().toJSON()};


    default: return state;
  }
}


function value(state, field, action) {
  // console.log('state', state);
  // console.log('field', field);
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}
