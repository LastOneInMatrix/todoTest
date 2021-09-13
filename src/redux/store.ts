import {applyMiddleware, combineReducers, createStore} from "redux";
import {UsersActionsType, usersReducer} from "./reducers/usersReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TodoActionsType, todosReducer} from "./todos/todosReducer";


const rootReducer = combineReducers({
    users: usersReducer,
    todos: todosReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStoreType = typeof store;
export type AppStateType = ReturnType<typeof rootReducer>;
export type CommonActionTypeForApp  = UsersActionsType | TodoActionsType

export type ThunkType = ThunkAction<void, AppStateType, unknown, CommonActionTypeForApp>;
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, CommonActionTypeForApp>;
export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;