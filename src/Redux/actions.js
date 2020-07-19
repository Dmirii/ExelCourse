import {TABLE_RESIZE} from '@/Redux/types';
import {CHANGE_TEXT} from '@/Redux/types';
import {CHANGE_STYLES} from '@/Redux/types';
import {APPLY_STYLE} from '@/Redux/types';
import {CHANGE_TITLE} from '@/Redux/types';


// action creater // resize table
export function tableResiz(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

// action creater // Changing text
export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}

// изменяем стиль ячейки
export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data,
  };
}

//
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}

export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data,
  };
}

