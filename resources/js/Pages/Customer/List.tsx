import MasterLayout from '@/Layouts/MasterLayout';
import { PageProps } from '@/types';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Head, router } from '@inertiajs/react';
import { Button, Card, Form, Input, message, Modal, Space, Table } from 'antd';
import React, { useState } from 'react';

interface Customer {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface Props extends PageProps {
    customers: Customer[];
}

const Customer = ({ customers }: Props) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
        { title: 'Updated At', dataIndex: 'updated_at', key: 'updated_at' },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Customer) => (
                <Space size="middle">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
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

        router.post(route('customers.store'), values, {
            onSuccess: () => {
                message.success('Customer saved successfully');
                setIsModalVisible(false);
            },
            onError: (errors) => {
                message.error('Error saving customer');
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleEdit = (item: Customer) => {
        form.setFieldsValue({
            id: item.id,
            name: item.name,
        });
        setIsModalVisible(true);
    };

    return (
        <>
            <Head title="Menu" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card
                        title="Customer List"
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
                            dataSource={customers}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                            bordered
                        />
                    </Card>
                </div>
            </div>

            <Modal
                title={
                    form.getFieldValue('id') ? 'Edit Customer' : 'New Customer'
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

Customer.layout = (page: React.ReactElement) => (
    <MasterLayout user={page.props.auth.user} title="Customers">
        {page}
    </MasterLayout>
);

export default Customer;
