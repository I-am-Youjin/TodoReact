export interface ITodoCreate {
  isOpened: boolean;
  onClick: () => void;
  defaultState?: ITodoData;
}

export interface ITodoData {
  id: number;
  tag: string;
  title: string;
  description: string;
}

export type baseActionType<T> = {
  type: T;
};

export type baseActionTypeWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type defaultStateTypeTodos = Record<
  "todos" | "todosTags" | "unicTags" | "filter",
  ITodoData[] | [] | null
>;
