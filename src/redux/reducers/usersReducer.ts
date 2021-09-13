import {UsersType} from "../../App";
import {usersAPI} from "../../API/api";
import {ThunkDispatchType} from "../store";

const initialState  = {
    allUsers: [] as UsersType[],
    totalUsersCount: 0 as Number
};
export type InitialUsersStateType = typeof initialState


const getUsers = (users: UsersType[]) => ({type: 'GET_ALL_USERS', users} as const)



export const usersReducer = (state:InitialUsersStateType = initialState, action:UsersActionsType) => {
    switch(action.type) {
        case "GET_ALL_USERS": {
            return {...state, allUsers: action.users, totalUsersCount: action.users.length}
        }
        default:
            return state
    }
}

export const getUserTC = () => (dispatch: ThunkDispatchType) => {
    usersAPI.getUsers()
        .then(users => {
            dispatch(getUsers(users))
        })
        .catch(err => {
            throw new Error(err)
        })
        .finally(() => {
            console.log('Отключить крутилку');
            //TODO
        })
}

export type UsersActionsType = ReturnType<typeof getUsers>
