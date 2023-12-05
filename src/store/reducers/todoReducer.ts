import { baseActionTypeWithPayload, baseActionType } from "../../types";
import { actionTypes } from "../actions/todoActions";
import { defaultStateTypeTodos } from "../../types";

const defaultState: defaultStateTypeTodos = {
  todos: [],
};

export const todosReducer = (
  state = defaultState,
  action: baseActionTypeWithPayload<actionTypes, any>
) => {
  switch (action.type) {
    case actionTypes.SET_TODO:
      return {
        ...state,
        todos: [
          state.todos,
          (action as baseActionTypeWithPayload<actionTypes, any>).payload,
        ],
      };
    case actionTypes.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo, idx) => {
          return (
            idx !==
            (action as baseActionTypeWithPayload<actionTypes, any>).payload
          );
        }),
      };
    case actionTypes.CLEAR_TODOS_ARRAY:
      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
};
