import MasterLayout from '@/Layouts/MasterLayout';
import { PageProps } from '@/types';

interface DashboardProps extends PageProps {}

const Dashboard = ({ auth }: DashboardProps) => {
    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
};

Dashboard.layout = (page: React.ReactElement<DashboardProps>) => (
    <MasterLayout title="Welcome" user={page.props.auth.user}>
        {page}
    </MasterLayout>
);

export default Dashboard;
