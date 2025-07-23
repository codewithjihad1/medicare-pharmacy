import React from 'react'
import useRole from '../../hooks/useRole';
import Loading from '../../components/ui/Loading/Loading';
import { Navigate } from 'react-router';

const Dashboard = () => {
    const { role, isLoading } = useRole();

    if (isLoading || !role) {
        return <Loading />;
    }

    if (role === 'admin') {
        return <Navigate to="/dashboard/admin" />;
    }

    if (role === 'seller') {
        return <Navigate to="/dashboard/seller" />;
    }

    return <Navigate to="/dashboard/user" />;
}

export default Dashboard
