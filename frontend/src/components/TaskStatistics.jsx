import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0ea5e9', '#f59e0b', '#ef4444', '#8b5cf6'];

export const TaskStatistics = ({ tasks }) => {
    // Calculate statistics
    const statusData = [
        { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length },
        { name: 'In Progress', value: tasks.filter(t => t.status === 'in_progress').length },
        { name: 'Done', value: tasks.filter(t => t.status === 'done').length },
    ];

    const priorityData = [
        { name: 'Low', value: tasks.filter(t => t.priority === 'low').length },
        { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length },
        { name: 'High', value: tasks.filter(t => t.priority === 'high').length },
        { name: 'Critical', value: tasks.filter(t => t.priority === 'critical').length },
    ];

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Summary Cards */}
            <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Task Overview
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                            {totalTasks}
                        </p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                            {completedTasks}
                        </p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                            {completionRate}%
                        </p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                        <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                            {tasks.filter(t => t.status === 'in_progress').length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Status Distribution */}
            <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Status Distribution
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Priority Distribution */}
            <div className="card lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Priority Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={priorityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#0ea5e9" name="Number of Tasks" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
