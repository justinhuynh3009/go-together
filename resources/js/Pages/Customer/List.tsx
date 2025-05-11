import MasterLayout from '@/Layouts/MasterLayout';

type CustomerComponent = React.FC & {
    layout?: (page: React.ReactNode) => React.ReactNode;
};

const Customer: CustomerComponent = () => {
    return (
        <>
            <h1>Customers</h1>
        </>
    );
};

Customer.layout = (page) => <MasterLayout title="Welcome">{page}</MasterLayout>;

export default Customer;
