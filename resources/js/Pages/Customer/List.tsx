import MasterLayout from '@/Layouts/MasterLayout';
import { PageProps } from '@/types';

interface Props extends PageProps {}

const Customer = ({ auth }: Props) => {
    return (
        <>
            <h1>Customers</h1>
        </>
    );
};

Customer.layout = (page: React.ReactElement) => (
    <MasterLayout user={page.props.auth.user} title="Customers">
        {page}
    </MasterLayout>
);

export default Customer;
