import React from 'react'
import useRole from '../../hooks/useRole';
import Loading from '../../components/ui/Loading/Loading';
import { Navigate } from 'react-router';

const Dashboard = () => {
    const { role: userRole, isLoading } = useRole();

    if (isLoading) {
        return <Loading />;
    }

    if (userRole.role === 'admin') {
        return <Navigate to="/dashboard/admin" />;
    } else if (userRole.role === 'seller') {
        return <Navigate to="/dashboard/seller" />;
    } else if (userRole.role === 'customer') {
        return <Navigate to="/dashboard/user" />;
    }


    return (
        <div>
            <h1 className='text-red-500'>User Not found!</h1>
        </div>
    );
}

export default Dashboard
