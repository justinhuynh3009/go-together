import MasterLayout from '@/Layouts/MasterLayout';
import { PageProps } from '@/types';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Head, router } from '@inertiajs/react';
import {
    Button,
    Card,
    Form,
    Input,
    message,
    Modal,
    Select,
    Space,
    Table,
} from 'antd';
import React, { useState } from 'react';

interface MenuItem {
    id: number;
    name: string;
    price: number;
    description: string;
    preparation_time: number;
    image_url: string;
    created_at: string;
    updated_at: string;
    cost: number;
    category_id: number;
    is_available: boolean;
}

interface Props extends PageProps {
    menuItems: MenuItem[];
    categories: {
        value: number;
        label: string;
    }[];
}

const MenuItems = ({ auth, menuItems, categories }: Props) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Status',
            dataIndex: 'is_available',
            key: 'is_available',
            render: (is_available: boolean) => (
                <span
                    className={`rounded-full px-2 py-1 text-xs ${
                        is_available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                >
                    {is_available ? 'Active' : 'Inactive'}
                </span>
            ),
        },
        { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
        { title: 'Updated At', dataIndex: 'updated_at', key: 'updated_at' },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: MenuItem) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    const showModal = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = (values: any) => {
        setIsSubmitting(true);

        router.post(route('menu-items.store'), values, {
            onSuccess: () => {
                message.success('Product saved successfully');
                setIsModalVisible(false);
            },
            onError: (errors) => {
                message.error('Error saving product');
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleEdit = (item: MenuItem) => {
        form.setFieldsValue({
            id: item.id,
            category_id: item.category_id,
            price: item.price,
            name: item.name,
            image_url: item.image_url,
            description: item.description,
            is_available: item.is_available,
        });
        setIsModalVisible(true);
    };

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this item?',
            okText: 'Delete',
            cancelText: 'Cancel',
            onOk: () => {
                router.delete(route('menu-items.destroy', id), {
                    onSuccess: () => {
                        message.success('Product deleted successfully');
                    },
                    onError: (errors) => {
                        message.error('Error deleting product');
                    },
                });
            },
        });
    };

    return (
        <>
            <Head title="Menu" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card
                        title="Menu Item List"
                        extra={
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={showModal}
                                size="large"
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                Add New
                            </Button>
                        }
                    >
                        <Table
                            columns={columns}
                            dataSource={menuItems}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                            bordered
                        />
                    </Card>
                </div>
            </div>

            <Modal
                title={
                    form.getFieldValue('id')
                        ? 'Edit Product'
                        : 'Add New Product'
                }
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    name="product_form"
                    onFinish={handleSubmit}
                    layout="vertical"
                    initialValues={{ is_available: true, price: 0 }}
                >
                    <Form.Item name="id" hidden>
                        <Input type="hidden" />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category_id"
                        rules={[
                            {
                                required: true,
                                message: 'Please select the product category!',
                            },
                        ]}
                    >
                        <Select
                            value={form.getFieldValue('category_id')}
                            placeholder="Select a category"
                            allowClear
                            showSearch
                            options={categories}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the product name!',
                            },
                        ]}
                    >
                        <Input placeholder="e.g. Coffee, Desserts" />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the product price!',
                            },
                        ]}
                    >
                        <Input placeholder="e.g. Coffee, Desserts" />
                    </Form.Item>

                    <Form.Item label="Image URL" name="image_url">
                        <Input placeholder="e.g. https://example.com/image.jpg" />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="is_available"
                        valuePropName="checked"
                    >
                        <Input type="checkbox" />
                    </Form.Item>

                    <Form.Item>
                        <Space style={{ float: 'right' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isSubmitting}
                            >
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

MenuItems.layout = (page: React.ReactElement<Props>) => (
    <MasterLayout user={page?.props.auth.user} title="Menu Categories">
        {page}
    </MasterLayout>
);

export default MenuItems;
