import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './actionTypes.js';

let nextTodoId = 0;
export const addTodo = text => ({
  id: nextTodoId++,
  text: text,
  type: ADD_TODO,
  completed: false
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id: id
});

export const removeTodo = id => ({
  type: REMOVE_TODO,
  id: id
});
