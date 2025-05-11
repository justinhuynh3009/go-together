import { PageProps } from '@/types';
import { router } from '@inertiajs/react';
import {
    Button,
    Card,
    Col,
    Flex,
    Layout,
    Row,
    Space,
    Typography,
    message,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const { Header, Content } = Layout;

const { Title, Text } = Typography;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
};

const layoutStyle = {
    borderRadius: 8,
    // overflow: 'hidden',
    // width: 'calc(50% - 8px)',
    maxWidth: '600px',
};

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        price: number;
        image_url: string;
    };
    quantity: number;
    onQuantityChange: (delta: number) => void;
}

const ProductCard = ({
    product,
    quantity,
    onQuantityChange,
}: ProductCardProps) => {
    return (
        <Card cover={<img alt="example" src={product.image_url} />}>
            <Space direction="vertical" size={0}>
                <Title level={5}>{product.name}</Title>
                <Text strong>Số lượng: {quantity}</Text>

                <Space.Compact>
                    <Button onClick={() => onQuantityChange(-1)}>-</Button>
                    <Button onClick={() => onQuantityChange(1)}>+</Button>
                </Space.Compact>
            </Space>
        </Card>
    );
};

interface Product {
    id: number;
    name: string;
    price: number;
    image_url: string;
    category_id: number;
}

interface Props extends PageProps {
    products: Product[];
}

interface CartItem {
    product_id: number;
    name: string;
    price: number;
    quantity: number;
}

const VNDong = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
});

export default function OrderPage({ products }: Props) {
    const [carts, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);
    const cartModalRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Add this effect to handle outside clicks
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                cartModalRef.current &&
                !cartModalRef.current.contains(event.target as Node)
            ) {
                // Check if the click was NOT on the floating cart button
                const floatingButton = document.querySelector(
                    '.floating-cart-button',
                );
                if (!floatingButton?.contains(event.target as Node)) {
                    setShowCart(false);
                }
            }
        };

        if (showCart) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCart]);

    const submitOrder = () => {
        setIsSubmitting(true);

        const formData = new FormData();

        // Append each cart item to the FormData object
        carts.forEach((item, index) => {
            formData.append(
                `carts[${index}][product_id]`,
                item.product_id.toString(),
            );
            formData.append(`carts[${index}][name]`, item.name);
            formData.append(`carts[${index}][price]`, item.price.toString());
            formData.append(
                `carts[${index}][quantity]`,
                item.quantity.toString(),
            );
        });

        router.post(route('orders.store'), formData, {
            onSuccess: () => {
                message.success('Order placed successfully');
                setCart([]);
            },
            onError: (errors) => {
                console.error('Error placing order:', errors);
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    const handleQuantityChange = (productId: number, delta: number) => {
        const newCart = [...carts];
        const product = products.find((p) => p.id === productId);

        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        const existingItemIndex = newCart.findIndex(
            (item) => item.product_id === productId,
        );

        if (existingItemIndex > -1) {
            const existingItem = newCart[existingItemIndex];
            const newQuantity = existingItem.quantity + delta;

            if (newQuantity > 0) {
                newCart[existingItemIndex] = {
                    ...existingItem,
                    quantity: newQuantity,
                };
            } else {
                newCart.splice(existingItemIndex, 1);
            }
        } else {
            if (delta > 0) {
                newCart.push({
                    product_id: productId,
                    name: product.name,
                    price: product.price,
                    quantity: delta,
                });
            }
        }

        setCart(newCart);
    };

    return (
        <Flex gap="middle" wrap justify="center" align="center">
            <Layout style={layoutStyle}>
                <Header style={headerStyle}></Header>
                <Content style={contentStyle}>
                    <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
                        {products.map((product) => (
                            <Col
                                className="gutter-row"
                                key={product.id}
                                span={12}
                            >
                                <ProductCard
                                    product={product}
                                    quantity={
                                        carts.find(
                                            (item) =>
                                                item.product_id === product.id,
                                        )?.quantity || 0
                                    }
                                    onQuantityChange={(delta) =>
                                        handleQuantityChange(product.id, delta)
                                    }
                                />
                            </Col>
                        ))}
                    </Row>
                </Content>

                {carts.length > 0 && (
                    <div className="floating-cart-button fixed bottom-4 right-4">
                        <button
                            onClick={() => setShowCart(!showCart)}
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg"
                        >
                            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {carts.length}
                            </span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </button>
                    </div>
                )}

                {showCart && (
                    <div
                        className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50"
                        onClick={() => setShowCart(false)} // This will close when clicking backdrop
                    >
                        <div
                            ref={cartModalRef}
                            className="max-h-[80vh] w-full overflow-hidden rounded-t-2xl bg-white"
                            onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
                        >
                            <div className="flex items-center justify-between border-b p-4">
                                <h3 className="text-lg font-bold">
                                    Đơn Hàng Của Bạn
                                </h3>
                                <button
                                    onClick={() => setShowCart(false)}
                                    className="text-gray-500"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto p-4">
                                {/* Cart items list */}
                                {carts.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between border-b py-3"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium">
                                                {item.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-3">
                                                {VNDong.format(item.price)}
                                            </span>

                                            <span className="mr-3">
                                                x {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    setCart(
                                                        carts.filter(
                                                            (_, i) =>
                                                                i !== index,
                                                        ),
                                                    )
                                                }
                                                className="text-red-500"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t p-4">
                                <div className="mb-4 flex justify-between font-bold">
                                    <span>Tổng Tiền:</span>
                                    <span>
                                        VND{' '}
                                        {VNDong.format(
                                            carts.reduce(
                                                (sum, item) =>
                                                    sum +
                                                    item.price * item.quantity,
                                                0,
                                            ),
                                        )}
                                    </span>
                                </div>
                                <Button
                                    size="large"
                                    type="primary"
                                    disabled={carts.length === 0}
                                    onClick={submitOrder}
                                    className="w-full rounded-lg bg-blue-500 py-3 font-bold text-white disabled:opacity-50"
                                    loading={isSubmitting}
                                >
                                    Đặt Hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* <Footer style={footerStyle}>

                </Footer> */}
            </Layout>
        </Flex>
    );
}
