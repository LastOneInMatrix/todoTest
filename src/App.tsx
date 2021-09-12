import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {Layout, Menu, Breadcrumb, Table, Tag, Button} from 'antd';
import {Switch, Route, useParams, useHistory} from "react-router-dom";
import {
    UserOutlined,
} from '@ant-design/icons';
import "antd/dist/antd.css";

type UsersType = {
    username: string;
    id: number;
}
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: true
})

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

type CommonPropsType = {
    users: UsersType[];
};

const MainPageLayout = (props: CommonPropsType) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [activeUser, setActiveUser] = useState<UsersType>({username: 'User', id: 0});

    const history = useHistory();

    useEffect(() => {
        activeUser.id === 0 ? history.replace('') : history.push(`/users/${activeUser.id.toString()}`)
    }, [history, activeUser])


    const onCollapse = () => {
        setCollapsed(prev => !prev);
    };
    const clickHandler = (user: UsersType) => {
        setActiveUser({...user})
    }

    const usersJSX = props.users.map((user, i) => <Menu.Item onClick={() => clickHandler(user)}
                                                             key={user.id}>{user.username + ` \n `} -
        id: {user.id}</Menu.Item>)
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsedWidth={70} width={300} collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo"/>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                    <SubMenu key="users" icon={<UserOutlined/>} title="User">
                        {usersJSX}
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}>TODOs APP</Header>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Users</Breadcrumb.Item>
                        <Breadcrumb.Item>{activeUser.username}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{padding: 0, minHeight: 550}}>
                        <Switch>
                            <Route path={'/users/:id?'} render={() => <Wrapper userId={activeUser.id}/>}/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Users Todos experience with AntDesign 2021</Footer>
            </Layout>
        </Layout>
    );
}

type WrapperPropsType = { userId: number }

const Wrapper: React.FC<WrapperPropsType> = ({userId}) => {
    const [todos, setTodos] = useState<any>([])
    useEffect(() => {
        instance.get<Array<{ userId: number, id: number }>>('todos')
            .then(res => res.data)
            .then(data => {
                let userTasks = data.filter(t => t.userId === userId);
                setTodos(userTasks);
            })
    }, [userId])
    const params = useParams();
    return <div>
        User id: {userId}
        <TableComponent task={todos}/>
    </div>
}
type TaskType = {
    completed: boolean
    id: number
    title: string
    userId: number
}
type PropsType = {
    task: Array<TaskType>
}
const TableComponent: React.FC<PropsType> = ({task}) => {

    const dataSource = task.map(t => ({...t, key: t.id}));
    const columns = [
        {
            title: 'Task',
            dataIndex: 'title',
            key: 'title',
            sorter: (a: any, b: any) => {
                console.log(a)
                return a.title > b.title ? 1 : -1
            }
        },
        {
            title: 'Status',
            dataIndex: 'completed',
            key: 'completed',
            render: (completed: boolean) => {
                return <Tag color={completed ? 'green' : 'red'}>
                    {completed.toString().toUpperCase()}
                </Tag>
            }
        },
        {
            title: 'Actions',
            key: 'id',
            render: (data: TaskType & { key: number }) => (

                <>
                    <Button
                        danger
                        onClick={() => {
                            instance.delete(`/todos/${data.id}`)
                                .then(res => {
                                    console.log(res)
                                })
                        }}
                    > Delete </Button>
                    <Button
                        style={{color: 'green', marginLeft: '12px'}}
                        onClick={() => {
                            instance.patch(`/todos/${data.id}`, {title: 'NewTitle'})
                                .then(res => {
                                    console.log(res)
                                })
                        }}
                    > Edit </Button>
                </>
            )
        },
    ];

    return <Table dataSource={dataSource} columns={columns}/>;
}

function App() {
    const [users, setUsers] = useState<UsersType[]>([]);

    useEffect(() => {
        instance.get<Array<{ username: string, id: number }>>('users')
            .then(res => res.data)
            .then(users => {
                setUsers(users.map(user => ({username: user.username, id: user.id})))
            })
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
