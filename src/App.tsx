import React, {useEffect} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import "antd/dist/antd.css";
import {getUserTC} from "./redux/reducers/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/store";
import {MainPageLayout} from './components/Layout/MainPageLayout'

export type UsersType = {
    username: string;
    id: number;
}

export type CommonPropsType = {
    users: UsersType[];
};









function App() {
    const users = useSelector<AppStateType, UsersType[]>(state => state.users.allUsers)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserTC())
    }, [])

    return (
        <div>
            <Switch>
                <Route path={'/'} render={() => <MainPageLayout users={users}/>}/>
            </Switch>
        </div>
    );
}

export default App;
