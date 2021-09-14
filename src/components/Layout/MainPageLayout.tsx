import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import {Breadcrumb, Button, Layout, Menu} from "antd";
import {PlusCircleOutlined, UserOutlined} from "@ant-design/icons";
import {CommonPropsType, UsersType} from "../../App";
import {Wrapper} from '../Tables/Wrapper'
import {useDispatch} from "react-redux";
import {addTask} from "../../redux/todos/todosReducer";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
export const MainPageLayout = (props: CommonPropsType) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [activeUser, setActiveUser] = useState<UsersType>({username: 'User', id: 0});
    const [text, setText] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        activeUser.id === 0 ? history.replace('') : history.push(`/users/${activeUser.id.toString()}`)
    }, [history, activeUser])


    const onCollapse = () => {
        setCollapsed(prev => !prev);
    };
    const clickHandler = (user: UsersType) => {
        setActiveUser({...user})
    }

    const usersJSX = props.users.map(user => <Menu.Item onClick={() => clickHandler(user)}
                                                             key={user.id}>{user.username + ` \n `} -
        id: {user.id}</Menu.Item>)

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsedWidth={70} width={240} collapsible collapsed={collapsed} onCollapse={onCollapse}>
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
                        {/*<Breadcrumb.Item>{activeUser.username}</Breadcrumb.Item>*/}
                        {activeUser.username === 'User'
                            ? null
                            : <>
                                Add new task for {activeUser.username}
                                <input value={text} onChange={(e) => setText(e.currentTarget.value)}/>
                                <Button onClick={() => dispatch(addTask(activeUser.id, text))} type="primary" shape="circle" icon={<PlusCircleOutlined /> } size={"small"} />
                            </>}
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