import React, { useState, useEffect } from 'react';
import { FaUsers, FaSearch, FaFilter } from 'react-icons/fa';
import toast from 'react-hot-toast';
import UserTable from './UserTable';

// Mock users data
const mockUsers = [
    {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        role: 'user',
        photo: 'https://via.placeholder.com/40x40?text=JD',
        createdAt: '2024-01-15T10:30:00Z'
    },
    {
        id: 2,
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane@example.com',
        role: 'seller',
        photo: 'https://via.placeholder.com/40x40?text=JS',
        createdAt: '2024-02-20T14:45:00Z'
    },
    {
        id: 3,
        name: 'Mike Wilson',
        username: 'mikewilson',
        email: 'mike@example.com',
        role: 'admin',
        photo: 'https://via.placeholder.com/40x40?text=MW',
        createdAt: '2024-01-10T09:15:00Z'
    },
    {
        id: 4,
        name: 'Sarah Johnson',
        username: 'sarahjohnson',
        email: 'sarah@example.com',
        role: 'seller',
        photo: 'https://via.placeholder.com/40x40?text=SJ',
        createdAt: '2024-03-05T16:20:00Z'
    },
    {
        id: 5,
        name: 'David Brown',
        username: 'davidbrown',
        email: 'david@example.com',
        role: 'user',
        photo: 'https://via.placeholder.com/40x40?text=DB',
        createdAt: '2024-02-28T11:30:00Z'
    }
];

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setUsers(mockUsers);
            setFilteredUsers(mockUsers);
            setLoading(false);
        }, 1000);
    }, []);

    // Filter users based on search term and role filter
    useEffect(() => {
        let filtered = users;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by role
        if (roleFilter !== 'all') {
            filtered = filtered.filter(user => user.role === roleFilter);
        }

        setFilteredUsers(filtered);
    }, [users, searchTerm, roleFilter]);

    // Handle role change
    const handleRoleChange = async (userId, newRole) => {
        try {
            // In real app, make API call to update user role
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === userId ? { ...user, role: newRole } : user
                )
            );
            toast.success(`User role updated to ${newRole}`);
        } catch (error) {
            console.error('Error updating user role:', error);
            toast.error('Failed to update user role');
        }
    };

    // Handle user deletion
    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                // In real app, make API call to delete user
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
                toast.success('User deleted successfully');
            } catch (error) {
                console.error('Error deleting user:', error);
                toast.error('Failed to delete user');
            }
        }
    };

    // Get user statistics
    const getUserStats = () => {
        const stats = users.reduce((acc, user) => {
            acc[user.role] = (acc[user.role] || 0) + 1;
            return acc;
        }, {});

        return {
            total: users.length,
            admin: stats.admin || 0,
            seller: stats.seller || 0,
            user: stats.user || 0
        };
    };

    const stats = getUserStats();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Manage Users
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage user roles and permissions
                    </p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <FaUsers className="h-8 w-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600 font-bold">A</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.admin}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold">S</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sellers</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.seller}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-bold">U</span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Users</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.user}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search users by name, email, or username..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Role Filter */}
                    <div className="md:w-48">
                        <div className="relative">
                            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="seller">Seller</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Users ({filteredUsers.length})
                    </h3>
                </div>
                <UserTable
                    users={filteredUsers}
                    onRoleChange={handleRoleChange}
                    onDeleteUser={handleDeleteUser}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default ManageUsers;
