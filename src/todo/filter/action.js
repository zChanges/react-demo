import {SET_FILTER} from './actionType';

export const setFilter = filterType => ({
  type: SET_FILTER,
  filter: filterType
});