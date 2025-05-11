import MasterLayout from '@/Layouts/MasterLayout';
import { PageProps } from '@/types';

interface DashboardProps extends PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            avatar?: string;
        };
    };
}

type DashboardComponent = React.FC<DashboardProps> & {
    layout?: (page: React.ReactNode) => React.ReactNode;
};

const Dashboard: DashboardComponent = ({ auth }) => {
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
