import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {TableComponent} from "./TableComponent";
import {getTodos, InitialTodoStateType} from "../../redux/todos/todosReducer";
import {TodoResponseType} from "../../API/api";
import {AppStateType} from "../../redux/store";
import { useParams } from 'react-router-dom';

type WrapperPropsType = { userId: number }
export const Wrapper: React.FC<WrapperPropsType> = ({userId}) => {
    const params = useParams();
    const todosState = useSelector<AppStateType, InitialTodoStateType>(state => state.todos)
    const dispatch = useDispatch()
    let userTasks = [] as TodoResponseType[]

    useEffect(() => {
        dispatch(getTodos())
    }, [userId])

    userTasks =   todosState.allTodos.filter(t => t.userId === userId);
    return <div>
        User id: {userId}
        <TableComponent task={userTasks}/>
    </div>
}