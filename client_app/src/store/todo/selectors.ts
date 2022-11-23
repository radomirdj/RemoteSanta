// import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

export const getPendingSelector = (state: AppState) => state.todo.pending;

export const getTodosSelector = (state: AppState) => state.todo.todos;

export const getErrorSelector = (state: AppState) => state.todo.error;

// export const getTodosSelector = createSelector(getTodos, (todos) => todos);

// export const getPendingSelector = createSelector(
//   getPending,
//   (pending) => pending
// );

// export const getErrorSelector = createSelector(getError, (error) => error);
