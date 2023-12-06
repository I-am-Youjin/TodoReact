import {
  baseActionTypeWithPayload,
  baseActionType,
  ITodoData,
} from "../../types";
import { actionTypes } from "../actions/todoActions";
import { defaultStateTypeTodos } from "../../types";

const defaultState: defaultStateTypeTodos = {
  todos: [],
  todosTags: [],
  unicTags: [],
  filter: null,
};

export const todosReducer = (
  state = defaultState,
  action: baseActionTypeWithPayload<actionTypes, any>
) => {
  switch (action.type) {
    case actionTypes.SET_TODO:
      return {
        ...state,
        todos: state.todos.concat([
          (action as baseActionTypeWithPayload<actionTypes, ITodoData>).payload,
        ] as any),
      };
    case actionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case actionTypes.SET_TODO_TAGS:
      return {
        ...state,
        todosTags: (state.todosTags as string[]).concat([action.payload]),
        unicTags: (state.unicTags as string[]).includes(action.payload)
          ? state.unicTags
          : (state.unicTags as string[]).concat([action.payload]),
      };
    case actionTypes.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos?.filter((todo, idx) => {
          return (
            idx !==
            (action as baseActionTypeWithPayload<actionTypes, any>).payload
          );
        }),
      };
    case actionTypes.REMOVE_TAGS:
      return {
        ...state,
        todosTags: state.todosTags.filter((tag, idx) => {
          return idx !== (state.todosTags as string[]).indexOf(action.payload);
        }),
      };
    case actionTypes.REMOVE_UNICTAGS:
      return {
        ...state,
        unicTags: (state.todosTags as string[]).includes(action.payload)
          ? state.unicTags
          : state.unicTags.filter((tag) => {
              return tag !== action.payload;
            }),
      };
    case actionTypes.CLEAR_TODOS_ARRAY:
      return defaultState;
    default:
      return state;
  }
};
