import {TodoResponseType, todosAPI} from "../../API/api";
import {InferActionType, ThunkDispatchType, ThunkType} from "../store";

const initialTodoState = {
    allTodos: [] as TodoResponseType[]
}
export const todosActions = {
    getTodos: (todos: TodoResponseType[]) => ({type: 'GET_ALL_TODO', todos} as const),
    deleteTask: (id: number) => ({type: 'DELETE_TASK', id} as const),
    updateTask: (id: number, payload: { [key: string]: any }) => ({type: 'UPDATE_TASK', id, payload} as const),
    addsNewTask: (task: TodoResponseType) => ({type: 'ADD_NEW_TASK', task} as const)
}

//reducer
export const todosReducer = (state: InitialTodoStateType = initialTodoState, action: TodoActionsType): InitialTodoStateType => {
    switch (action.type) {
        case "GET_ALL_TODO": {
            return {...state, allTodos: action.todos}
        }
        case "DELETE_TASK": {
            return {...state, allTodos: state.allTodos.filter(task => task.id !== action.id)}
        }
        case "UPDATE_TASK": {
            return {...state, allTodos: state.allTodos.map(t => t.id !== action.id ? t : {...t, ...action.payload})}
        }
        case "ADD_NEW_TASK": {
            const copy = [...state.allTodos]
            copy.unshift(action.task)
            return {...state, allTodos: copy}
        }
        default:
            return state
    }
}


//thunks
export const getTodos = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        const allTodos = await todosAPI.getTodos()
        dispatch(todosActions.getTodos(allTodos))
    } catch (e: any) {
        throw  e.response ? new Error(e.response.data.error) : new Error(e.message + ', more details in the console')
    } finally {
        console.log('Отключить крутилку')
    }
}

export const deleteTask = (id: number): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        const resp = await todosAPI.deleteTodos(id)
        console.log(resp) //так как фейковый серв, ничего не происходит
        dispatch(todosActions.deleteTask(id))
    } catch (e: any) {
        throw  e.response ? new Error(e.response.data.error) : new Error(e.message + ', more details in the console')
    } finally {
        console.log('Некая логика')
    }
}

export const updateTask = (id: number, payload: { [key: string]: string | boolean }): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        const resp = await todosAPI.updateTodos(id, payload)
        //так как фейковый серв, ничего не происходит
        dispatch(todosActions.updateTask(id, payload))
    } catch (e: any) {
        throw  e.response ? new Error(e.response.data.error) : new Error(e.message + ', more details in the console')
    } finally {
        console.log('Некая логика')
    }
}

export const addTask = (id: number, title: string): ThunkType => async (dispatch: ThunkDispatchType) => {
    try {
        const res = await todosAPI.addTask(id, title)
        dispatch(todosActions.addsNewTask({...res, completed: false}))
    }
    catch(e: any) {
        throw  e.response ? new Error(e.response.data.error) : new Error(e.message + ', more details in the console')
    }
    finally {
        console.log('Некая логика') // TODO добавить крутилку и ее выключение при загрузке
    }
}
//types
export type TodoActionsType = InferActionType<typeof todosActions>;
export type InitialTodoStateType = typeof initialTodoState;