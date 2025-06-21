import { CheckCircleTwoTone } from '@ant-design/icons';
import { Head } from '@inertiajs/react';
import { Button, Space, Typography } from 'antd';

const { Title } = Typography;

interface PageProps {
    customer_uuid: string;
}

const OrderSuccess = ({ customer_uuid }: PageProps) => {
    console.log(
        'OrderSuccess component rendered with customer_uuid:',
        customer_uuid,
    );
    return (
        <div className="flex min-h-screen flex-col items-center justify-center pt-6 sm:pt-0">
            <Space
                align="center"
                direction="vertical"
                size="large"
                style={{ textAlign: 'center' }}
            >
                <Head title="Guest Order Success" />

                <Title level={2}>Đặt Hàng Thành Công!</Title>
                <CheckCircleTwoTone
                    style={{ fontSize: '64px' }}
                    twoToneColor="#52c41a"
                />
                <p>
                    Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý sớm nhất có thể.
                </p>
                <Button
                    size="large"
                    type="primary"
                    onClick={() =>
                        (window.location.href = route(
                            'orders.index',
                            customer_uuid,
                        ))
                    }
                >
                    Tiếp tục mua hàng
                </Button>
            </Space>
        </div>
    );
};

export default OrderSuccess;
