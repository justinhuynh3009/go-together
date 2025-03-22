import type { GetProps } from 'antd';
import { Input, Layout, theme } from 'antd';
import React from 'react';

const { Header, Content, Footer } = Layout;

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const Home: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log('Search:', value, _e, info);
    };

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                {/* <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                /> */}
            </Header>
            <Content style={{ textAlign: 'center' }}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Search
                        placeholder="input search text"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: '40%' }}
                        size="large"
                    />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Go Together {new Date().getFullYear()} Created by Justin
            </Footer>
        </Layout>
    );
};

export default Home;
