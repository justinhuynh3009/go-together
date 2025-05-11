import MasterLayout from '@/Layouts/MasterLayout';
import { PageProps } from '@/types';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Head, router } from '@inertiajs/react';
import { Button, Card, Form, Input, message, Modal, Space, Table } from 'antd';
import React, { useState } from 'react';

interface MenuCategory {
    id: number;
    name: string;
    description: string;
    display_order: number;
    is_active: boolean;
}

interface Props extends PageProps {
    categories: MenuCategory[];
}

const MenuCategories = ({ auth, categories }: Props) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Display Order',
            dataIndex: 'display_order',
            key: 'display_order',
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (is_active: boolean) => (
                <span
                    className={`rounded-full px-2 py-1 text-xs ${
                        is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                >
                    {is_active ? 'Active' : 'Inactive'}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: MenuCategory) => (
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

        router.post(route('menu-categories.store'), values, {
            onSuccess: () => {
                message.success('Category saved successfully');
                setIsModalVisible(false);
            },
            onError: (errors) => {
                message.error('Error saving category');
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleEdit = (category: MenuCategory) => {
        form.setFieldsValue({
            id: category.id,
            name: category.name,
            description: category.description,
            display_order: category.display_order,
            is_active: category.is_active,
        });
        setIsModalVisible(true);
    };

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Delete Category',
            content: 'Are you sure you want to delete this category?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                router.delete(route('menu-categories.destroy', id), {
                    onSuccess: () => {
                        message.success('Category deleted successfully');
                    },
                    onError: () => {
                        message.error('Error deleting category');
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
                        title="Menu Categories List"
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
                            dataSource={categories}
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
                        ? 'Edit Category'
                        : 'Add New Category'
                }
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    name="category_form"
                    onFinish={handleSubmit}
                    layout="vertical"
                    initialValues={{ is_active: true, display_order: 0 }}
                >
                    <Form.Item name="id" hidden>
                        <Input type="hidden" />
                    </Form.Item>

                    <Form.Item
                        label="Category Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the category name!',
                            },
                        ]}
                    >
                        <Input placeholder="e.g. Coffee, Desserts" />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                        label="Display Order"
                        name="display_order"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the display order!',
                            },
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="is_active"
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

MenuCategories.layout = (page: React.ReactElement<Props>) => (
    <MasterLayout user={page?.props.auth.user} title="Menu Categories">
        {page}
    </MasterLayout>
);

export default MenuCategories;
