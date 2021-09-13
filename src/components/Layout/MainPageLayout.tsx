import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import {Breadcrumb, Layout, Menu} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {CommonPropsType, UsersType} from "../../App";
import {Wrapper} from '../Tables/Wrapper'

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
export const MainPageLayout = (props: CommonPropsType) => {
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
            <Sider collapsedWidth={70} width={200} collapsible collapsed={collapsed} onCollapse={onCollapse}>
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