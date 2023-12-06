import { baseActionType, baseActionTypeWithPayload } from "../../types";
import { ITodoData } from "../../types";

export enum actionTypes {
  SET_TODO = "SET_TODO",
  SET_FILTER = "SET_FILTER",
  SET_TODO_TAGS = "SET_TODO_TAGS",
  REMOVE_TODO = "REMOVE_TODO",
  REMOVE_TAGS = "REMOVE_TAGS",
  REMOVE_UNICTAGS = "REMOVE_UNICTAGS",
  CLEAR_TODOS_ARRAY = "CLEAR_TODOS_ARRAY",
}

interface ITodoActions {
  setTodo: (
    todo: ITodoData
  ) => baseActionTypeWithPayload<actionTypes.SET_TODO, ITodoData>;
  setFilter: (
    filter: string
  ) => baseActionTypeWithPayload<actionTypes.SET_FILTER, string>;
  setTodoTags: (
    tags: string | string[]
  ) => baseActionTypeWithPayload<actionTypes.SET_TODO_TAGS, string | string[]>;
  removeTodo: (
    todoId: number
  ) => baseActionTypeWithPayload<actionTypes.REMOVE_TODO, number>;
  removeTags: (
    tags: string
  ) => baseActionTypeWithPayload<actionTypes.REMOVE_TAGS, string>;
  removeUnicTags: (
    tags: string
  ) => baseActionTypeWithPayload<actionTypes.REMOVE_UNICTAGS, string>;
  clearTodosArray: () => baseActionType<actionTypes.CLEAR_TODOS_ARRAY>;
}

export const todosActions: ITodoActions = {
  setTodo: (todo) => ({ type: actionTypes.SET_TODO, payload: todo }),
  setFilter: (filter) => ({ type: actionTypes.SET_FILTER, payload: filter }),
  setTodoTags: (tags) => ({ type: actionTypes.SET_TODO_TAGS, payload: tags }),
  removeTodo: (todoId) => ({ type: actionTypes.REMOVE_TODO, payload: todoId }),
  removeTags: (tags) => ({ type: actionTypes.REMOVE_TAGS, payload: tags }),
  removeUnicTags: (tags) => ({
    type: actionTypes.REMOVE_UNICTAGS,
    payload: tags,
  }),
  clearTodosArray: () => ({ type: actionTypes.CLEAR_TODOS_ARRAY }),
};
