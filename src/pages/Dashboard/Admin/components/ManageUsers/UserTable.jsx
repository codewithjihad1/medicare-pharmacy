import React from 'react';
import { FaEdit, FaTrash, FaUserShield, FaStore, FaUser } from 'react-icons/fa';
import Loading from '../../../../../components/ui/Loading/Loading';

const UserTable = ({ users, onRoleChange, onDeleteUser, loading }) => {
    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin':
                return <FaUserShield className="h-4 w-4 text-red-500" />;
            case 'seller':
                return <FaStore className="h-4 w-4 text-blue-500" />;
            default:
                return <FaUser className="h-4 w-4 text-gray-500" />;
        }
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'seller':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img
                                        src={user.photoURL}
                                        alt={user.name}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {user.displayName}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">
                                    {user.email}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    {getRoleIcon(user.role)}
                                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user.role)}`}>
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    {/* Role Change Dropdown */}
                                    <select
                                        defaultValue={user.role}
                                        onChange={(e) => onRoleChange(user.id, e.target.value)}
                                        className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="user">User</option>
                                        <option value="seller">Seller</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => onDeleteUser(user.id)}
                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
                                        title="Delete user"
                                    >
                                        <FaTrash className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {users.length === 0 && (
                <div className="text-center py-8">
                    <FaUser className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No users found</p>
                </div>
            )}
        </div>
    );
};

export default UserTable;
