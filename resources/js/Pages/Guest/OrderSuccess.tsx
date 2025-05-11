import { CheckCircleTwoTone } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';

const { Title } = Typography;

const OrderSuccess = () => {
    return (
        <Space
            align="center"
            direction="vertical"
            size="large"
            style={{ textAlign: 'center', marginTop: '50%' }}
        >
            <Title level={2}>Đặt Hàng Thành Công!</Title>
            <CheckCircleTwoTone
                style={{ fontSize: '64px' }}
                twoToneColor="#52c41a"
            />
            <p>Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý sớm nhất có thể.</p>
            <Button
                size="large"
                type="primary"
                onClick={() => (window.location.href = '/orders')}
            >
                Tiếp tục mua hàng
            </Button>
        </Space>
    );
};

export default OrderSuccess;
