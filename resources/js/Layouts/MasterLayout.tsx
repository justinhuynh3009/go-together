import UserDropdown from '@/Components/UserDropdown';
import {
    CoffeeOutlined,
    FileOutlined,
    OrderedListOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link } from '@inertiajs/react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Flex, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return { key, icon, children, label } as MenuItem;
}

const items: MenuItem[] = [
    getItem(
        'Dashboard',
        'dashboard',
        <Link href={route('dashboard')}>
            <PieChartOutlined />
        </Link>,
    ),
    getItem(
        'Orders',
        'admin.orders.index',
        <Link href={route('admin.orders.index')}>
            <OrderedListOutlined />
        </Link>,
    ),
    getItem(
        'Customers',
        'customers.index',
        <Link href={route('customers.index')}>
            <UserOutlined />
        </Link>,
    ),
    getItem('Menu', 'menu', <CoffeeOutlined />, [
        getItem(
            'Menu Categories',
            'menu-category',
            <Link href={route('menu-categories.index')} />,
        ),
        getItem(
            'Menu Items',
            'menu-items',
            <Link href={route('menu-items.index')} />,
        ),
    ]),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [
        getItem('Team 1', '6'),
        getItem('Team 2', '8'),
    ]),
    getItem('Files', '9', <FileOutlined />),
];

interface MasterLayoutProps {
    children: React.ReactNode;
    title?: string;
    user: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
}

const boxStyle: React.CSSProperties = {
    width: '100%',
    padding: '0 24px',
};

const MasterLayout: React.FC<MasterLayoutProps> = ({
    children,
    title,
    user,
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Flex style={boxStyle} justify="flex-end" align="center">
                        <UserDropdown user={user} />
                    </Flex>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    {children}
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MasterLayout;
