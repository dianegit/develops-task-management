import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '../components/Navbar';
import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import { TaskStatistics } from '../components/TaskStatistics';
import { taskService } from '../services/task.service';
import { Plus, Search, BarChart3 } from 'lucide-react';

export const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showStats, setShowStats] = useState(true);
    const [editingTask, setEditingTask] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        priority: '',
    });

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const loadTasks = useCallback(async () => {
        try {
            const data = await taskService.getTasks(filters);
            setTasks(data.tasks || []);
        } catch (error) {
            console.error('Failed to load tasks:', error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const handleCreateTask = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.deleteTask(taskId);
                loadTasks();
            } catch (error) {
                console.error('Failed to delete task:', error);
            }
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingTask(null);
        loadTasks();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            My Tasks
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Manage your tasks efficiently
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowStats(!showStats)}
                            className="btn-secondary flex items-center space-x-2"
                        >
                            <BarChart3 className="h-5 w-5" />
                            <span>{showStats ? 'Hide' : 'Show'} Statistics</span>
                        </button>
                        <button
                            onClick={handleCreateTask}
                            className="btn-primary flex items-center space-x-2"
                        >
                            <Plus className="h-5 w-5" />
                            <span>New Task</span>
                        </button>
                    </div>
                </div>

                {/* Statistics */}
                {showStats && tasks.length > 0 && (
                    <TaskStatistics tasks={tasks} />
                )}

                {/* Filters */}
                <div className="card mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Search
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    className="input-field pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="input-field"
                            >
                                <option value="">All Statuses</option>
                                <option value="todo">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Priority
                            </label>
                            <select
                                value={filters.priority}
                                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                                className="input-field"
                            >
                                <option value="">All Priorities</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tasks Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No tasks found. Create your first task!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Task Form Modal */}
            {showForm && (
                <TaskForm
                    task={editingTask}
                    onClose={handleFormClose}
                />
            )}
        </div>
    );
};
