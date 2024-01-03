import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
// Імпорт компонентів Link та Outlet з react-router-dom для роботи з маршрутами
import {Link, Outlet} from "react-router-dom";
// Деструктуризація Layout на Header, Sider, Content
const { Header, Sider, Content } = Layout;

// Оголошення функціонального компоненту ContainerDefault
const ContainerDefault : React.FC = () => {
    // Ініціалізація стану для зберігання стану згортання бокового меню
    const [collapsed, setCollapsed] = useState(false);
    // Використання хуків для отримання теми
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Вивід компоненту
    return (
        <>
            {/* Оголошення компоненту Layout з встановленим висотним стилем */}
            <Layout style={{height:"100vh"}}>
                {/* Оголошення компоненту Sider (ліве меню) з властивостями згортання та вигляду */}
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    {/* Декоративний логотип */}
                    <div className="demo-logo-vertical" />
                    {/* Оголошення компоненту Menu для бокового меню з елементами */}
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: <Link to={"/"}>Головна</Link> ,
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: <Link to={"/create"}>Додати категорію</Link>,
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined />,
                                label: 'nav 3',
                            },
                        ]}
                    />
                </Sider>
                {/* Оголошення компоненту Layout для верхнього меню та контентної області */}
                <Layout>
                    {/* Оголошення компоненту Header (верхнє меню) з кнопкою згортання бокового меню */}
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        {/* Використання компоненту Button для кнопки згортання/розгортання бокового меню */}
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            // Обробник кліку для зміни стану згортанн
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    {/* Оголошення компоненту Content для відображення контенту сторінок */}
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {/* Використання компоненту Outlet для виводу вкладених сторінок */}
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}
// Експорт компоненту ContainerDefault для використання в інших частинах програми
export default ContainerDefault;