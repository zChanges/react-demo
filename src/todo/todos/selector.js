import {createSelector} from 'reselect';
import {FilterTypes} from '../../constants';

const getTodos = (state) => state.todos;
const getFilter = (state) => state.filter;

export const selectVisibleTodos = createSelector(
  [getTodos, getFilter],
  (todos, filter) => {
    switch (filter) {
      case FilterTypes.ALL:
        return todos;
      case FilterTypes.COMPLETED:
        return todos.filter(item => item.completed);
      case FilterTypes.UNCOMPLETED:
        return todos.filter(item => !item.completed);
      default:
        throw new Error('unsupported filter');
    }
  }
)