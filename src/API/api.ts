import axios from 'axios';

export type UserResponseType = {
    username: string,
    id: number
};
export type TodoResponseType = { userId: number, id: number, title: string, completed: boolean};

type ErrorType = {}; // в данном REST API - не приходит респонс при ошибках

export const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: true
});

export const usersAPI = {
    getUsers() {
        return instance.get<UserResponseType[] & ErrorType>('users').then(res => res.data)
    }
}

export const todosAPI = {
    getTodos() {
        return instance.get<TodoResponseType[] & ErrorType>('todos').then(res => res.data)
    },
    updateTodos(id: number, payload: {[key: string]: string | boolean}) {
        return  instance.patch<TodoResponseType[] & ErrorType>(`/todos/${id}`, payload).then(res => {
            return res.data;
        })
    },
    deleteTodos(id: number) {
        return instance.delete<{}>(`/todos/${id}`).then(res => res.data)
    }
}