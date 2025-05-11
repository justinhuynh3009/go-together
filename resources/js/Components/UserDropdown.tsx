// resources/js/Components/UserDropdown.tsx
import {
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link, router } from '@inertiajs/react';
import { Avatar, Dropdown, MenuProps, Space, Typography } from 'antd';

const { Text } = Typography;

interface UserDropdownProps {
    user: {
        name: string;
        email: string;
        avatar?: string;
    };
}

const UserDropdown = ({ user }: UserDropdownProps) => {
    const handleLogout = () => {
        // Modal.confirm({
        //     title: 'Confirm Logout',
        //     content: 'Are you sure you want to logout?',
        //     okText: 'Logout',
        //     cancelText: 'Cancel',
        //     onOk: () => router.post(route('logout')),
        //   });

        router.post(route('logout'));
    };

    const items: MenuProps['items'] = [
        {
            key: 'account',
            label: (
                <Link href={route('profile.edit')}>
                    <Space>
                        <SettingOutlined />
                        <span>Account Settings</span>
                    </Space>
                </Link>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: (
                <a onClick={handleLogout}>
                    <Space>
                        <LogoutOutlined />
                        <span>Logout</span>
                    </Space>
                </a>
            ),
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    {user?.avatar ? (
                        <Avatar src={user.avatar} />
                    ) : (
                        <Avatar icon={<UserOutlined />} />
                    )}
                    <Text strong className="hidden md:inline">
                        {user?.name}
                    </Text>
                </Space>
            </a>
        </Dropdown>
    );
};

export default UserDropdown;
