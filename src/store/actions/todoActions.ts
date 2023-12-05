import { baseActionType, baseActionTypeWithPayload } from "../../types";
import { ITodoData } from "../../types";

export enum actionTypes {
  SET_TODO = "SET_TODO",
  REMOVE_TODO = "REMOVE_TODO",
  CLEAR_TODOS_ARRAY = "CLEAR_TODOS_ARRAY",
}

interface ITodoActions {
  setTodo: (
    todo: ITodoData
  ) => baseActionTypeWithPayload<actionTypes.SET_TODO, ITodoData>;
  removeTodo: (
    todoId: number
  ) => baseActionTypeWithPayload<actionTypes.REMOVE_TODO, number>;
  clearTodosArray: () => baseActionType<actionTypes.CLEAR_TODOS_ARRAY>;
}

export const todosActions: ITodoActions = {
  setTodo: (todo) => ({ type: actionTypes.SET_TODO, payload: todo }),
  removeTodo: (todoId) => ({ type: actionTypes.REMOVE_TODO, payload: todoId }),
  clearTodosArray: () => ({ type: actionTypes.CLEAR_TODOS_ARRAY }),
};
