import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { Users, FileText, Shield, Activity, AlertTriangle } from 'lucide-react';

export const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [auditLogs, setAuditLogs] = useState([]);
    const [securityEvents, setSecurityEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (user?.role !== 'admin') {
            navigate('/dashboard');
            return;
        }
        loadAdminData();
    }, [user, navigate]);

    const loadAdminData = async () => {
        try {
            const [statsRes, usersRes, logsRes, eventsRes] = await Promise.all([
                api.get('/admin/analytics'),
                api.get('/admin/users'),
                api.get('/admin/audit-logs?limit=10'),
                api.get('/admin/security-events?limit=10'),
            ]);

            setStats(statsRes.data);
            setUsers(usersRes.data);
            setAuditLogs(logsRes.data);
            setSecurityEvents(eventsRes.data);
        } catch (error) {
            console.error('Failed to load admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleUserStatus = async (userId, currentStatus) => {
        try {
            await api.patch(`/admin/users/${userId}/status`, {
                is_active: !currentStatus,
            });
            loadAdminData();
        } catch (error) {
            console.error('Failed to update user status:', error);
        }
    };

    const handleChangeUserRole = async (userId, newRole) => {
        try {
            await api.patch(`/admin/users/${userId}/role`, {
                role: newRole,
            });
            loadAdminData();
        } catch (error) {
            console.error('Failed to update user role:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Admin Dashboard
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage users, monitor system activity, and view analytics
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {stats?.total_users || 0}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                                <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {stats?.active_users || 0}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                                <Activity className="h-6 w-6 text-green-600 dark:text-green-300" />
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {stats?.total_tasks || 0}
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Security Events</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {securityEvents.length}
                                </p>
                            </div>
                            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                                <Shield className="h-6 w-6 text-red-600 dark:text-red-300" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="card mb-6">
                    <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'overview'
                                ? 'text-primary-600 border-b-2 border-primary-600'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'users'
                                ? 'text-primary-600 border-b-2 border-primary-600'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            Users
                        </button>
                        <button
                            onClick={() => setActiveTab('audit')}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'audit'
                                ? 'text-primary-600 border-b-2 border-primary-600'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            Audit Logs
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'security'
                                ? 'text-primary-600 border-b-2 border-primary-600'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            Security
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="card">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Recent Activity
                            </h3>
                            <div className="space-y-3">
                                {auditLogs.slice(0, 5).map((log, index) => (
                                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <Activity className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                                                {log.action}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(log.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Recent Security Events
                            </h3>
                            <div className="space-y-3">
                                {securityEvents.slice(0, 5).map((event, index) => (
                                    <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-900 dark:text-white font-medium">
                                                {event.event_type}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Severity: {event.severity} • {new Date(event.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            User Management
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {users.map((u) => (
                                        <tr key={u.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {u.full_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {u.email}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={u.role}
                                                    onChange={(e) => handleChangeUserRole(u.id, e.target.value)}
                                                    className="input-field text-sm"
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="auditor">Auditor</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.is_active
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    }`}>
                                                    {u.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button
                                                    onClick={() => handleToggleUserStatus(u.id, u.is_active)}
                                                    className={`${u.is_active ? 'btn-danger' : 'btn-primary'
                                                        } text-xs px-3 py-1`}
                                                >
                                                    {u.is_active ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'audit' && (
                    <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Audit Logs
                        </h3>
                        <div className="space-y-3">
                            {auditLogs.map((log, index) => (
                                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {log.action}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                IP: {log.ip_address || 'N/A'}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(log.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="card">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Security Events
                        </h3>
                        <div className="space-y-3">
                            {securityEvents.map((event, index) => (
                                <div key={index} className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {event.event_type}
                                                </p>
                                            </div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                                Severity: <span className="font-semibold">{event.severity}</span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                IP: {event.ip_address || 'N/A'}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(event.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
